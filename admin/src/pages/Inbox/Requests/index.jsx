/* inbox/Request/index.jsx */
import React, { useState } from 'react';
import Dropdown from '../../../components/ui/Dropdown';

const InboxTimeOffPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('All Requests');

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
  };

  const handleApprove = (requestId) => {
    console.log('Approve request:', requestId);
  };

  const handleReject = (requestId) => {
    console.log('Reject request:', requestId);
  };

  const requests = [
    {
      id: 1,
      name: 'Manal Battache',
      avatar: '/images/img_ellipse_44.png',
      type: 'time off request is pending',
      status: 'Overdue',
      dueDate: '3 Mar 2025',
      requestDate: '9 Mar 2025. Time off',
      description: 'Holidays from 03 March, 2025 to 10 March, 2025',
      isOverdue: true
    },
    {
      id: 2,
      name: 'Briana Pope',
      avatar: '/images/img_ellipse_44.png',
      type: 'time off request is pending',
      status: 'Pending',
      dueDate: '3 Mar 2025',
      requestDate: '9 Mar 2025. Time off',
      description: 'Holidays from 03 March, 2025 to 10 March, 2025',
      isOverdue: false
    },
    {
      id: 3,
      name: 'Maddison Hammond',
      avatar: '/images/img_ellipse_44.png',
      type: 'time off request is pending',
      status: 'Overdue',
      dueDate: '3 Mar 2025',
      requestDate: '9 Mar 2025. Time off',
      description: 'Holidays from 03 March, 2025 to 10 March, 2025',
      isOverdue: true
    }
  ];

  return (
    <div className="flex w-full min-h-screen bg-white">
      <div className="flex-1 flex flex-col px-[62px] pt-12 pb-8">
        <div className="flex flex-col lg:flex-row gap-9">
          {/* Active Requests Card */}
          <div className="w-full lg:w-[28%] border border-header-1 rounded-[14px] p-5">
            <div className="flex flex-col gap-[18px]">
              <h3 className="text-lg font-medium font-poppins text-black">Active requests</h3>
              <div className="text-[48px] font-medium font-poppins text-black">53</div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium font-poppins text-global-10">Overdue</span>
                <span className="text-lg font-medium font-poppins text-global-10">2</span>
              </div>
            </div>
          </div>

          {/* Requests List */}
          <div className="flex-1 relative">
            {/* Background Container */}
            <div className="absolute inset-0 border border-header-1 rounded-[14px] shadow-[0px_0px_6px_#00000005]" />

            {/* Filter Dropdown */}
            <div className="relative z-10 px-6 pt-4">
              <div className="w-full max-w-[200px]">
                <Dropdown
                  value={selectedFilter}
                  onChange={handleFilterChange}
                  options={['All Requests', 'Pending', 'Overdue', 'Approved']}
                  className="border border-[#e6e6e6] rounded-[10px] bg-white"
                  rightImage={{
                    src: "/images/img_arrowdown_gray_700.svg",
                    width: 16,
                    height: 18
                  }}
                />
              </div>
            </div>

            {/* Divider */}
            <div className="relative z-10 px-6 mt-4">
              <div className="w-full h-px bg-header-1" />
            </div>

            {/* Requests List */}
            <div className="relative z-10 px-6 py-6 max-h-[600px] overflow-y-auto">
              <div className="flex flex-col">
                {requests.map((request, index) => (
                  <div key={request.id}>
                    <div className="flex items-start justify-between py-4">
                      {/* Request Info */}
                      <div className="flex items-start gap-[14px] flex-1">
                        <img
                          src={request.avatar}
                          alt={`${request.name} avatar`}
                          className="w-9 h-9 rounded-full flex-shrink-0"
                        />
                        <div className="flex flex-col gap-1.5 flex-1">
                          <div className="text-[15px] font-medium font-inter text-black">
                            <span className="font-bold">{request.name}</span>
                            <span className="text-global-3"> {request.type}</span>
                          </div>

                          {/* Status and Due Date */}
                          <div className="flex items-center gap-2">
                            {request.isOverdue && (
                              <div className="bg-white rounded border px-1 py-0.5">
                                <span className="text-xs font-medium font-poppins text-global-9">Overdue</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1.5">
                              <img
                                src={request.isOverdue ? "/images/img_frame_red_600.svg" : "/images/img_frame_5.svg"}
                                alt="Calendar"
                                className="w-5 h-5"
                              />
                              <span
                                className={`text-xs font-medium font-poppins ${
                                  request.isOverdue ? 'text-global-9' : 'text-global-3'
                                }`}
                              >
                                Due date: {request.dueDate}
                              </span>
                            </div>
                          </div>

                          <div className="text-[13px] font-medium font-inter text-global-3">
                            {request.requestDate}
                          </div>
                          <div className="text-xs font-medium font-inter text-global-3">
                            {request.description}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-5 ml-4">
                        <button
                          onClick={() => handleReject(request.id)}
                          className="px-[14px] py-1.5 border border-[#ffc9ca] rounded-[10px] bg-global-10 text-xs font-medium font-inter text-black hover:bg-opacity-80 transition-colors"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleApprove(request.id)}
                          className="px-4 py-1.5 border border-[#c7e6c9] rounded-[10px] bg-button-3 text-xs font-medium font-inter text-black hover:bg-opacity-80 transition-colors"
                        >
                          Approve
                        </button>
                        <img
                          src="/images/img_arrow_right_gray_700.svg"
                          alt="View details"
                          className="w-2.5 h-2 cursor-pointer hover:opacity-70"
                        />
                      </div>
                    </div>

                    {/* Divider between requests */}
                    {index < requests.length - 1 && (
                      <div className="w-full h-px bg-header-1 my-4" />
                    )}
                  </div>
                ))}

                {/* Complaint Example */}
                <div className="mt-8">
                  <div className="w-full h-px bg-header-1" />
                  <div className="flex items-start gap-[14px] py-6">
                    <img
                      src="/images/img_avatar_image_37.png"
                      alt="Complaint avatar"
                      className="w-9 h-9 rounded-full flex-shrink-0"
                    />
                    <div className="flex flex-col gap-1">
                      <div className="text-[15px] font-bold font-inter text-black">
                        You have received a new complaint
                      </div>
                      <div className="text-[13px] font-medium font-inter text-global-3">
                        9 Mar 2025. Whistleblowing channel
                      </div>
                      <div className="text-[13px] font-medium font-inter text-global-3 mt-2">
                        I would like to request that we start implementing remote work options. This need has been expressed by several of us in the office, as we believe it would improve both productivity and work-life balance. Although we have rais...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Assistant Button */}
            <div className="absolute bottom-4 right-4 z-20">
              <img
                src="/images/img_ask_slashr_ai.svg"
                alt="Ask SlasHR AI"
                className="w-[218px] h-14 cursor-pointer hover:opacity-90 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxTimeOffPage;
