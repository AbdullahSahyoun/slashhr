import React, { useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import SearchView from '../../components/ui/SearchView';
import Button from '../../components/ui/Button';

const Dashboard = () => {
  const [searchValue, setSearchValue] = useState('');
  const handleSearchChange = (e) => setSearchValue(e.target.value);

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
    { name: 'Hanane Amrani', role: 'Manager', date: '17 Dec', image: '/images/img_rectangle_4383.png' },
    { name: 'Griffin Carey', role: 'UI/UX', date: '20 Dec', image: '/images/img_rectangle_4383_158x210.png' },
    { name: 'Rafael Adams', role: 'Developer', date: '27 Dec', image: '/images/img_rectangle_4383_1.png' },
    { name: 'Carson Larson', role: 'Manager', date: '30 Dec', image: '/images/img_rectangle_4383_2.png' }
  ];

  const newHires = [
    { name: 'Ross Baird', role: 'Developer', date: 'Today', image: '/images/img_ellipse_13_40x40.png' },
    { name: 'Aden Curry', role: 'Designer', date: '8/6', duration: '(1 month and 27 days)', image: '/images/img_ellipse_13_1.png' }
  ];

  const upcomingDepartures = [
    { name: 'Terrance Powell', role: 'ui / ux', date: '22/25/2025', image: '/images/img_ellipse_13_2.png' },
    { name: 'Lindsay Moses', role: 'Developer', date: '22/25/2025', image: '/images/img_ellipse_13_3.png' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed sidebar */}
      <Sidebar active="Dashboard" />

      {/* MAIN WRAPPER: pad-left to clear fixed sidebar (adjust to your actual width) */}
      <div className="pl-[295px] sm:pl-[84px] md:pl-[0px]">

        {/* Sticky header */}
        <header className="sticky top-0 z-20 bg-white border-b border-[#ebebeb]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src="/images/img_ellipse_238.png"
                alt="profile"
                className="w-[44px] h-[44px] rounded-full object-cover"
              />
              <div className="text-[18px] sm:text-[22px] font-poppins text-black">
                <span className="font-medium">Good afternoon, </span>
                <span className="font-bold text-[#2b6171]">Manal!</span>
              </div>
            </div>

            <div className="hidden sm:block w-[280px]">
              <SearchView
                placeholder="Search…"
                value={searchValue}
                onChange={handleSearchChange}
                className="w-full border border-[#e4e4e4] rounded-[8px] bg-white"
                leftImage={{ src: "/images/img_search.svg", width: 12, height: 12 }}
              />
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="max-w-[1400px] mx-auto px-4 sm:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* LEFT COLUMN */}
            <section className="min-w-0">
              {/* Post Creation */}
              <div className="bg-white border border-[#ebebeb] rounded-[20px] p-4 sm:p-5 mb-4">
                <div className="flex items-center gap-3 mb-6">
                  <img src="/images/img_ellipse_237.png" alt="user" className="w-[50px] h-[50px] rounded-full" />
                  <div className="">
                    <h3 className="text-[15px] font-inter font-medium text-black mb-1">Manal BATTACHE</h3>
                    <div className="flex items-center gap-1 bg-[#2b6171] rounded-[5px] px-2 py-0.5 w-fit">
                      <img src="/images/img_frame_white_a700_10x10.svg" alt="" className="w-2.5 h-2.5" />
                      <span className="text-[10px] font-inter text-white">Everyone</span>
                      <img src="/images/img_vector_white_a700.svg" alt="" className="w-1.5 h-[3px]" />
                    </div>
                  </div>
                </div>

                <p className="text-[15px] font-inter text-[#626262] mb-6">What is on your mind today?</p>

                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <img src="/images/img_group_gray_500_01.svg" alt="gallery" className="w-[18px] h-[18px]" />
                    <span className="text-[15px] text-[#aaaaaa]">Gallery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src="/images/img_group_1004_gray_500_01.svg" alt="gif" className="w-[18px] h-[18px]" />
                    <span className="text-[15px] text-[#aaaaaa]">Gif</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src="/images/img_group_1005_gray_500_01.svg" alt="attachment" className="w-[18px] h-[18px]" />
                    <span className="text-[15px] text-[#aaaaaa]">Attachment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src="/images/img_group_1005_gray_500_01_18x18.svg" alt="shout-out" className="w-[18px] h-[18px]" />
                    <span className="text-[15px] text-[#aaaaaa]">Shout-out</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src="/images/img_group_1005_18x18.svg" alt="value" className="w-[18px] h-[18px]" />
                    <span className="text-[15px] text-[#aaaaaa]">Value</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src="/images/img_group_1005_1.svg" alt="poll" className="w-[18px] h-[18px]" />
                    <span className="text-[15px] text-[#aaaaaa]">Poll</span>
                  </div>
                </div>
              </div>

              {/* Upcoming Birthdays */}
              <div className="mb-8">
                <h2 className="text-[20px] font-poppins font-semibold text-[#2b6171] mb-4">Upcoming Birthdays</h2>
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {birthdayCards.map((p, i) => (
                    <div key={i} className="flex-shrink-0 w-[210px]">
                      <img src={p.image} alt={p.name} className="w-full h-[158px] object-cover rounded-t-[20px]" />
                      <div className="bg-[#2b6171] border border-[#2b6171] rounded-b-[20px] p-3 text-center">
                        <h3 className="text-[15px] font-inter font-bold text-white mb-1">{p.name}</h3>
                        <p className="text-[10px] font-inter text-white mb-1">{p.role}</p>
                        <div className="flex items-center justify-center gap-1.5 mb-3">
                          <img src="/images/img_vector_white_a700_12x12.svg" alt="" className="w-3 h-3" />
                          <span className="text-[10px] font-inter text-white">{p.date}</span>
                          <img src="/images/img_vector_white_a700_12x12.svg" alt="" className="w-3 h-3" />
                        </div>
                        <Button className="bg-white text-[#2b6171] text-[12px] font-inter px-6 py-1.5 rounded-[5px] w-full">
                          Shout-out
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* TIMELINE POST (restored) */}
              <div className="bg-white border border-[#ebebeb] rounded-[20px] overflow-hidden">
                {/* Post Header */}
                <div className="flex items-center justify-between p-6 pb-3">
                  <div className="flex items-center gap-3.5">
                    <img
                      src="/images/img_ellipse_8_72x72.png"
                      alt="Amina Alawi"
                      className="w-[72px] h-[72px] rounded-full"
                    />
                    <div>
                      <div className="text-[20px] font-inter font-bold text-black mb-0.5">
                        <span>Amina Alawi posted a </span>
                        <span className="text-[#2b6171]">Shout-out.</span>
                      </div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <img src="/images/img_group_2542.svg" alt="expertise" className="w-[14px] h-[14px]" />
                        <span className="text-[15px] font-inter text-black">Expertise</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[12px] font-inter text-[#626262]">6 days ago</span>
                        <img src="/images/img_frame_gray_700_10x10.svg" alt="visibility" className="w-[10px] h-[10px]" />
                        <span className="text-[12px] font-inter text-[#626262]">Everyone</span>
                      </div>
                    </div>
                  </div>
                  <img src="/images/img_horizontal.svg" alt="menu" className="w-[30px] h-[6px]" />
                </div>

                {/* Post Content */}
                <div className="px-6">
                  <p className="text-[20px] font-inter text-black mb-5 max-w-[88%]">
                    Employee of the Month: Yasser Amrani! At SLASHR , we believe that excellence deserves recognition.
                  </p>

                  <img
                    src="/images/img_image_692x710.png"
                    alt="Employee of the month"
                    className="w-full max-w-[710px] h-[692px] object-cover rounded-[20px] mb-6"
                  />

                  {/* Shout-out Tags */}
                  <div className="mb-6">
                    <p className="text-[15px] font-inter font-bold text-black mb-3">Shout-out to</p>
                    <div className="flex flex-wrap gap-4">
                      {[
                        { img: "/images/img_ellipse_247.png", name: "Jaylynn Cote" },
                        { img: "/images/img_ellipse_247_22x22.png", name: "Jael Calhoun" },
                        { img: "/images/img_ellipse_247_1.png", name: "Rey Willis" },
                        { img: "/images/img_ellipse_247_2.png", name: "Abram Bush" },
                      ].map((t, i) => (
                        <div key={i} className="flex items-center gap-2 bg-[#2b6171] rounded-[5px] px-2 py-2">
                          <img src={t.img} alt={t.name} className="w-[22px] h-[22px] rounded-[10px]" />
                          <span className="text-[15px] font-inter text-white">{t.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Post Footer */}
                <div className="bg-white border-t border-[#ebebeb] p-5">
                  <div className="flex items-center justify-between max-w-[70%] mx-auto">
                    <div className="flex items-center gap-2">
                      <img src="/images/img_heart_2_1.png" alt="likes" className="w-[26px] h-[26px]" />
                      <span className="text-[12px] font-inter text-black">4,650 likes</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <img src="/images/img_chat_bubble_1.png" alt="comments" className="w-[24px] h-[26px]" />
                      <span className="text-[12px] font-inter text-black">57 comments</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* RIGHT COLUMN */}
            <aside className="w-full lg:w-[742px] flex flex-col gap-4">
              {/* Customize your dashboard */}
              <div className="bg-white border border-[#ebebeb] rounded-[20px] p-4 sm:p-6">
                <h2 className="text-[20px] font-poppins font-semibold text-[#2b6171] mb-4">
                  Customize your dashboard
                </h2>
                <div className="flex flex-wrap gap-3">
                  {chipItems.map((item, index) => (
                    <div
                      key={index}
                      className="border border-[#ebebeb] rounded-[5px] px-5 py-1.5 text-[15px] font-inter font-semibold text-[#626262] cursor-pointer hover:bg-gray-50"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Present */}
              <div className="bg-white border border-[#ebebeb] rounded-[20px] p-4 sm:p-6">
                <h2 className="text-[20px] font-poppins font-semibold text-[#2b6171] mb-6">Present</h2>
                <div className="space-y-6">
                  {/* On-site */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <img src="/images/img_ellipse_10_36x36.png" alt="" className="w-9 h-9 rounded-full" />
                        <img src="/images/img_ellipse_11_36x36.png" alt="" className="w-9 h-9 rounded-full -ml-4" />
                        <img src="/images/img_ellipse_12_36x36.png" alt="" className="w-9 h-9 rounded-full -ml-4" />
                        <img src="/images/img_ellipse_13.png" alt="" className="w-9 h-9 rounded-full -ml-4" />
                        <img src="/images/img_ellipse_14.png" alt="" className="w-9 h-9 rounded-full -ml-4" />
                        <img src="/images/img_ellipse_15.png" alt="" className="w-9 h-9 rounded-full -ml-4" />
                        <img src="/images/img_ellipse_16.png" alt="" className="w-9 h-9 rounded-full -ml-4" />
                        <div className="bg-[#2b6171] rounded-full w-9 h-9 flex items-center justify-center -ml-4">
                          <span className="text-[11px] font-inter font-bold tracking-[1px] text-white">3</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[15px] font-poppins font-semibold tracking-[1px] text-black">On-site</span>
                  </div>

                  {/* Working from home */}
                  <div className="flex items-center justify-between">
                    <img src="/images/img_group_2024.png" alt="" className="w-[90px] h-9" />
                    <span className="text-[15px] font-poppins font-semibold tracking-[1px] text-black">Working from home</span>
                  </div>

                  {/* Delays */}
                  <div className="flex items-center justify-between">
                    <img src="/images/img_group_2023.png" alt="" className="w-[54px] h-9" />
                    <span className="text-[15px] font-inter font-semibold tracking-[1px] text-black">Delays</span>
                  </div>
                </div>
              </div>

              {/* New hires */}
              <div className="bg-white border border-[#ebebeb] rounded-[20px] p-4 sm:p-6">
                <h2 className="text-[20px] font-poppins font-semibold text-[#2b6171] mb-6">New hires</h2>
                <div className="space-y-7">
                  {newHires.map((h, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={h.image} alt={h.name} className="w-10 h-10 rounded-full" />
                        <div>
                          <h3 className="text-[15px] font-inter font-semibold tracking-[1px] text-black">{h.name}</h3>
                          <p className="text-[11px] font-poppins font-medium tracking-[1px] text-[#626262]">{h.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[15px] font-poppins font-semibold tracking-[1px] text-black">
                          {h.date === 'Today' ? <span> Today </span> : h.date}
                        </div>
                        {h.duration && (
                          <p className="text-[11px] font-poppins font-semibold tracking-[1px] text-[#b5b7c0]">{h.duration}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming departures */}
              <div className="bg-white border border-[#ebebeb] rounded-[20px] p-4 sm:p-6">
                <h2 className="text-[20px] font-poppins font-semibold text-[#2b6171] mb-6">Upcoming departures</h2>
                <div className="space-y-7">
                  {upcomingDepartures.map((d, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={d.image} alt={d.name} className="w-10 h-10 rounded-full" />
                        <div>
                          <h3 className="text-[15px] font-inter font-semibold tracking-[1px] text-black">{d.name}</h3>
                          <p className="text-[11px] font-poppins font-medium tracking-[1px] text-[#626262]">{d.role}</p>
                        </div>
                      </div>
                      <span className="text-[15px] font-poppins font-medium tracking-[1px] text-black">{d.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </main>

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
