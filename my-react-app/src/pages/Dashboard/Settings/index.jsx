import React, { useState } from 'react';

const DashboardSettings = () => {
  const [settings, setSettings] = useState({
    numberOfPeoplePresent: true,
    upcomingTimeOff: true,
    allTasksGenerate: true,
    upcomingHolidays: true,
    announcement: true,
    documents: true,
    links: true,
    vacantPositions: true,
    upcomingDepartures: true,
    newHires: true
  });

  const handleToggle = (settingKey) => {
    setSettings(prev => ({
      ...prev,
      [settingKey]: !prev[settingKey]
    }));
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Handle save logic here
  };

  const ToggleSwitch = ({ isOn, onToggle }) => (
    <button
      type="button"
      onClick={onToggle}
      className={`
        relative inline-flex h-[20px] w-[36px] items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${isOn ? 'bg-[#2b6171]' : 'bg-gray-300'}
      `}
    >
      <span
        className={`
          inline-block h-[16px] w-[16px] transform rounded-full bg-white transition-transform duration-200 ease-in-out
          ${isOn ? 'translate-x-[18px]' : 'translate-x-[2px]'}
        `}
      />
    </button>
  );

  const SettingItem = ({ label, settingKey, isLast = false }) => (
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-between items-center w-full py-[13px]">
        <p className="text-[14px] sm:text-[16px] md:text-[18px] font-poppins font-medium leading-[20px] sm:leading-[24px] md:leading-[27px] text-left capitalize text-[#626262] flex-1">
          {label}
        </p>
        <ToggleSwitch 
          isOn={settings[settingKey]} 
          onToggle={() => handleToggle(settingKey)} 
        />
      </div>
      {!isLast && (
        <div className="w-full h-[1px] bg-[#eeeeee]"></div>
      )}
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-end">
      <div className="w-full max-w-[448px] bg-[#ffffff] shadow-[0px_8px_16px_#00000014] flex flex-col">
        {/* Header */}
        <div className="w-full bg-[#ffffff] border-b border-[#eeeeee] px-[16px] sm:px-[20px] md:px-[24px] py-[20px] sm:py-[22px] md:px-[24px]">
          <div className="flex flex-row justify-between items-start w-full">
            <h1 className="text-[18px] sm:text-[20px] md:text-[22px] font-inter font-bold leading-[22px] sm:leading-[24px] md:leading-[27px] text-left text-[#2b6171] self-center">
              Edit dashboard widget
            </h1>
            <button 
              type="button"
              className="mt-[4px] sm:mt-[5px] md:mt-[6px] w-[14px] h-[14px] flex-shrink-0"
              aria-label="Close"
            >
              <img 
                src="/images/img_vector.svg" 
                alt="close" 
                className="w-full h-full"
              />
            </button>
          </div>
        </div>

        {/* Settings List */}
        <div className="flex-1 px-[16px] sm:px-[24px] md:px-[32px] py-[20px] sm:py-[24px] md:py-[32px]">
          <div className="flex flex-col gap-[16px] sm:gap-[18px] md:gap-[20px] w-full">
            <SettingItem 
              label="Number Of People Present" 
              settingKey="numberOfPeoplePresent" 
            />
            <SettingItem 
              label="Upcoming Time Off" 
              settingKey="upcomingTimeOff" 
            />
            <SettingItem 
              label="All Tasks Generate" 
              settingKey="allTasksGenerate" 
            />
            <SettingItem 
              label="Upcoming Holidays" 
              settingKey="upcomingHolidays" 
            />
            <SettingItem 
              label="Announcement" 
              settingKey="announcement" 
            />
            <SettingItem 
              label="Documents" 
              settingKey="documents" 
            />
            <SettingItem 
              label="Links" 
              settingKey="links" 
            />
            <SettingItem 
              label="Vacant Positions" 
              settingKey="vacantPositions" 
            />
            <SettingItem 
              label="Upcoming Departures" 
              settingKey="upcomingDepartures" 
            />
            <SettingItem 
              label="New Hires" 
              settingKey="newHires" 
              isLast={true}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="w-full px-[16px] sm:px-[20px] md:px-[24px] pb-[20px] sm:pb-[24px] md:pb-[32px]">
          <button
            type="button"
            onClick={handleSave}
            className="w-full bg-[#2b6171] text-[#ffffff] text-[14px] sm:text-[16px] md:text-[17px] font-inter font-bold leading-[18px] sm:leading-[20px] md:leading-[21px] text-center capitalize py-[18px] sm:py-[20px] md:py-[22px] px-[28px] sm:px-[30px] md:px-[34px] rounded-md hover:bg-[#1e4a57] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSettings;