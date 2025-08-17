// src/utils/apiGet.js
const API_ORIGIN = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_BASE   = `${API_ORIGIN}/catalog`;
const TENANT_ID  = 1;
const AUTH_TOKEN = localStorage.getItem('token');

export async function apiGet(path, { signal } = {}) {
  const url = `${API_BASE}${path}${path.includes('?') ? '&' : '?'}tenantId=${TENANT_ID}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(AUTH_TOKEN ? { Authorization: `Bearer ${AUTH_TOKEN}` } : {}),
    },
    signal,
    credentials: 'include',
  });

  const ct = res.headers.get('content-type') || '';
  const text = await res.text();

  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${text.slice(0, 200)}`);

  if (!ct.toLowerCase().includes('application/json')) {
    try {
      return JSON.parse(text);
    } catch {
      throw new Error(`Non-JSON response from ${url}. First bytes: ${text.slice(0,80)}`);
    }
  }
  return JSON.parse(text);
}
