import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import Dropdown from '../../../components/ui/Dropdown';
import Button from '../../../components/ui/Button';
import Table from '../../../components/ui/Table';
import Pagination from '../../../components/ui/Pagination';

const PeopleOrgAnalyticsPage = () => {
  const [selectedTab] = useState('Activity'); // kept if you reference later
  const [currentPage, setCurrentPage] = useState(1);

  // Chart data
  const chartData = [
    { name: 'Jan', value: 25 }, { name: 'Feb', value: 27 }, { name: 'Mar', value: 24 },
    { name: 'Apr', value: 28 }, { name: 'May', value: 30 }, { name: 'Jun', value: 29 },
    { name: 'Jul', value: 31 }, { name: 'Aug', value: 30 }, { name: 'Sep', value: 28 },
    { name: 'Oct', value: 26 }, { name: 'Nov', value: 25 }, { name: 'Dec', value: 32 }
  ];

  // Table data
  const tableHeaders = ['Full name', 'Start date', 'Manager'];
  const tableData = [
    ['Manal Battache', '01/02/2023', 'Trey Fields'],
    ['Conor English', '04/07/2022', 'Sylvia Weber'],
    ['Adalynn Sharp', '13/03/2022', 'Eddie Perez'],
    ['Aylin Austin', '13/03/2022', 'Roy Hubbard'],
    ['Joselyn Cannon', '13/03/2022', 'Elisha Boyd'],
    ['Cailyn Savage', '13/03/2022', 'Susan Lewis'],
  ];

  return (
    <div className="w-full min-h-screen bg-global-1 flex flex-col">
      {/* Top divider to match other pages (optional) */}
      <div className="w-full h-[1px] bg-header-1" />

      {/* Filters / Controls */}
      <div className="px-[96px] py-[24px] bg-global-1">
        <div className="flex items-start justify-between">
          {/* Left filter group */}
          <div className="flex items-start gap-[32px]">
            <Dropdown placeholder="Gender" className="text-[15px] font-inter font-medium leading-[19px] text-global-3"
              rightImage={{ src: '/images/img_arrowdown_gray_700.svg', width: 16, height: 16 }} />
            <Dropdown placeholder="Legal entity" className="border border-[#e6e6e6] rounded-[10px] text-[15px] font-inter font-medium leading-[19px] text-global-3"
              rightImage={{ src: '/images/img_arrowdown_gray_700_14x8.svg', width: 8, height: 14 }} />
            <Dropdown placeholder="Workplace" className="text-[15px] font-inter font-medium leading-[19px] text-global-3"
              rightImage={{ src: '/images/img_arrowdown_gray_700_14x8.svg', width: 8, height: 6 }} />
            <Dropdown placeholder="Manager" className="text-[15px] font-inter font-medium leading-[19px] text-global-3"
              rightImage={{ src: '/images/img_arrowdown_gray_700_14x8.svg', width: 8, height: 6 }} />
            <Dropdown placeholder="Team" className="border border-[#e6e6e6] rounded-[10px] text-[15px] font-inter font-medium leading-[19px] text-global-3"
              rightImage={{ src: '/images/img_arrowdown_gray_700.svg', width: 16, height: 14 }} />
            <Dropdown placeholder="Nationality" className="text-[15px] font-inter font-medium leading-[19px] text-global-3"
              rightImage={{ src: '/images/img_arrowdown_gray_700_14x8.svg', width: 8, height: 6 }} />
          </div>

          {/* Right controls */}
          <div className="flex items-start gap-[16px]">
            <Button className="border border-header-1 rounded-[10px] px-[14px] py-[6px] text-[16px] font-inter font-medium leading-[20px] text-global-3 bg-global-1">
              <img src="/images/img_frame_4.svg" alt="monthly" className="w-[20px] h-[20px] mr-[4px]" />
              Monthly
            </Button>

            <div className="flex items-center gap-[6px] border border-header-1 rounded-[10px] px-[10px] py-[4px] shadow-[0px_0px_6px_#00000005]">
              <button className="p-[2px]">
                <img src="/images/img_arrow_left.svg" alt="previous" className="w-[18px] h-[18px]" />
              </button>
              <span className="text-[16px] font-poppins font-medium leading-[24px] text-global-3 px-[20px]">Last 12 months</span>
              <button className="p-[2px]">
                <img src="/images/img_arrow_right.svg" alt="next" className="w-[18px] h-[18px]" />
              </button>
            </div>

            <Button className="bg-global-3 rounded-[10px] px-[20px] py-[6px] text-[16px] font-inter font-medium leading-[20px] text-global-5">
              <img src="/images/img_frame_white_a700_12x12.svg" alt="export" className="w-[12px] h-[12px] mr-[10px]" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Chart card */}
      <div className="px-[96px] py-[32px] bg-global-1">
        <div className="bg-global-1 border border-header-1 rounded-[14px] p-[38px]">
          <div className="flex items-start gap-[48px]">
            {/* Left stats */}
            <div className="flex flex-col gap-[24px] w-[200px]">
              <div>
                <h3 className="text-[15px] font-inter font-bold leading-[19px] text-global-1 mb-[24px]">March 2025</h3>

                <div className="mb-[20px]">
                  <p className="text-[15px] font-inter font-medium leading-[19px] text-global-3 mb-[4px]">Headcount</p>
                  <div className="flex items-center gap-[18px]">
                    <div className="w-[12px] h-[12px] bg-global-4 rounded-[6px]" />
                    <span className="text-[26px] font-inter font-medium leading-[32px] text-global-1">35</span>
                  </div>
                </div>

                <div className="mb-[20px]">
                  <p className="text-[15px] font-inter font-medium leading-[19px] text-global-3 mb-[10px]">Joiners</p>
                  <div className="flex items-center gap-[18px]">
                    <div className="w-[12px] h-[12px] bg-global-4 rounded-[6px]" />
                    <span className="text-[26px] font-inter font-medium leading-[32px] text-global-1">1</span>
                  </div>
                </div>

                <div>
                  <p className="text-[15px] font-inter font-medium leading-[19px] text-global-3 mb-[12px]">Leavers</p>
                  <div className="flex items-center gap-[18px]">
                    <div className="w-[12px] h-[12px] bg-global-4 rounded-[6px]" />
                    <span className="text-[26px] font-inter font-medium leading-[32px] text-global-1">0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="flex-1 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#626262' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#626262' }} domain={[0, 40]} />
                  <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '12px' }} />
                  <Line type="monotone" dataKey="value" stroke="#75cbc3" strokeWidth={2}
                        dot={{ fill: '#75cbc3', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, fill: '#75cbc3' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Table card */}
      <div className="px-[96px] pb-[32px] bg-global-1">
        <div className="bg-global-1 border border-header-1 rounded-[14px] shadow-[0px_0px_6px_#00000005]">
          {/* Small header row with date */}
          <div className="flex items-start gap-[58px] px-[50px] pt-[24px]">
            <div className="flex flex-col items-center gap-[10px]">
              <span className="text-[16px] font-inter font-bold leading-[20px] text-global-2">Headcount</span>
              <div className="w-[84px] h-[3px] bg-global-2 rounded-[1px]" />
            </div>
            <span className="text-[16px] font-inter font-bold leading-[20px] text-global-3">Joiners</span>
            <span className="text-[16px] font-inter font-bold leading-[20px] text-global-3">Leavers</span>

            <div className="ml-auto flex items-center gap-[14px]">
              <img src="/images/img_vector_black_900.svg" alt="calendar" className="w-[6px] h-[10px]" />
              <span className="text-[16px] font-inter font-medium leading-[20px] text-global-1">Mar 2025</span>
            </div>
          </div>

          <div className="w-full h-[1px] bg-header-1 mt-[12px]" />

          <div className="px-[50px] py-[24px]">
            <Table headers={tableHeaders} data={tableData} className="w-full" />

            <div className="flex items-center justify-between mt-[24px] pt-[20px]">
              <span className="text-[14px] font-poppins font-medium leading-[21px] text-global-8">
                Showing data 6 of 6 entries
              </span>
              <Pagination currentPage={currentPage} totalPages={1} onPageChange={setCurrentPage} className="flex items-center gap-[8px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating chat button */}
      <div className="fixed bottom-[40px] right-[40px]">
        <button className="bg-global-3 rounded-[18px] p-[10px] shadow-lg hover:shadow-xl transition-shadow">
          <img src="/images/img_group_white_a700.svg" alt="chat" className="w-[18px] h-[14px]" />
        </button>
      </div>
    </div>
  );
};

export default PeopleOrgAnalyticsPage;
