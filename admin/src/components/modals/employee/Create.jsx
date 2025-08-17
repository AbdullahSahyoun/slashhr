import React, { useEffect, useMemo, useState } from 'react';

/* ---------------- Config ---------------- */
// .env: VITE_API_URL=http://localhost:3000
const API_ORIGIN = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Catalog reads (your existing lookups)
const API_BASE = `${API_ORIGIN}/catalog`;

// Create-Temp insert endpoint (new)
const API_BASE_CREATE = `${API_ORIGIN}/api/create-temp`;

const TENANT_ID = 1; // or from auth/context
const DEFAULT_ORG_ID = 2; // <- as requested

async function apiGet(path, { signal } = {}) {
  const url = `${API_BASE}${path}${path.includes('?') ? '&' : '?'}tenantId=${TENANT_ID}`;
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      signal,
    });

    const ct = (res.headers.get('content-type') || '').toLowerCase();
    const text = await res.text();

    if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${text.slice(0, 200)}`);

    if (!ct.includes('application/json')) {
      try { return JSON.parse(text); }
      catch { throw new Error(`Non-JSON response from ${url}. First bytes: ${text.slice(0, 80)}`); }
    }
    return JSON.parse(text);
  } catch (e) {
    if (e.name === 'AbortError' || /aborted/i.test(e?.message || '')) {
      const abortErr = new DOMException('Request aborted', 'AbortError');
      throw abortErr;
    }
    throw e;
  }
}

// POST helper to create-temp API
async function apiPostCreate(path, payload) {
  const url = `${API_BASE_CREATE}${path}${path.includes('?') ? '&' : '?'}tenantId=${TENANT_ID}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${text.slice(0, 300)}`);
  return text ? JSON.parse(text) : {};
}

/* ---------------- Base UI ---------------- */

const Backdrop = ({ onClick }) => (
  <div onClick={onClick} className="fixed inset-0 z-40 bg-black/50" aria-hidden="true" />
);

const ModalShell = ({ children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    {children}
  </div>
);

const Header = ({ step, totalSteps, onClose }) => {
  const pct = (step / totalSteps) * 100;
  return (
    <div className="px-5 pt-5 pb-3 bg-white rounded-t-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-[20px] font-semibold text-[#245c65]">Employee Creation</h2>
        <button
          onClick={onClose}
          className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
          aria-label="Close"
          type="button"
        >
          ✕
        </button>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <div className="h-[6px] w-full bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#2b6171] transition-all" style={{ width: `${pct}%` }} />
        </div>
        <span className="min-w-[36px] text-right text-[11px] text-gray-500 tabular-nums">
          {step}/{totalSteps}
        </span>
      </div>
    </div>
  );
};

const SectionTitle = ({ children }) => (
  <h3 className="px-5 pb-3 text-[15px] font-semibold text-gray-800">{children}</h3>
);
const Row = ({ children }) => <div className="px-5">{children}</div>;

const Input = ({ label, required, ...rest }) => (
  <label className="block mb-3">
    <span className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </span>
    <input
      {...rest}
      className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2b6171] ${
        rest.disabled ? 'bg-gray-100' : ''
      }`}
    />
  </label>
);

const Select = ({ label, required, children, ...rest }) => (
  <label className="block mb-3">
    <span className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </span>
    <select
      {...rest}
      className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2b6171] ${
        rest.disabled ? 'bg-gray-100' : 'bg-white'
      }`}
    >
      {children}
    </select>
  </label>
);

const Footer = ({ canPrev, isLast, onPrev, onNext, onCancel, nextDisabled }) => (
  <div className="border-t border-gray-100 mt-2 px-5 py-4 bg-white rounded-b-xl flex items-center justify-end gap-3">
    <button
      onClick={onPrev}
      disabled={!canPrev}
      className={`px-4 py-2 rounded-md text-sm font-medium ${
        canPrev ? 'text-[#2b6171] hover:bg-gray-100' : 'text-gray-400 cursor-not-allowed'
      }`}
      type="button"
    >
      Previous
    </button>
    <button
      onClick={onNext}
      disabled={nextDisabled}
      className={`px-5 py-2 rounded-md text-sm font-medium text-white ${
        nextDisabled ? 'bg-[#2b6171]/50 cursor-not-allowed' : 'bg-[#2b6171] hover:bg-[#214b59]'
      }`}
      type="button"
    >
      {isLast ? 'Finish' : 'Next'}
    </button>
    <button
      onClick={onCancel}
      className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100"
      type="button"
    >
      Cancel
    </button>
  </div>
);

/* ---------------- Data hooks ---------------- */

function isAbort(err) {
  return err?.name === 'AbortError' || /aborted/i.test(err?.message || '');
}

function useCatalogLookups(departmentId) {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const [establishments, setEstablishments] = useState([]);
  const [contractTemplates, setContractTemplates] = useState([]);
  const [reasons, setReasons] = useState([]);
  const [categories, setCategories] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [managers, setManagers] = useState([]);
  const [primaryRoles, setPrimaryRoles] = useState([]);
  const [secondaryRoles, setSecondaryRoles] = useState([]);

  // Load static lists
  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setErr(null);

        const [
          estRes,
          tmplRes,
          reasonRes,
          catRes,
          jobRes,
          qualRes,
          deptRes,
          priRes,
          secRes,
        ] = await Promise.all([
          apiGet('/establishments', { signal: ac.signal }),
          apiGet('/contract-templates', { signal: ac.signal }),
          apiGet('/contract-reasons', { signal: ac.signal }),
          apiGet('/socio-professional-categories', { signal: ac.signal }),
          apiGet('/job-titles', { signal: ac.signal }),
          apiGet('/qualifications', { signal: ac.signal }),
          apiGet('/departments', { signal: ac.signal }),
          apiGet('/primary-roles', { signal: ac.signal }),
          apiGet('/secondary-roles', { signal: ac.signal }),
        ]);

        setEstablishments(estRes.items ?? []);
        setContractTemplates(tmplRes.items ?? []);
        setReasons(reasonRes.items ?? []);
        setCategories(catRes.items ?? []);
        setJobTitles(jobRes.items ?? []);
        setQualifications(qualRes.items ?? []);
        setDepartments(deptRes.items ?? []);
        setPrimaryRoles(priRes.items ?? []);
        setSecondaryRoles(secRes.items ?? []);
      } catch (e) {
        if (isAbort(e)) return;
        setErr(e.message || String(e));
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, []);

  // Load managers when department changes
  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        if (!departmentId) {
          setManagers([]);
          return;
        }
        const res = await apiGet(`/departments/${departmentId}/managers`, { signal: ac.signal });
        setManagers(res.items ?? []);
      } catch (e) {
        if (isAbort(e)) return;
        setManagers([]);
      }
    })();
    return () => ac.abort();
  }, [departmentId]);

  return {
    loading,
    err,
    establishments,
    contractTemplates,
    reasons,
    categories,
    jobTitles,
    qualifications,
    departments,
    managers,
    primaryRoles,
    secondaryRoles,
  };
}

/* ---------------- Steps ---------------- */

// 1) Personal
const Step1 = ({ form, setForm }) => (
  <>
    <SectionTitle>Collaborator</SectionTitle>
    <SectionTitle>Personal Information</SectionTitle>
    <Row>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="First Name"
          required
          value={form.firstName}
          onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
          placeholder="First Name"
        />
        <Input
          label="Last Name"
          required
          value={form.lastName}
          onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
          placeholder="Last Name"
        />
      </div>
    </Row>
  </>
);

// 2) Template selection
const Step2 = ({ form, setForm, establishments, contractTemplates }) => (
  <>
    <SectionTitle>Selection Of The Contract Template</SectionTitle>
    <Row>
      <Select
        label="Select The Establishment"
        required
        value={form.establishment}
        onChange={(e) => setForm((f) => ({ ...f, establishment: e.target.value }))}
      >
        <option value="">Select The Establishment</option>
        {establishments.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </Select>
    </Row>

    <SectionTitle>Contract Template</SectionTitle>
    <Row>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {contractTemplates.map((opt) => {
          const active = String(form.contractTemplate) === String(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setForm((f) => ({ ...f, contractTemplate: opt.id }))}
              className={`rounded-md border px-3 py-2 text-sm text-left transition ${
                active ? 'border-[#2b6171] bg-[#e9f3f5]' : 'border-gray-300 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{opt.label}</span>
                <span className={`inline-block w-2.5 h-2.5 rounded-full ${active ? 'bg-[#2b6171]' : 'bg-gray-200'}`} />
              </div>
            </button>
          );
        })}
      </div>
    </Row>
  </>
);

// 3) Contract Info – A
const Step3A = ({ form, setForm, establishments, contractTemplates }) => {
  const est = establishments.find((e) => String(e.id) === String(form.establishment));
  const tmpl = contractTemplates.find((t) => String(t.id) === String(form.contractTemplate));
  return (
    <>
      <SectionTitle>Contract-Related Information</SectionTitle>
      <Row>
        <Select label="Establishment" required value={form.establishment} disabled onChange={() => {}}>
          <option>{est?.label || '—'}</option>
        </Select>
        <Select label="Contract Template" required value={form.contractTemplate} disabled onChange={() => {}}>
          <option>{tmpl?.label || '—'}</option>
        </Select>

        <SectionTitle>Start Of Contract</SectionTitle>
        <Input
          type="date"
          label="Contract Start Date"
          required
          value={form.contractStart}
          onChange={(e) => setForm((f) => ({ ...f, contractStart: e.target.value }))}
          placeholder="DD/MM/YYYY"
        />
      </Row>
    </>
  );
};

// 4) Contract Info – B
const Step3B = ({ form, setForm, reasons }) => (
  <>
    <SectionTitle>Contract-Related Information</SectionTitle>
    <Row>
      <Select
        label="Reason For Contract Start"
        value={form.contractReason}
        onChange={(e) => setForm((f) => ({ ...f, contractReason: e.target.value }))}
      >
        <option value="">Select reason</option>
        {reasons.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </Select>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          type="date"
          label="End Of Probation Period"
          value={form.probationEnd1}
          onChange={(e) => setForm((f) => ({ ...f, probationEnd1: e.target.value }))}
          placeholder="DD/MM/YYYY"
        />
        <Input
          type="date"
          label="End Of The Second Probation Period"
          value={form.probationEnd2}
          onChange={(e) => setForm((f) => ({ ...f, probationEnd2: e.target.value }))}
          placeholder="DD/MM/YYYY"
        />
      </div>
    </Row>
  </>
);

// 5) Contract Info – C
const Step3C = ({ form, setForm, categories }) => (
  <>
    <SectionTitle>Contract-Related Information</SectionTitle>
    <Row>
      <SectionTitle>General Information</SectionTitle>
      <Select
        label="Socio-Professional Category"
        value={form.category}
        onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
      >
        <option value="">Select category</option>
        {categories.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </Select>

      <SectionTitle>End Of Contract</SectionTitle>
      <Input
        type="date"
        label="End Of Contract"
        value={form.contractEnd}
        onChange={(e) => setForm((f) => ({ ...f, contractEnd: e.target.value }))}
        placeholder="DD/MM/YYYY"
      />
    </Row>
  </>
);

// 6) Job Title
const Step4 = ({ form, setForm, jobTitles, qualifications, departments, managers }) => (
  <>
    <SectionTitle>Job Title</SectionTitle>
    <Row>
      <div className="grid grid-cols-1 gap-4">
        <Select
          label="Job Title"
          required
          value={form.jobTitle}
          onChange={(e) => setForm((f) => ({ ...f, jobTitle: e.target.value }))}
        >
          <option value="">Select Job Title</option>
          {jobTitles.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </Select>

        <Select
          label="Qualification"
          value={form.qualification}
          onChange={(e) => setForm((f) => ({ ...f, qualification: e.target.value }))}
        >
          <option value="">Select Qualification</option>
          {qualifications.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </Select>

        <Select
          label="Department"
          required
          value={form.department}
          onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
        >
          <option value="">Select Department</option>
          {departments.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </Select>

        <Select
          label="Manager"
          value={form.manager}
          onChange={(e) => setForm((f) => ({ ...f, manager: e.target.value }))}
          disabled={!form.department}
        >
          <option value="">{form.department ? 'Select Manager' : 'Select Department first'}</option>
          {managers.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label ?? o.name}
            </option>
          ))}
        </Select>

        <label className="flex items-center gap-2 mt-1">
          <input
            type="checkbox"
            checked={form.isOwnManager}
            onChange={(e) => setForm((f) => ({ ...f, isOwnManager: e.target.checked }))}
            className="w-4 h-4 rounded border-gray-300"
          />
          <span className="text-sm text-gray-700">The Employee Is Their Own Manager</span>
        </label>
      </div>
    </Row>
  </>
);

// 7) Application data
const Step5 = ({ form, setForm, primaryRoles, secondaryRoles }) => (
  <>
    <SectionTitle>Application Data</SectionTitle>
    <Row>
      <div className="grid grid-cols-1 gap-4">
        <Input
          label="Login SlasHR"
          required
          value={form.login}
          onChange={(e) => setForm((f) => ({ ...f, login: e.target.value }))}
          placeholder="Username"
        />
        <Input
          label="Work Email"
          required
          value={form.workEmail}
          onChange={(e) => setForm((f) => ({ ...f, workEmail: e.target.value }))}
          placeholder="work@company.com"
        />
        <Input
          label="Personal Email"
          value={form.personalEmail}
          onChange={(e) => setForm((f) => ({ ...f, personalEmail: e.target.value }))}
          placeholder="you@example.com"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.notifyByEmail}
            onChange={(e) => setForm((f) => ({ ...f, notifyByEmail: e.target.checked }))}
            className="w-4 h-4 rounded border-gray-300"
          />
          <span className="text-sm text-gray-700">Notify The Employee By Email</span>
        </label>

        <Select
          label="Primary Role"
          value={form.primaryRole}
          onChange={(e) => setForm((f) => ({ ...f, primaryRole: e.target.value }))}
        >
          <option value="">Select role</option>
          {primaryRoles.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </Select>

        <Select
          label="Secondary Roles"
          value={form.secondaryRole}
          onChange={(e) => setForm((f) => ({ ...f, secondaryRole: e.target.value }))}
        >
          <option value="">Select roles</option>
          {secondaryRoles.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </Select>
      </div>
    </Row>
  </>
);

/* ---------------- Main Modal ---------------- */

const Create = ({ open, onClose, onCreated }) => {
  const totalSteps = 7;
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    // 1
    firstName: '',
    lastName: '',
    // 2
    establishment: '',
    contractTemplate: '',
    // 3A/3B/3C
    contractStart: '',
    contractReason: '',
    probationEnd1: '',
    probationEnd2: '',
    category: '',
    employeeId: '',
    contractEnd: '',
    // 6
    jobTitle: '',
    qualification: '',
    department: '',
    manager: '',
    isOwnManager: false,
    // 7
    login: '',
    workEmail: '',
    personalEmail: '',
    notifyByEmail: true,
    primaryRole: '',
    secondaryRole: '',
  });

  const {
    loading,
    err,
    establishments,
    contractTemplates,
    reasons,
    categories,
    jobTitles,
    qualifications,
    departments,
    managers,
    primaryRoles,
    secondaryRoles,
  } = useCatalogLookups(form.department);

  const isLast = useMemo(() => step === totalSteps, [step]);
  const canPrev = step > 1;

  const nextDisabled = useMemo(() => {
    if (step === 1) return !(form.firstName && form.lastName);
    if (step === 2) return !(form.establishment && form.contractTemplate);
    if (step === 3) return !form.contractStart;
    if (step === 4) return false;
    if (step === 5) return false;
    if (step === 6) return !(form.jobTitle && form.department);
    if (step === 7) return !(form.login && form.workEmail);
    return false;
  }, [step, form]);

  const closeAll = () => {
    setStep(1);
    onClose?.();
  };

  // --- submit to /api/create-temp/employees (tblEmployee insert)
  const submit = async () => {
    const fullName = `${form.firstName || ''} ${form.lastName || ''}`.trim();

    const payload = {
      // required by controller/model
      name: fullName,                // -> "Name"
      orgId: DEFAULT_ORG_ID,         // -> "OrgID" (DEFAULT 2)
      officeId: form.establishment ? Number(form.establishment) : null, // -> "OfficeID"
      departmentId: form.department ? Number(form.department) : null,   // -> "DepartmentID"
      managerId: form.isOwnManager ? null : (form.manager ? Number(form.manager) : null), // -> "ManagerID"
      joiningDate: form.contractStart || null, // -> "JoiningDate" (YYYY-MM-DD)

      // optional: add later if needed
      // userId, positionId, gender, nationality, dateOfBirth, maritalStatus, phoneNumber,
      // cin, personalAddress, employmentTypeId, workModelId, status
    };

    return apiPostCreate('/employees', payload);
  };

  const next = async () => {
    if (isLast) {
      try {
      const resp = await submit();
    // if your API returns { employee: {...} } use that, otherwise just resp
    onCreated?.(resp?.employee || resp);
    closeAll();
      } catch (e) {
        alert(`Create failed: ${e.message}`);
      }
      return;
    }
    setStep((s) => Math.min(totalSteps, s + 1));
  };
  const prev = () => setStep((s) => Math.max(1, s - 1));

  if (!open) return null;

  return (
    <>
      <Backdrop onClick={closeAll} />
      <ModalShell>
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl overflow-hidden">
          <Header step={step} totalSteps={totalSteps} onClose={closeAll} />

          {loading && <div className="px-5 py-4 text-sm text-gray-500">Loading options…</div>}
          {err && <div className="px-5 py-4 text-sm text-red-600">Failed to load options: {err}</div>}

          <div className="pb-2">
            {step === 1 && <Step1 form={form} setForm={setForm} />}
            {step === 2 && (
              <Step2
                form={form}
                setForm={setForm}
                establishments={establishments}
                contractTemplates={contractTemplates}
              />
            )}
            {step === 3 && (
              <Step3A
                form={form}
                setForm={setForm}
                establishments={establishments}
                contractTemplates={contractTemplates}
              />
            )}
            {step === 4 && <Step3B form={form} setForm={setForm} reasons={reasons} />}
            {step === 5 && <Step3C form={form} setForm={setForm} categories={categories} />}
            {step === 6 && (
              <Step4
                form={form}
                setForm={setForm}
                jobTitles={jobTitles}
                qualifications={qualifications}
                departments={departments}
                managers={managers}
              />
            )}
            {step === 7 && (
              <Step5
                form={form}
                setForm={setForm}
                primaryRoles={primaryRoles}
                secondaryRoles={secondaryRoles}
              />
            )}
          </div>

          <Footer
            canPrev={canPrev}
            isLast={isLast}
            onPrev={prev}
            onNext={next}
            onCancel={closeAll}
            nextDisabled={nextDisabled}
          />
        </div>
      </ModalShell>
    </>
  );
};

export default Create;
