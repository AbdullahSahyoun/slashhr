import React, { useState } from 'react';
import EditText from '../../../components/ui/EditText';

const EmployeePersonalPage = () => {
  const [selectedEmployee] = useState('Manal Battache');

  return (
    <div className="w-full min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-10">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">

        {/* Profile Photo */}
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md">
          <img
            src="/images/img_ellipse_25.png"
            alt={selectedEmployee}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card */}
        <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-md p-6 sm:p-8 space-y-8">
          
          {/* Name & ID */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900">{selectedEmployee}</h2>
            <p className="text-sm text-gray-500 mt-1">ID : 123 567 890 542</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <FormGrid>
              <FormField label="First name" placeholder="Manal" />
              <FormField label="Last name" placeholder="BATTACHE" />
            </FormGrid>

            <FormGrid>
              <FormField label="Preferred name" placeholder="Manal" />
              <FormField label="Gender" placeholder="Female" />
            </FormGrid>

            <FormGrid>
              <FormField label="Nationality" placeholder="Moroccan" />
              <FormField label="Date of birth" placeholder="10/11/1990" />
            </FormGrid>

            <FormGrid>
              <FormField label="Marital status" placeholder="Single" />
              <FormField label="Phone number" placeholder="+212 608 945 067" />
            </FormGrid>

            <FormGrid>
              <FormField label="CIN" placeholder="BL18388" />
              <FormField label="Personal email" placeholder="Manal.BATTACHE@gmail.com" />
            </FormGrid>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Personal address</label>
              <EditText
                placeholder="Bd Zertkouni, Maarif, Casablanca 20610"
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-sm text-black"
              />
            </div>

            {/* Emergency Contact */}
            <div className="space-y-4 pt-6">
              <h3 className="text-lg font-semibold text-global-2">Emergency contact</h3>

              <FormGrid>
                <FormField label="Full name" placeholder="Full name" />
                <FormField label="Phone number" placeholder="+212 608 945 067" />
              </FormGrid>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Relationship</label>
                <EditText
                  placeholder="-"
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white text-sm text-black"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Layout Grid
const FormGrid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
);

// Single Field
const FormField = ({ label, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-800 mb-1">{label}</label>
    <EditText
      placeholder={placeholder}
      className="w-full p-3 border border-gray-300 rounded-lg bg-white text-sm text-black"
    />
  </div>
);

export default EmployeePersonalPage;
