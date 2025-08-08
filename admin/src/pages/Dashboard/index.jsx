import React, { useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import SearchView from '../../components/ui/SearchView';
import Button from '../../components/ui/Button';


const Dashboard = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedChips, setSelectedChips] = useState([]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const chipItems = [
    'Number of people present',
    'All tasks Generate',
    'Upcoming holidays',
    'Upcoming time off',
    'Links',
    'Documents',
    'Announcement',
    'New hires',
    'Vacant positions',
    'Upcoming departures'
  ];

  const birthdayCards = [
    {
      name: 'Hanane Amrani',
      role: 'Manager',
      date: '17 Dec',
      image: '/images/img_rectangle_4383.png'
    },
    {
      name: 'Griffin Carey',
      role: 'UI/UX',
      date: '20 Dec',
      image: '/images/img_rectangle_4383_158x210.png'
    },
    {
      name: 'Rafael Adams',
      role: 'Developer',
      date: '27 Dec',
      image: '/images/img_rectangle_4383_1.png'
    },
    {
      name: 'Carson Larson',
      role: 'Manager',
      date: '30 Dec',
      image: '/images/img_rectangle_4383_2.png'
    }
  ];

  const newHires = [
    {
      name: 'Ross Baird',
      role: 'Developer',
      date: 'Today',
      image: '/images/img_ellipse_13_40x40.png'
    },
    {
      name: 'Aden Curry',
      role: 'Designer',
      date: '8/6',
      duration: '(1 month and 27 days)',
      image: '/images/img_ellipse_13_1.png'
    }
  ];

  const upcomingDepartures = [
    {
      name: 'Terrance Powell',
      role: 'ui / ux',
      date: '22/25/2025',
      image: '/images/img_ellipse_13_2.png'
    },
    {
      name: 'Lindsay Moses',
      role: 'Developer',
      date: '22/25/2025',
      image: '/images/img_ellipse_13_3.png'
    }
  ];

  return (
    <div className="flex w-full min-h-screen bg-white">
      {/* Sidebar */}
      <div className="w-full max-w-[295px] border-r-2 border-[#e4e4e4] bg-[#f9f9f9]">
        <div className="pt-[24px] pr-[22px] pl-[22px]">
          {/* Logo */}
          <div className="mt-[4px] w-full">
            <img 
              src="/images/img_arrow_down.svg" 
              alt="SlasHR Logo" 
              className="w-full h-[88px] object-contain"
            />
          </div>

          {/* Search */}
          <div className="mt-[20px]">
            <SearchView
              placeholder="Search....."
              value={searchValue}
              onChange={handleSearchChange}
              className="w-full border border-[#e4e4e4] rounded-[8px] bg-white"
              leftImage={{
                src: "/images/img_search.svg",
                width: 12,
                height: 12
              }}
            />
          </div>

          {/* Menu Items */}
          <div className="mt-[20px] flex flex-col gap-[20px]">
            {/* Dashboard - Active */}
            <div className="flex items-center gap-[18px] p-[8px] bg-[#2b6171] rounded-[8px]">
              <img src="/images/img_frame.svg" alt="dashboard" className="w-[20px] h-[20px]" />
              <span className="text-[16px] font-poppins font-semibold leading-[25px] text-white">Dashboard</span>
            </div>

            {/* Inbox */}
            <div className="flex items-center justify-between p-[8px]">
              <div className="flex items-center gap-[18px]">
                <img src="/images/img_frame_gray_700.svg" alt="inbox" className="w-[20px] h-[20px]" />
                <span className="text-[16px] font-poppins font-semibold leading-[25px] text-[#626262]">Inbox</span>
              </div>
              <div className="bg-[#dd2e31] rounded-[6px] px-[5px] py-[2px]">
                <span className="text-[12px] font-inter font-bold leading-[15px] text-white">53</span>
              </div>
            </div>

            {/* People & Org */}
            <div className="flex items-center gap-[16px] p-[12px]">
              <img src="/images/img_frame_gray_700_20x20.svg" alt="people" className="w-[20px] h-[20px]" />
              <span className="text-[16px] font-poppins font-semibold leading-[20px] text-[#626262]">People & Org</span>
            </div>

            {/* Calendar */}
            <div className="flex items-center gap-[18px] p-[8px]">
              <img src="/images/img_frame_gray_700_18x18.svg" alt="calendar" className="w-[18px] h-[18px] ml-[4px]" />
              <span className="text-[16px] font-poppins font-semibold leading-[25px] text-[#626262]">Calendar</span>
            </div>

            {/* Documents */}
            <div className="flex items-center gap-[16px] p-[12px]">
              <img src="/images/img_frame_20x20.svg" alt="documents" className="w-[20px] h-[20px]" />
              <span className="text-[16px] font-poppins font-semibold leading-[20px] text-[#626262]">Documents</span>
            </div>

            {/* Work Schedule */}
            <div className="flex items-center gap-[16px] p-[8px]">
              <img src="/images/img_frame_18x18.svg" alt="schedule" className="w-[18px] h-[18px] ml-[4px]" />
              <span className="text-[16px] font-poppins font-semibold leading-[25px] text-[#626262]">Work Schedule</span>
            </div>

            {/* Analytics */}
            <div className="flex items-center gap-[16px] p-[8px]">
              <img src="/images/img_frame_1.svg" alt="analytics" className="w-[20px] h-[20px]" />
              <span className="text-[16px] font-poppins font-semibold leading-[25px] text-[#626262]">Analytics</span>
            </div>

            {/* Settings */}
            <div className="flex items-center gap-[16px] p-[8px]">
              <img src="/images/img_frame_2.svg" alt="settings" className="w-[20px] h-[20px]" />
              <span className="text-[16px] font-poppins font-semibold leading-[25px] text-[#626262]">Settings</span>
            </div>
          </div>

          {/* User Dropdown */}
          <div className="mt-[136px] mb-[28px]">
            <div className="flex items-center justify-between p-[28px] border border-[#e4e4e4] rounded-[10px] bg-white">
              <span className="text-[14px] font-poppins font-normal leading-[21px] text-[#626262]">Manal Battache</span>
              <img src="/images/img_vector_black_900_14x12.svg" alt="dropdown" className="w-[12px] h-[14px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-[18px] px-[24px] sm:px-[56px] py-[24px] bg-white border-b border-[#ebebeb]">
          <img 
            src="/images/img_ellipse_238.png" 
            alt="profile" 
            className="w-[44px] h-[44px] rounded-[22px]"
          />
          <div className="text-[20px] sm:text-[25px] font-poppins font-medium leading-[31px] text-black">
            <span className="font-medium">Good afternoon, </span>
            <span className="font-bold text-[#2b6171]">Manal!</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-col lg:flex-row gap-[16px] p-[24px] sm:p-[70px] pt-[12px]">
          {/* Left Column */}
          <div className="flex-1">
            {/* Post Creation */}
            <div className="bg-white border border-[#ebebeb] rounded-[20px] p-[16px] sm:p-[20px] mb-[12px]">
              <div className="flex items-center gap-[10px] mb-[34px]">
                <img 
                  src="/images/img_ellipse_237.png" 
                  alt="user" 
                  className="w-[50px] h-[50px] rounded-[24px]"
                />
                <div className="flex-1">
                  <h3 className="text-[15px] font-inter font-medium leading-[19px] text-black mb-[4px]">
                    Manal BATTACHE
                  </h3>
                  <div className="flex items-center gap-[4px] bg-[#2b6171] rounded-[5px] px-[8px] py-[2px] w-fit">
                    <img src="/images/img_frame_white_a700_10x10.svg" alt="icon" className="w-[10px] h-[10px]" />
                    <span className="text-[10px] font-inter font-medium leading-[13px] text-white">Everyone</span>
                    <img src="/images/img_vector_white_a700.svg" alt="dropdown" className="w-[6px] h-[3px]" />
                  </div>
                </div>
              </div>
              
              <p className="text-[15px] font-inter font-normal leading-[19px] text-[#626262] mb-[34px]">
                What is on your mind today?
              </p>

              <div className="flex flex-wrap items-center gap-[28px]">
                <div className="flex items-center gap-[8px]">
                  <img src="/images/img_group_gray_500_01.svg" alt="gallery" className="w-[18px] h-[18px]" />
                  <span className="text-[15px] font-inter font-normal leading-[19px] text-[#aaaaaa]">Gallery</span>
                </div>
                <div className="flex items-center gap-[6px]">
                  <img src="/images/img_group_1004_gray_500_01.svg" alt="gif" className="w-[18px] h-[18px]" />
                  <span className="text-[15px] font-inter font-normal leading-[19px] text-[#aaaaaa]">Gif</span>
                </div>
                <div className="flex items-center gap-[6px]">
                  <img src="/images/img_group_1005_gray_500_01.svg" alt="attachment" className="w-[18px] h-[18px]" />
                  <span className="text-[15px] font-inter font-normal leading-[19px] text-[#aaaaaa]">Attachment</span>
                </div>
                <div className="flex items-center gap-[6px]">
                  <img src="/images/img_group_1005_gray_500_01_18x18.svg" alt="shout-out" className="w-[18px] h-[18px]" />
                  <span className="text-[15px] font-inter font-normal leading-[19px] text-[#aaaaaa]">Shout-out</span>
                </div>
                <div className="flex items-center gap-[6px]">
                  <img src="/images/img_group_1005_18x18.svg" alt="value" className="w-[18px] h-[18px]" />
                  <span className="text-[15px] font-inter font-normal leading-[19px] text-[#aaaaaa]">Value</span>
                </div>
                <div className="flex items-center gap-[6px]">
                  <img src="/images/img_group_1005_1.svg" alt="poll" className="w-[18px] h-[18px]" />
                  <span className="text-[15px] font-inter font-normal leading-[19px] text-[#aaaaaa]">Poll</span>
                </div>
              </div>
            </div>

            {/* Upcoming Birthdays */}
            <div className="mb-[32px]">
              <h2 className="text-[20px] font-poppins font-semibold leading-[30px] text-[#2b6171] mb-[22px]">
                Upcoming Birthdays
              </h2>
              
              <div className="flex gap-[10px] overflow-x-auto">
                {birthdayCards.map((person, index) => (
                  <div key={index} className="flex-shrink-0 w-[210px]">
                    <img 
                      src={person.image} 
                      alt={person.name}
                      className="w-full h-[158px] object-cover rounded-t-[20px]"
                    />
                    <div className="bg-[#2b6171] border border-[#2b6171] rounded-b-[20px] p-[12px] text-center">
                      <h3 className="text-[15px] font-inter font-bold leading-[19px] text-white mb-[6px]">
                        {person.name}
                      </h3>
                      <p className="text-[10px] font-inter font-medium leading-[13px] text-white mb-[6px]">
                        {person.role}
                      </p>
                      <div className="flex items-center justify-center gap-[6px] mb-[12px]">
                        <img src="/images/img_vector_white_a700_12x12.svg" alt="calendar" className="w-[12px] h-[12px]" />
                        <span className="text-[10px] font-inter font-medium leading-[13px] text-white">{person.date}</span>
                        <img src="/images/img_vector_white_a700_12x12.svg" alt="calendar" className="w-[12px] h-[12px]" />
                      </div>
                      <Button className="bg-white text-[#2b6171] text-[12px] font-inter font-medium leading-[15px] px-[24px] py-[6px] rounded-[5px] w-full">
                        Shout-out
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Post */}
            <div className="bg-white border border-[#ebebeb] rounded-[20px] overflow-hidden">
              {/* Post Header */}
              <div className="flex items-center justify-between p-[42px] pb-[14px]">
                <div className="flex items-center gap-[14px]">
                  <img 
                    src="/images/img_ellipse_8_72x72.png" 
                    alt="Amina Alawi" 
                    className="w-[72px] h-[72px] rounded-[36px]"
                  />
                  <div>
                    <div className="text-[20px] font-inter font-bold leading-[25px] text-black mb-[2px]">
                      <span>Amina Alawi posted a </span>
                      <span className="text-[#2b6171]">Shout-out.</span>
                    </div>
                    <div className="flex items-center gap-[6px] mb-[2px]">
                      <img src="/images/img_group_2542.svg" alt="expertise" className="w-[14px] h-[14px]" />
                      <span className="text-[15px] font-inter font-medium leading-[19px] text-black">Expertise</span>
                    </div>
                    <div className="flex items-center gap-[6px]">
                      <span className="text-[12px] font-inter font-medium leading-[15px] text-[#626262]">6 days ago</span>
                      <img src="/images/img_frame_gray_700_10x10.svg" alt="visibility" className="w-[10px] h-[10px]" />
                      <span className="text-[12px] font-inter font-medium leading-[15px] text-[#626262]">Everyone</span>
                    </div>
                  </div>
                </div>
                <img src="/images/img_horizontal.svg" alt="menu" className="w-[30px] h-[6px]" />
              </div>

              {/* Post Content */}
              <div className="px-[42px]">
                <p className="text-[20px] font-inter font-medium leading-[29px] text-black mb-[22px] w-[88%]">
                  Employee of the Month: Yasser Amrani! At SLASHR , we believe that excellence deserves recognition.
                </p>
                
                <img 
                  src="/images/img_image_692x710.png" 
                  alt="Employee of the month" 
                  className="w-full max-w-[710px] h-[692px] object-cover rounded-[20px] mb-[24px]"
                />

                {/* Shout-out Tags */}
                <div className="mb-[24px]">
                  <p className="text-[15px] font-inter font-bold leading-[18px] text-black mb-[12px]">
                    Shout-out to
                  </p>
                  <div className="flex flex-wrap gap-[16px]">
                    <div className="flex items-center gap-[8px] bg-[#2b6171] rounded-[5px] px-[8px] py-[8px]">
                      <img src="/images/img_ellipse_247.png" alt="Jaylynn Cote" className="w-[22px] h-[22px] rounded-[10px]" />
                      <span className="text-[15px] font-inter font-normal leading-[18px] text-white">Jaylynn Cote</span>
                    </div>
                    <div className="flex items-center gap-[8px] bg-[#2b6171] rounded-[5px] px-[6px] py-[8px]">
                      <img src="/images/img_ellipse_247_22x22.png" alt="Jael Calhoun" className="w-[22px] h-[22px] rounded-[10px]" />
                      <span className="text-[15px] font-inter font-normal leading-[18px] text-white">Jael Calhoun</span>
                    </div>
                    <div className="flex items-center gap-[8px] bg-[#2b6171] rounded-[5px] px-[6px] py-[8px]">
                      <img src="/images/img_ellipse_247_1.png" alt="Rey Willis" className="w-[22px] h-[22px] rounded-[10px]" />
                      <span className="text-[15px] font-inter font-normal leading-[18px] text-white">Rey Willis</span>
                    </div>
                    <div className="flex items-center gap-[8px] bg-[#2b6171] rounded-[5px] px-[6px] py-[8px]">
                      <img src="/images/img_ellipse_247_2.png" alt="Abram Bush" className="w-[22px] h-[22px] rounded-[10px]" />
                      <span className="text-[15px] font-inter font-normal leading-[18px] text-white">Abram Bush</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Footer */}
              <div className="bg-white border-t border-[#ebebeb] p-[22px]">
                <div className="flex items-center justify-between max-w-[70%] mx-auto">
                  <div className="flex items-center gap-[8px]">
                    <img src="/images/img_heart_2_1.png" alt="likes" className="w-[26px] h-[26px]" />
                    <span className="text-[12px] font-inter font-medium leading-[14px] text-black">4,650 likes</span>
                  </div>
                  <div className="flex items-center gap-[12px]">
                    <img src="/images/img_chat_bubble_1.png" alt="comments" className="w-[24px] h-[26px]" />
                    <span className="text-[12px] font-inter font-medium leading-[14px] text-black">57 comments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[742px] flex flex-col gap-[20px]">
            {/* Customize Dashboard */}
            <div className="bg-white border border-[#ebebeb] rounded-[20px] p-[18px] sm:p-[22px]">
              <h2 className="text-[20px] font-poppins font-semibold leading-[30px] text-[#2b6171] mb-[18px]">
                Customize your dashboard
              </h2>
              
              <div className="flex flex-wrap gap-[12px]">
                {chipItems.map((item, index) => (
                  <div 
                    key={index}
                    className="border border-[#ebebeb] rounded-[5px] px-[20px] py-[6px] text-[15px] font-inter font-semibold leading-[19px] text-[#626262] cursor-pointer hover:bg-gray-50"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Present */}
            <div className="bg-white border border-[#ebebeb] rounded-[20px] p-[16px] sm:p-[26px]">
              <h2 className="text-[20px] font-poppins font-semibold leading-[30px] text-[#2b6171] mb-[24px]">
                Present
              </h2>
              
              <div className="space-y-[24px]">
                {/* On-site */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <img src="/images/img_ellipse_10_36x36.png" alt="person1" className="w-[36px] h-[36px] rounded-[18px]" />
                      <img src="/images/img_ellipse_11_36x36.png" alt="person2" className="w-[36px] h-[36px] rounded-[18px] -ml-[18px]" />
                      <img src="/images/img_ellipse_12_36x36.png" alt="person3" className="w-[36px] h-[36px] rounded-[18px] -ml-[18px]" />
                      <img src="/images/img_ellipse_13.png" alt="person4" className="w-[36px] h-[36px] rounded-[18px] -ml-[18px]" />
                      <img src="/images/img_ellipse_14.png" alt="person5" className="w-[36px] h-[36px] rounded-[18px] -ml-[18px]" />
                      <img src="/images/img_ellipse_15.png" alt="person6" className="w-[36px] h-[36px] rounded-[18px] -ml-[18px]" />
                      <img src="/images/img_ellipse_16.png" alt="person7" className="w-[36px] h-[36px] rounded-[18px] -ml-[18px]" />
                      <div className="bg-[#2b6171] rounded-[18px] w-[36px] h-[36px] flex items-center justify-center -ml-[16px]">
                        <span className="text-[11px] font-inter font-bold leading-[14px] tracking-[1px] text-white">3</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[15px] font-poppins font-semibold leading-[23px] tracking-[1px] text-black">On-site</span>
                </div>

                {/* Working from home */}
                <div className="flex items-center justify-between">
                  <img src="/images/img_group_2024.png" alt="working from home" className="w-[90px] h-[36px]" />
                  <span className="text-[15px] font-poppins font-semibold leading-[23px] tracking-[1px] text-black">Working from home</span>
                </div>

                {/* Delays */}
                <div className="flex items-center justify-between">
                  <img src="/images/img_group_2023.png" alt="delays" className="w-[54px] h-[36px]" />
                  <span className="text-[15px] font-inter font-semibold leading-[19px] tracking-[1px] text-black">Delays</span>
                </div>
              </div>
            </div>

            {/* New hires */}
            <div className="bg-white border border-[#ebebeb] rounded-[20px] p-[16px] sm:p-[24px]">
              <h2 className="text-[20px] font-poppins font-semibold leading-[30px] text-[#2b6171] mb-[24px]">
                New hires
              </h2>
              
              <div className="space-y-[28px]">
                {newHires.map((hire, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-[8px]">
                      <img 
                        src={hire.image} 
                        alt={hire.name}
                        className="w-[40px] h-[40px] rounded-[20px]"
                      />
                      <div>
                        <h3 className="text-[15px] font-inter font-semibold leading-[19px] tracking-[1px] text-black">
                          {hire.name}
                        </h3>
                        <p className="text-[11px] font-poppins font-medium leading-[17px] tracking-[1px] text-[#626262]">
                          {hire.role}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[15px] font-poppins font-semibold leading-[23px] tracking-[1px] text-black">
                        {hire.date === 'Today' ? (
                          <span>🎊 Today 🎊</span>
                        ) : (
                          hire.date
                        )}
                      </div>
                      {hire.duration && (
                        <p className="text-[11px] font-poppins font-semibold leading-[17px] tracking-[1px] text-[#b5b7c0]">
                          {hire.duration}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming departures */}
            <div className="bg-white border border-[#ebebeb] rounded-[20px] p-[16px] sm:p-[24px]">
              <h2 className="text-[20px] font-poppins font-semibold leading-[30px] text-[#2b6171] mb-[24px]">
                Upcoming departures
              </h2>
              
              <div className="space-y-[30px]">
                {upcomingDepartures.map((departure, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-[8px]">
                      <img 
                        src={departure.image} 
                        alt={departure.name}
                        className="w-[40px] h-[40px] rounded-[20px]"
                      />
                      <div>
                        <h3 className="text-[15px] font-inter font-semibold leading-[19px] tracking-[1px] text-black">
                          {departure.name}
                        </h3>
                        <p className="text-[11px] font-poppins font-medium leading-[17px] tracking-[1px] text-[#626262]">
                          {departure.role}
                        </p>
                      </div>
                    </div>
                    <span className="text-[15px] font-poppins font-medium leading-[23px] tracking-[1px] text-black">
                      {departure.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Assistant Button */}
        <div className="fixed bottom-[23px] right-[23px] z-50">
          <img 
            src="/images/img_ask_slashr_ai.svg" 
            alt="Ask SlasHR AI" 
            className="w-[218px] h-[56px] cursor-pointer hover:opacity-90 transition-opacity"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;