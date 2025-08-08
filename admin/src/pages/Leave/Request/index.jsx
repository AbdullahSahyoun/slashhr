import React, { useState } from 'react';
import EditText from '../../../components/ui/EditText';

const LeaveRequestPage = () => {
  const [formData, setFormData] = useState({
    community: 'Holidays',
    fromDate: '03/03/2025',
    untilDate: '10/03/2025',
    duration: '6 Days',
    available: '17 Days'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleViewLeaveDetails = () => {
    // Handle view leave details action
    console.log('View leave details clicked');
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="bg-white rounded-[14px] p-[26px] mt-[134px] md:mt-[268px] shadow-sm">
          <div className="flex flex-col lg:flex-row justify-start items-start gap-[28px]">
            {/* Close Button */}
            <div className="w-full flex justify-end lg:hidden">
              <img 
                src="/images/img_vector.svg" 
                alt="close" 
                className="w-[12px] h-[12px] cursor-pointer"
              />
            </div>

            {/* Left Section - Basic Information */}
            <div className="w-full lg:w-[46%] flex flex-col gap-[28px]">
              <div className="flex flex-col gap-[18px]">
                <img 
                  src="/images/img_group_1451.svg" 
                  alt="basic info icon" 
                  className="w-[24px] h-[32px]"
                />
                <h2 className="text-[16px] md:text-[20px] font-inter font-bold leading-[20px] md:leading-[25px] text-left text-global-1">
                  Basic information
                </h2>
              </div>

              <div className="flex flex-col gap-[40px]">
                <div className="flex flex-col gap-[8px]">
                  <h3 className="text-[16px] md:text-[20px] font-inter font-medium leading-[20px] md:leading-[25px] text-left text-global-1">
                    Approval request
                  </h3>
                  <p className="text-[16px] md:text-[20px] font-inter font-medium leading-[20px] md:leading-[25px] text-left text-global-3">
                    View all approvers and their actions
                  </p>
                </div>

                {/* Approval History Card */}
                <div className="bg-white border border-global-6 rounded-[14px] p-[24px] shadow-[0px_0px_6px_#00000005]">
                  <div className="flex flex-col gap-[20px]">
                    <div className="flex flex-col gap-[16px]">
                      <p className="text-[12px] md:text-[15px] font-inter font-medium leading-[15px] md:leading-[19px] text-left text-global-3">
                        Approval history
                      </p>
                      <div className="w-full h-[1px] bg-global-6"></div>
                    </div>

                    <div className="flex flex-col gap-[8px]">
                      <div className="flex flex-row justify-start items-center gap-[12px]">
                        <div className="flex justify-center items-center w-[24px] h-[24px] bg-global-5 rounded-[4px]">
                          <span className="text-[10px] md:text-[12px] font-poppins font-medium leading-[15px] md:leading-[18px] text-center text-global-5">
                            1
                          </span>
                        </div>
                        <div className="bg-global-11 rounded-[10px] px-[12px] py-[2px]">
                          <span className="text-[10px] md:text-[12px] font-inter font-medium leading-[12px] md:leading-[15px] text-left text-global-1">
                            Pending - Current step
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col justify-start items-end gap-[8px] ml-[42px]">
                        <img 
                          src="/images/img_ellipse_45.png" 
                          alt="user avatar" 
                          className="w-[30px] h-[30px] rounded-[14px]"
                        />
                        <img 
                          src="/images/img_frame_12x12.svg" 
                          alt="status icon" 
                          className="w-[12px] h-[12px] -mt-[10px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider Line - Hidden on mobile */}
            <div className="hidden lg:block w-[1px] h-[418px] bg-global-6 mt-[6px]"></div>

            {/* Right Section - Leave Request Form */}
            <div className="w-full lg:flex-1 flex flex-col gap-[24px]">
              {/* Close Button - Desktop */}
              <div className="hidden lg:flex justify-end">
                <img 
                  src="/images/img_vector.svg" 
                  alt="close" 
                  className="w-[12px] h-[12px] cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-[24px]">
                {/* Select Community */}
                <div className="flex flex-col gap-[8px]">
                  <label className="text-[12px] md:text-[15px] font-inter font-bold leading-[15px] md:leading-[19px] text-left capitalize text-global-1">
                    Select Community
                  </label>
                  <EditText
                    placeholder="Holidays"
                    value={formData.community}
                    onChange={(e) => handleInputChange('community', e.target.value)}
                    className="w-full px-[24px] py-[14px] bg-edittext-1 border border-[#e4e4e4] rounded-[10px] text-[12px] md:text-[15px] font-inter font-bold leading-[15px] md:leading-[19px] text-left capitalize text-global-3"
                  />
                </div>

                {/* From and Until Date Row */}
                <div className="flex flex-col md:flex-row justify-start items-center gap-[16px] md:gap-[22px]">
                  <div className="w-full flex flex-col gap-[8px]">
                    <label className="text-[12px] md:text-[15px] font-inter font-bold leading-[15px] md:leading-[19px] text-left capitalize text-global-1">
                      From
                    </label>
                    <EditText
                      placeholder="03/03/2025"
                      value={formData.fromDate}
                      onChange={(e) => handleInputChange('fromDate', e.target.value)}
                      className="w-full px-[24px] py-[14px] bg-edittext-1 border border-[#e4e4e4] rounded-[10px] text-[12px] md:text-[15px] font-inter font-bold leading-[15px] md:leading-[19px] text-left capitalize text-global-3"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-[8px]">
                    <label className="text-[12px] md:text-[15px] font-inter font-bold leading-[15px] md:leading-[19px] text-left capitalize text-global-1">
                      Until
                    </label>
                    <EditText
                      placeholder="10/03/2025"
                      value={formData.untilDate}
                      onChange={(e) => handleInputChange('untilDate', e.target.value)}
                      className="w-full px-[24px] py-[14px] bg-edittext-1 border border-[#e4e4e4] rounded-[10px] text-[12px] md:text-[15px] font-inter font-bold leading-[15px] md:leading-[19px] text-left capitalize text-global-3"
                    />
                  </div>
                </div>

                {/* Duration and Available Row */}
                <div className="flex flex-col md:flex-row justify-start items-center gap-[16px] md:gap-[22px]">
                  <div className="w-full flex flex-col gap-[8px]">
                    <label className="text-[12px] md:text-[15px] font-inter font-bold leading-[15px] md:leading-[19px] text-left capitalize text-global-1">
                      Duration
                    </label>
                    <EditText
                      placeholder="6 Days"
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      className="w-full px-[24px] py-[14px] bg-edittext-1 border border-[#e4e4e4] rounded-[10px] text-[12px] md:text-[15px] font-inter font-bold leading-[15px] md:leading-[19px] text-left capitalize text-global-3"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-[8px]">
                    <label className="text-[12px] md:text-[15px] font-inter font-bold leading-[15px] md:leading-[19px] text-left capitalize text-global-1">
                      Available
                    </label>
                    <EditText
                      placeholder="17 Days"
                      value={formData.available}
                      onChange={(e) => handleInputChange('available', e.target.value)}
                      className="w-full px-[24px] py-[14px] bg-edittext-1 border border-[#e4e4e4] rounded-[10px] text-[12px] md:text-[15px] font-inter font-bold leading-[15px] md:leading-[19px] text-left capitalize text-global-3"
                    />
                  </div>
                </div>

                {/* Overlap Warning */}
                <button className="w-full bg-button-2 rounded-[14px] px-[32px] py-[14px] text-[14px] md:text-[16px] font-inter font-medium leading-[18px] md:leading-[20px] text-center text-global-2">
                  This absence request overlaps with 9 people in your company., 2 people in their teams
                </button>

                {/* View Leave Details Link */}
                <div className="flex justify-end">
                  <button 
                    onClick={handleViewLeaveDetails}
                    className="text-[14px] md:text-[16px] font-inter font-medium leading-[18px] md:leading-[20px] text-right underline text-global-2 hover:text-global-3 transition-colors duration-200"
                  >
                    View leave details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestPage;