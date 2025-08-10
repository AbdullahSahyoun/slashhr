import React, { useState, useMemo } from 'react';

const Backdrop = ({ onClick }) => (
  <div
    onClick={onClick}
    className="fixed inset-0 z-[90] bg-black/50"
    aria-hidden="true"
  />
);

const ModalShell = ({ children }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <div className="w-full max-w-[640px] bg-white rounded-2xl shadow-xl border border-gray-200">
      {children}
    </div>
  </div>
);

const Header = ({ step, totalSteps, onClose }) => (
  <div className="p-5 relative">
    <h2 className="text-[20px] font-semibold text-[#245c65]">Employee Creation</h2>

    {/* tiny step counter (right) */}
    <div className="absolute right-5 top-6 text-xs text-gray-500">
      {step}/{totalSteps}
    </div>

    {/* progress bar */}
    <div className="mt-3 h-[6px] w-full bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-[#2b6171] transition-all"
        style={{ width: `${(step / totalSteps) * 100}%` }}
      />
    </div>

    {/* Close (X) */}
    <button
      onClick={onClose}
      className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-100"
      aria-label="Close"
      type="button"
    >
      ✕
    </button>
  </div>
);

const SectionTitle = ({ children }) => (
  <h3 className="px-5 pb-3 text-[15px] font-semibold text-gray-800">{children}</h3>
);

const Row = ({ children }) => (
  <div className="px-5">{children}</div>
);

const Input = ({ label, required, ...rest }) => (
  <label className="block mb-3">
    <span className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </span>
    <input
      {...rest}
      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2b6171]"
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
      className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#2b6171]"
    >
      {children}
    </select>
  </label>
);

const Footer = ({ canPrev, isLast, onPrev, onNext, onCancel }) => (
  <div className="border-t border-gray-100 mt-2 px-5 py-4 flex items-center justify-end gap-3">
    <button
      onClick={onPrev}
      disabled={!canPrev}
      className={`px-4 py-2 rounded-md text-sm font-medium ${
        canPrev
          ? 'text-[#2b6171] hover:bg-gray-100'
          : 'text-gray-400 cursor-not-allowed'
      }`}
      type="button"
    >
      Previous
    </button>
    <button
      onClick={onNext}
      className="px-5 py-2 rounded-md text-sm font-medium text-white bg-[#2b6171] hover:bg-[#214b59]"
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

/* ---------------------- Steps ---------------------- */

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

const Step2 = ({ form, setForm }) => (
  <>
    <SectionTitle>Selection Of The Contract Template</SectionTitle>
    <Row>
      <Select
        label="Select The Establishment"
        required
        value={form.establishment}
        onChange={(e) => setForm((f) => ({ ...f, establishment: e.target.value }))}
      >
        <option value="">Choose...</option>
        <option value="Morocco">Morocco</option>
        <option value="France">France</option>
      </Select>
    </Row>

    <SectionTitle>Contract Template</SectionTitle>
    <Row>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {['Apprenticeship', 'Other Contracts - External', 'Other Contracts - Internal', 'CDD', 'CDI', 'Temporing', 'Internship']
          .map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => setForm((f) => ({ ...f, contractTemplate: opt }))}
            className={`rounded-md border px-3 py-2 text-sm text-left ${
              form.contractTemplate === opt
                ? 'border-[#2b6171] bg-[#e9f3f5]'
                : 'border-gray-300 bg-white hover:bg-gray-50'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </Row>
  </>
);

const Step3 = ({ form, setForm }) => (
  <>
    <SectionTitle>Contract-Related Information</SectionTitle>
    <Row>
      <div className="grid grid-cols-1 gap-4">
        <Select label="Establishment" required value={form.establishment} onChange={() => {}} disabled>
          <option>{form.establishment || '—'}</option>
        </Select>
        <Select label="Contract Template" required value={form.contractTemplate} onChange={() => {}} disabled>
          <option>{form.contractTemplate || '—'}</option>
        </Select>

        <SectionTitle>Start Of Contract</SectionTitle>
        <Input
          type="date"
          label="Contract Start Date"
          required
          value={form.contractStart}
          onChange={(e) => setForm((f) => ({ ...f, contractStart: e.target.value }))}
        />
        <Select
          label="Reason For Contract Start"
          value={form.contractReason}
          onChange={(e) => setForm((f) => ({ ...f, contractReason: e.target.value }))}
        >
          <option value="">Choose...</option>
          <option value="NewHire">New hire</option>
          <option value="Transfer">Internal transfer</option>
        </Select>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            type="date"
            label="End Of Probation Period"
            value={form.probationEnd1}
            onChange={(e) => setForm((f) => ({ ...f, probationEnd1: e.target.value }))}
          />
          <Input
            type="date"
            label="End Of The Second Probation Period"
            value={form.probationEnd2}
            onChange={(e) => setForm((f) => ({ ...f, probationEnd2: e.target.value }))}
          />
        </div>

        <SectionTitle>General Information</SectionTitle>
        <Select
          label="Socio-Professional Category"
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
        >
          <option value="">Choose...</option>
          <option value="A">Category A</option>
          <option value="B">Category B</option>
        </Select>

        <SectionTitle>ID</SectionTitle>
        <Input
          label="Employee ID"
          value={form.employeeId}
          onChange={(e) => setForm((f) => ({ ...f, employeeId: e.target.value }))}
          placeholder="Employee ID"
        />

        <SectionTitle>End Of Contract</SectionTitle>
        <Input
          type="date"
          label="End Of Contract"
          value={form.contractEnd}
          onChange={(e) => setForm((f) => ({ ...f, contractEnd: e.target.value }))}
        />
      </div>
    </Row>
  </>
);

const Step4 = ({ form, setForm }) => (
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
          <option value="">Choose...</option>
          <option value="Engineer">Engineer</option>
          <option value="PO">Product Owner</option>
        </Select>
        <Select
          label="Qualification"
          value={form.qualification}
          onChange={(e) => setForm((f) => ({ ...f, qualification: e.target.value }))}
        >
          <option value="">Choose...</option>
          <option value="Junior">Junior</option>
          <option value="Senior">Senior</option>
        </Select>
        <Select
          label="Department"
          required
          value={form.department}
          onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
        >
          <option value="">Choose...</option>
          <option value="Engineering">Engineering</option>
          <option value="HR">HR</option>
        </Select>
        <Select
          label="Manager"
          value={form.manager}
          onChange={(e) => setForm((f) => ({ ...f, manager: e.target.value }))}
        >
          <option value="">Choose...</option>
          <option value="1">Trey Fields</option>
          <option value="2">Sylvia Weber</option>
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

const Step5 = ({ form, setForm }) => (
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
          <option value="">Choose...</option>
          <option>Employee</option>
          <option>Manager</option>
          <option>Admin</option>
        </Select>
        <Select
          label="Secondary Roles"
          value={form.secondaryRole}
          onChange={(e) => setForm((f) => ({ ...f, secondaryRole: e.target.value }))}
        >
          <option value="">Choose...</option>
          <option>HR</option>
          <option>Finance</option>
        </Select>
      </div>
    </Row>
  </>
);

/* ---------------------- Main Modal ---------------------- */

const AddEmployeeModal = ({ open, onClose }) => {
  const totalSteps = 5;
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    // Step 1
    firstName: '', lastName: '',
    // Step 2
    establishment: 'Morocco',
    contractTemplate: 'CDD',
    // Step 3
    contractStart: '', contractReason: '', probationEnd1: '', probationEnd2: '',
    category: '', employeeId: '', contractEnd: '',
    // Step 4
    jobTitle: '', qualification: '', department: '', manager: '', isOwnManager: false,
    // Step 5
    login: '', workEmail: '', personalEmail: '', notifyByEmail: true, primaryRole: '', secondaryRole: '',
  });

  const isLast = useMemo(() => step === totalSteps, [step]);
  const canPrev = step > 1;

  const closeAll = () => {
    setStep(1);
    onClose?.();
  };

  const next = () => {
    if (isLast) {
      // Here you could POST the form to your API.
      // For now, we just close it.
      closeAll();
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
        <Header step={step} totalSteps={totalSteps} onClose={closeAll} />

        <div className="pb-2">
          {step === 1 && <Step1 form={form} setForm={setForm} />}
          {step === 2 && <Step2 form={form} setForm={setForm} />}
          {step === 3 && <Step3 form={form} setForm={setForm} />}
          {step === 4 && <Step4 form={form} setForm={setForm} />}
          {step === 5 && <Step5 form={form} setForm={setForm} />}
        </div>

        <Footer
          canPrev={canPrev}
          isLast={isLast}
          onPrev={prev}
          onNext={next}
          onCancel={closeAll}
        />
      </ModalShell>
    </>
  );
};

export default AddEmployeeModal;
