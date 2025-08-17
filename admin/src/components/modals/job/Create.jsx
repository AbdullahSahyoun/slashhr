import React, { useEffect, useMemo, useState } from 'react';

/** Adjust to your env **/
const API_ORIGIN = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const TENANT_ID = 1;

/** Helpers */
async function getJSON(url, opts = {}) {
  const res = await fetch(url, { headers: { Accept: 'application/json' }, ...opts });
  const text = await res.text();
  if (!res.ok) throw new Error(text || `${res.status} ${res.statusText}`);
  return text ? JSON.parse(text) : {};
}
async function postJSON(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(text || `${res.status} ${res.statusText}`);
  return text ? JSON.parse(text) : {};
}

/**
 * Props:
 *  - open: boolean
 *  - onClose: () => void
 *  - onCreated: (createdJob) => void
 */
export default function CreateJobModal({ open, onClose, onCreated }) {
  const [name, setName] = useState('');
  const [legalEntities, setLegalEntities] = useState([]); // all options
  const [selectedLegalEntities, setSelectedLegalEntities] = useState([]); // ids
  const [levels, setLevels] = useState([]); // [{id, label}]
  const [levelInput, setLevelInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  // Load legal entities
  useEffect(() => {
    if (!open) return;
    setErr('');
    (async () => {
      try {
        const data = await getJSON(`${API_ORIGIN}/catalog/legal-entities?tenantId=${TENANT_ID}`);
        // Expecting { items: [{id,label}, ...] }
        setLegalEntities(data.items || []);
        // default to "All"
        setSelectedLegalEntities((data.items || []).map(o => o.id));
      } catch (e) {
        setErr(e.message || 'Failed to load legal entities');
        setLegalEntities([]);
      }
    })();
  }, [open]);

  // Add a level
  const addLevel = () => {
    const v = levelInput.trim();
    if (!v) return;
    setLevels(prev => [...prev, { id: crypto.randomUUID(), label: v }]);
    setLevelInput('');
  };

  // Remove a level
  const removeLevel = (id) => setLevels(prev => prev.filter(l => l.id !== id));

  // Computed badge for “All”
  const allSelected = useMemo(() => {
    if (!legalEntities.length) return false;
    return selectedLegalEntities.length === legalEntities.length;
  }, [selectedLegalEntities, legalEntities]);

  const toggleAll = () => {
    if (allSelected) setSelectedLegalEntities([]);
    else setSelectedLegalEntities(legalEntities.map(o => o.id));
  };

  // Submit
  const handleSave = async () => {
    setErr('');
    if (!name.trim()) {
      setErr('Please enter a name.');
      return;
    }
    setSaving(true);
    try {
      // Adjust path to your backend route:
      // e.g. POST /api/jobs  or  /job
      const created = await postJSON(
        `${API_ORIGIN}/api/jobs?tenantId=${TENANT_ID}`,
        {
          name: name.trim(),
          legalEntityIds: selectedLegalEntities,        // array of ids
          levels: levels.map(l => l.label.trim()).filter(Boolean), // ["Junior","Mid","Senior"]
        }
      );
      onCreated?.(created?.job || created); // parent can optimistically add or refetch
      setName('');
      setLevels([]);
      onClose?.();
    } catch (e) {
      setErr(e.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => !saving && onClose?.()}
      />
      {/* Sheet */}
      <div className="absolute inset-0 flex items-start justify-center p-4 sm:p-6">
        <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl overflow-hidden">
          {/* Header */}
          <div className="px-4 pt-4 pb-2 border-b border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[17px] font-semibold text-[#2b6171]">New Job</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Enter a name for the new role and select the applicable legal entities.
                </p>
              </div>
              <button
                className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
                onClick={() => !saving && onClose?.()}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="px-4 py-3 space-y-3">
            {err && <div className="text-sm text-red-600">{err}</div>}

            {/* Name */}
            <label className="block">
              <span className="block text-sm text-gray-700 mb-1">Name</span>
              <input
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2b6171]"
                placeholder="e.g. Software Engineer"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            {/* Legal entities */}
            <div>
              <span className="block text-sm text-gray-700 mb-1">Legal entities</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleAll}
                  className="inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm bg-white hover:bg-gray-50"
                >
                  <span className="inline-flex items-center justify-center w-5 h-5 text-[11px] rounded bg-[#2b6171] text-white">
                    {allSelected ? legalEntities.length : selectedLegalEntities.length}
                  </span>
                  {allSelected ? 'All' : 'Selected'}
                </button>

                {/* Simple dropdown */}
                <details className="relative">
                  <summary className="list-none cursor-pointer select-none inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm bg-white hover:bg-gray-50">
                    Choose…
                  </summary>
                  <div className="absolute z-10 mt-2 w-64 max-h-64 overflow-auto rounded-lg border bg-white shadow">
                    <label className="flex items-center gap-2 px-3 py-2 border-b">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={toggleAll}
                      />
                      <span className="text-sm">All</span>
                    </label>
                    {legalEntities.map((le) => {
                      const checked = selectedLegalEntities.includes(le.id);
                      return (
                        <label key={le.id} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => {
                              setSelectedLegalEntities((prev) =>
                                e.target.checked
                                  ? [...prev, le.id]
                                  : prev.filter((id) => id !== le.id)
                              );
                            }}
                          />
                          <span className="text-sm">{le.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </details>
              </div>
            </div>

            {/* Levels */}
            <div>
              <span className="block text-sm text-gray-700 mb-1">Levels</span>
              <div className="flex items-center gap-2">
                <input
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2b6171]"
                  placeholder="e.g. Junior"
                  value={levelInput}
                  onChange={(e) => setLevelInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addLevel())}
                />
                <button
                  type="button"
                  onClick={addLevel}
                  className="rounded-lg bg-gray-100 hover:bg-gray-200 px-3 py-2 text-sm"
                >
                  + Add level
                </button>
              </div>

              {levels.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {levels.map((lvl) => (
                    <span
                      key={lvl.id}
                      className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs"
                    >
                      {lvl.label}
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => removeLevel(lvl.id)}
                        title="Remove"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Info hint */}
              <div className="mt-3 rounded-lg bg-[#e6f0f3] text-[#245c65] px-3 py-2 text-xs">
                Assign performance levels to roles, such as junior, mid, and senior.
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-[#1f4d57]">
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full rounded-lg bg-[#1f4d57] text-white py-2 font-medium border border-white/15 hover:bg-[#1b434c] disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
