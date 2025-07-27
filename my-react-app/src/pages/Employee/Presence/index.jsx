import React, { useState } from 'react';
import SearchView from '../../../components/ui/SearchView';
import BreadCrumb from '../../../components/ui/BreadCrumb';

const EmployeePresencePage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedUser, setSelectedUser] = useState('Manal Battache');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (value) => {
    console.log('Search submitted:', value);
  };

  const breadcrumbItems = [
    { label: 'Dashboard' },
    { label: 'Number of people present' }
  ];

  const onsiteEmployees = [
    {
      id: 1,
      name: 'Zoe Holcomb',
      position: 'DevOps Engineer',
      email: 'ngannguyen@gmail.com',
      avatar: '/images/img_ellipse_10.png'
    },
    {
      id: 2,
      name: 'Mason Lee',
      position: 'Data Scientist',
      email: 'ngannguyen@gmail.com',
      avatar: '/images/img_ellipse_10_82x82.png'
    },
    {
      id: 3,
      name: 'Ava Patel',
      position: 'Product Designer',
      email: 'ngannguyen@gmail.com',
      avatar: '/images/img_ellipse_10_1.png'
    },
    {
      id: 4,
      name: 'Liam Smith',
      position: 'Software Developer',
      email: 'ngannguyen@gmail.com',
      avatar: '/images/img_ellipse_10_2.png'
    },
    {
      id: 5,
      name: 'Sofia Torres',
      position: 'UX Researcher',
      email: 'ngannguyen@gmail.com',
      avatar: '/images/img_ellipse_10_3.png'
    },
    {
      id: 6,
      name: 'Ethan Zhang',
      position: 'Frontend Developer',
      email: 'ngannguyen@gmail.com',
      avatar: '/images/img_ellipse_10_4.png'
    },
    {
      id: 7,
      name: 'Tatum O\'neill',
      position: 'DevOps Engineer',
      email: 'ngannguyen@gmail.com',
      avatar: '/images/img_ellipse_10_5.png'
    }
  ];

  const remoteEmployees = [
    {
      id: 1,
      name: 'Liam Neeson',
      position: 'Data Scientist',
      email: 'liam.neeson@example.com',
      avatar: '/images/img_ellipse_10_6.png'
    },
    {
      id: 2,
      name: 'Emma Watson',
      position: 'Product Manager',
      email: 'emma.watson@example.com',
      avatar: '/images/img_ellipse_10_7.png'
    },
    {
      id: 3,
      name: 'Chris Hemsworth',
      position: 'Software Developer',
      email: 'chris.hemsworth@example.com',
      avatar: '/images/img_ellipse_10_8.png'
    },
    {
      id: 4,
      name: 'Natalie Portman',
      position: 'UX Designer',
      email: 'natalie.portman@example.com',
      avatar: '/images/img_ellipse_10_9.png'
    }
  ];

  const delayedEmployees = [
    {
      id: 1,
      avatar: '/images/img_ellipse_10_10.png'
    },
    {
      id: 2,
      avatar: '/images/img_ellipse_10_11.png'
    }
  ];

  const EmployeeCard = ({ employee, showDetails = true }) => (
    <div className="bg-white border border-[#ebebeb] rounded-[10px] p-[20px] flex flex-col items-center w-full">
      <img 
        src={employee.avatar} 
        alt={employee.name || 'Employee'} 
        className="w-[82px] h-[82px] rounded-[40px] object-cover"
      />
      {showDetails && (
        <>
          <h3 className="text-[15px] font-poppins font-bold leading-[23px] text-black mt-[10px] text-center">
            {employee.name}
          </h3>
          <p className="text-[15px] font-poppins font-normal leading-[23px] text-global-3 mt-[4px] text-center">
            {employee.position}
          </p>
          <p className="text-[12px] font-poppins font-normal leading-[18px] text-global-3 mt-[6px] text-center">
            {employee.email}
          </p>
        </>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div className="w-full max-w-[14%] bg-sidebar-2 border-r-2 border-[#e4e4e4] pt-[24px] pr-[22px] pl-[22px] hidden lg:block">
        {/* Logo */}
        <div className="mt-[4px] mb-[20px]">
          <img 
            src="/images/img_arrow_down.svg" 
            alt="SlasHR Logo" 
            className="w-[248px] h-[88px]"
          />
        </div>

        {/* Search */}
        <div className="mb-[20px]">
          <SearchView
            placeholder="Search....."
            value={searchValue}
            onChange={handleSearchChange}
            onSearch={handleSearchSubmit}
            className="border border-[#e4e4e4] rounded-[8px] bg-white"
            leftImage={{
              src: "/images/img_search.svg",
              width: 12,
              height: 12
            }}
          />
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-[20px]">
          <div className="flex items-center p-[8px] bg-white rounded-md">
            <img src="/images/img_frame.svg" alt="Dashboard" className="w-[20px] h-[20px]" />
            <span className="ml-[18px] text-[16px] font-poppins font-semibold leading-[25px] text-global-3">
              Dashboard
            </span>
          </div>

          <div className="flex items-center justify-between p-[8px]">
            <div className="flex items-center">
              <img src="/images/img_frame_gray_700.svg" alt="Inbox" className="w-[20px] h-[20px]" />
              <span className="ml-[18px] text-[16px] font-poppins font-semibold leading-[25px] text-global-3">
                Inbox
              </span>
            </div>
            <div className="bg-sidebar-1 text-white text-[12px] font-inter font-bold leading-[15px] px-[5px] py-[2px] rounded-[6px]">
              53
            </div>
          </div>

          <div className="flex items-center p-[12px]">
            <img src="/images/img_frame_gray_700_20x20.svg" alt="People & Org" className="w-[20px] h-[20px]" />
            <span className="ml-[16px] text-[16px] font-poppins font-semibold leading-[20px] text-global-3">
              People & Org
            </span>
          </div>

          <div className="flex items-center p-[8px]">
            <img src="/images/img_frame_gray_700_18x18.svg" alt="Calendar" className="w-[18px] h-[18px] ml-[4px]" />
            <span className="ml-[18px] text-[16px] font-poppins font-semibold leading-[25px] text-global-3">
              Calendar
            </span>
          </div>

          <div className="flex items-center p-[12px]">
            <img src="/images/img_frame_20x20.svg" alt="Documents" className="w-[20px] h-[20px]" />
            <span className="ml-[16px] text-[16px] font-poppins font-semibold leading-[20px] text-global-3">
              Documents
            </span>
          </div>

          <div className="flex items-center p-[8px]">
            <img src="/images/img_frame_18x18.svg" alt="Work Schedule" className="w-[18px] h-[18px] ml-[4px]" />
            <span className="ml-[16px] text-[16px] font-poppins font-semibold leading-[25px] text-global-3">
              Work Schedule
            </span>
          </div>

          <div className="flex items-center p-[8px]">
            <img src="/images/img_frame_1.svg" alt="Analytics" className="w-[20px] h-[20px]" />
            <span className="ml-[16px] text-[16px] font-poppins font-semibold leading-[25px] text-global-3">
              Analytics
            </span>
          </div>

          <div className="flex items-center p-[8px]">
            <img src="/images/img_frame_2.svg" alt="Settings" className="w-[20px] h-[20px]" />
            <span className="ml-[16px] text-[16px] font-poppins font-semibold leading-[25px] text-global-3">
              Settings
            </span>
          </div>
        </nav>

        {/* User Dropdown */}
        <div className="mt-[136px] relative">
          <div 
            className="flex items-center justify-between bg-white border border-[#e4e4e4] rounded-[10px] p-[12px] pr-[28px] pl-[12px] cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="text-[14px] font-poppins font-normal leading-[21px] text-global-3">
              {selectedUser}
            </span>
            <img 
              src="/images/img_icons_16px_arrow_down.svg" 
              alt="Dropdown" 
              className="w-[16px] h-[14px]"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white p-[24px] flex items-center justify-center border-b border-gray-200">
          <div className="flex items-center gap-[18px]">
            <img 
              src="/images/img_group_2570.svg" 
              alt="Dashboard Icon" 
              className="w-[44px] h-[44px]"
            />
            <BreadCrumb 
              items={breadcrumbItems}
              separator=">"
              className="text-[25px] font-poppins font-medium leading-[38px] text-black"
            />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-[24px] lg:p-[72px] lg:pr-[16px] overflow-y-auto">
          <div className="space-y-[50px]">
            {/* On-site Section */}
            <section>
              <h2 className="text-[20px] sm:text-[25px] font-poppins font-medium leading-[38px] text-black mb-[30px]">
                On-site
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-[16px] lg:gap-[20px]">
                {onsiteEmployees.map((employee) => (
                  <EmployeeCard key={employee.id} employee={employee} />
                ))}
              </div>
            </section>

            {/* Working from home Section */}
            <section>
              <h2 className="text-[20px] sm:text-[25px] font-poppins font-medium leading-[38px] text-black mb-[24px]">
                Working from home
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[16px] max-w-[984px]">
                {remoteEmployees.map((employee) => (
                  <EmployeeCard key={employee.id} employee={employee} />
                ))}
              </div>
            </section>

            {/* Delays Section */}
            <section>
              <h2 className="text-[20px] sm:text-[25px] font-poppins font-medium leading-[38px] text-black mb-[24px]">
                Delays
              </h2>
              <div className="flex gap-[16px] max-w-[500px]">
                {delayedEmployees.map((employee) => (
                  <div key={employee.id} className="w-[234px]">
                    <EmployeeCard employee={employee} showDetails={false} />
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Floating Action Button */}
          <button className="fixed bottom-[228px] right-[8px] lg:right-[40px] w-[36px] h-[36px] bg-global-3 rounded-[18px] flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-all duration-200">
            <img 
              src="/images/img_group_white_a700.svg" 
              alt="Action" 
              className="w-[18px] h-[14px]"
            />
          </button>
        </main>
      </div>
    </div>
  );
};

export default EmployeePresencePage;