import React, { useState } from 'react';

const ExportPage = () => {
  const [fileName, setFileName] = useState('20250321-Headcount Evolution 2025-03-01.288488');
  const [fileFormat, setFileFormat] = useState('Excel');

  const handleExport = () => {
    // Handle export functionality
    console.log('Exporting file:', fileName, 'as', fileFormat);
  };

  const handleClose = () => {
    // Handle close functionality
    console.log('Closing export dialog');
  };

  return (
    <div className="w-full min-h-screen bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-[20px] shadow-lg">
        {/* Header Section */}
        <div className="flex justify-between items-start p-6 pb-4">
          <div className="flex-1">
            <h2 className="text-[22px] font-bold font-inter text-global-2 capitalize leading-[27px] mb-4">
              Export View
            </h2>
            <p className="text-[14px] font-medium font-inter text-global-3 leading-[17px]">
              Export the current view as a CSV or Excel file.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="ml-4 p-1 hover:bg-gray-100 rounded transition-colors duration-200"
            aria-label="Close dialog"
          >
            <img 
              src="/images/img_vector.svg" 
              alt="close" 
              className="w-[12px] h-[12px]"
            />
          </button>
        </div>

        {/* Form Section */}
        <div className="px-6 pb-6 space-y-[14px]">
          {/* File Name Field */}
          <div className="space-y-[6px]">
            <label className="block text-[15px] font-bold font-inter text-global-1 leading-[19px]">
              File name
            </label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full px-6 py-[14px] text-[15px] font-medium font-inter text-global-1 capitalize leading-[19px] border border-[#e4e4e4] rounded-[14px] focus:outline-none focus:ring-2 focus:ring-global-2 focus:border-transparent transition-colors duration-200"
              placeholder="20250321-Headcount evolution 2025-03-01.288488"
            />
          </div>

          {/* File Format Field */}
          <div className="space-y-[6px]">
            <label className="block text-[15px] font-bold font-inter text-global-1 leading-[19px]">
              File format
            </label>
            <div className="relative">
              <select
                value={fileFormat}
                onChange={(e) => setFileFormat(e.target.value)}
                className="w-full px-[34px] py-[14px] pr-[42px] text-[15px] font-medium font-inter text-global-1 capitalize leading-[19px] border border-[#e4e4e4] rounded-[14px] bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-global-2 focus:border-transparent transition-colors duration-200"
              >
                <option value="Excel">Excel</option>
                <option value="CSV">CSV</option>
              </select>
              <div className="absolute inset-y-0 right-[34px] flex items-center pointer-events-none">
                <img 
                  src="/images/img_vector_gray_300.svg" 
                  alt="dropdown arrow" 
                  className="w-[8px] h-[6px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <button
          onClick={handleExport}
          className="w-full px-[34px] py-[22px] bg-global-3 text-[17px] font-bold font-inter text-global-5 capitalize leading-[21px] rounded-b-[20px] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-global-2 focus:ring-offset-2 transition-all duration-200"
        >
          Export
        </button>
      </div>
    </div>
  );
};

export default ExportPage;