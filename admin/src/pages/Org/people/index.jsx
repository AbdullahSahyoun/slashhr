import React, { useState } from 'react';
import SearchView from '../../../components/ui/SearchView';
import CreateEmployeeModal from '../../../components/modals/employee/Create';

const PeopleOrgPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filterBy, setFilterBy] = useState('Filter by');
  const [groupBy, setGroupBy] = useState('Group');
  const [selectedRows, setSelectedRows] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  // Sample employee data
  const employees = [
    { id: 1, firstName: 'Mohamed', lastName: 'Amine', job: 'Fullstack developer', hired: '2 years ago', status: 'Active', avatar: '/images/img_avatar_image_39.png' },
    { id: 2, firstName: 'Corbin', lastName: 'Preston', job: 'Product owner', hired: 'in 18 days', status: 'Accepted', avatar: '/images/img_avatar_image_39_38x38.png' },
    { id: 3, firstName: 'Theo', lastName: "O'brien", job: 'Intern', hired: 'a year ago', status: 'Active', avatar: '/images/img_avatar_image_39_1.png' },
    { id: 4, firstName: 'Ryan', lastName: 'Lowery', job: 'Product owner', hired: '2 years ago', status: 'Active', avatar: '/images/img_avatar_image_39.png' },
  ];

  const handleSearch = (value) => setSearchValue(value);

  const handleRowSelect = (rowIndex, isSelected) => {
    if (Array.isArray(rowIndex)) {
      setSelectedRows(isSelected ? rowIndex : []);
    } else {
      setSelectedRows((prev) =>
        isSelected ? [...prev, rowIndex] : prev.filter((i) => i !== rowIndex)
      );
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      Active: 'bg-[#75cbc3] text-white',
      Accepted: 'bg-[#2b6171] text-white',
    };
    return (
      <div
        className={`inline-flex items-center gap-[6px] px-2 py-1 rounded-[4px] ${
          statusClasses[status] || 'bg-gray-200 text-gray-800'
        }`}
      >
        <div
          className={`w-[8px] h-[8px] rounded-[4px] border border-white ${
            status === 'Active' ? 'bg-[#2b6171]' : 'bg-[#75cbc3]'
          }`}
        />
        <span className="text-[12px] font-poppins font-medium leading-[18px]">
          {status}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Top divider */}
      <div className="w-full h-[1px] bg-[#ebebeb]" />

      <div className="flex-1 px-[24px] sm:px-[30px] mt-[24px]">
        <div className="max-w-[1440px] mx-auto px-[24px] sm:px-[66px]">
          {/* Stats */}
          <div className="bg-white border border-[#ebebeb] rounded-[14px] shadow-[0_0_6px_#00000005] p-[28px] mb-[24px]">
            <div className="flex flex-col gap-[20px]">
              <div className="flex items-center justify-between px-[28px]">
                <span className="text-[15px] font-inter text-[#626262]">
                  0 Current onboarding employee
                </span>
                <img
                  src="/images/img_group_1325.svg"
                  alt="info"
                  className="w-[16px] h-[16px]"
                />
              </div>
              <div className="w-full h-px bg-[#eeeeee]" />
              <div className="flex items-center justify-between px-[28px]">
                <span className="text-[15px] font-inter text-[#626262]">
                  0 employees invited
                </span>
                <img
                  src="/images/img_group_1325.svg"
                  alt="info"
                  className="w-[16px] h-[16px]"
                />
              </div>
            </div>
          </div>

          {/* Controls + Table */}
          <div className="bg-white border border-[#ebebeb] rounded-[14px] shadow-[0_0_6px_#00000005] p-[20px]">
            {/* Controls */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[20px] mb-[26px]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-[20px]">
                {/* Filter */}
                <div className="relative">
                  <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                    className="appearance-none bg-white border border-[#e6e6e6] rounded-[10px] px-[18px] py-[8px] pr-[50px] text-[15px] font-inter text-[#626262] focus:outline-none focus:ring-2 focus:ring-[#2b6171]"
                  >
                    <option>Filter by</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                  <img
                    src="/images/img_arrowdown_gray_700.svg"
                    alt=""
                    className="pointer-events-none absolute right-[18px] top-1/2 -translate-y-1/2 w-[16px] h-[14px]"
                  />
                </div>

                {/* Group */}
                <div className="relative">
                  <select
                    value={groupBy}
                    onChange={(e) => setGroupBy(e.target.value)}
                    className="appearance-none bg-white border border-[#e6e6e6] rounded-[10px] px-[18px] py-[8px] pr-[50px] text-[15px] font-inter text-[#626262] focus:outline-none focus:ring-2 focus:ring-[#2b6171]"
                  >
                    <option>Group</option>
                    <option>Department</option>
                    <option>Role</option>
                  </select>
                  <img
                    src="/images/img_arrowdown_gray_700.svg"
                    alt=""
                    className="pointer-events-none absolute right-[18px] top-1/2 -translate-y-1/2 w-[16px] h-[14px]"
                  />
                </div>
              </div>

              {/* Search + Add */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-[10px] w-full lg:w-auto">
                <SearchView
                  placeholder="Search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onSearch={handleSearch}
                  className="flex-1 lg:w-[300px] px-[56px] py-[8px] border border-[#e6e6e6] rounded-[10px] bg-white"
                  leftImage={{
                    src: '/images/img_search_gray_200_03.svg',
                    width: 18,
                    height: 14,
                  }}
                />
                <button
                  onClick={() => setOpenCreateModal(true)}
                  className="bg-[#2b6171] text-white px-[14px] py-[8px] rounded-[10px] text-[12px] font-inter hover:bg-[#1e4a57]"
                >
                  + Add person
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-[16px] pr-[20px]">
                      <input
                        type="checkbox"
                        className="w-[22px] h-[22px] border border-[#d9d9d9] rounded-[5px]"
                        onChange={(e) =>
                          handleRowSelect(
                            employees.map((_, i) => i),
                            e.target.checked
                          )
                        }
                      />
                    </th>
                    <th className="text-left py-[16px] text-[14px] font-poppins text-[#b5b7c0]">
                      First name
                    </th>
                    <th className="text-left py-[16px] text-[14px] font-poppins text-[#b5b7c0]">
                      Last name
                    </th>
                    <th className="text-left py-[16px] text-[14px] font-poppins text-[#b5b7c0]">
                      Job
                    </th>
                    <th className="text-left py-[16px] text-[14px] font-poppins text-[#b5b7c0]">
                      Hired
                    </th>
                    <th className="text-center py-[16px] text-[14px] font-poppins text-[#b5b7c0]">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee, index) => (
                    <tr
                      key={employee.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-[16px] pr-[20px]">
                        <div className="flex items-center gap-[36px]">
                          <input
                            type="checkbox"
                            className="w-[22px] h-[22px] border border-[#d9d9d9] rounded-[5px]"
                            checked={selectedRows.includes(index)}
                            onChange={(e) =>
                              handleRowSelect(index, e.target.checked)
                            }
                          />
                          <img
                            src={employee.avatar}
                            alt="avatar"
                            className="w-[38px] h-[38px] rounded-[18px]"
                          />
                        </div>
                      </td>
                      <td className="py-[16px] text-[14px] font-poppins text-[#292d32]">
                        {employee.firstName}
                      </td>
                      <td className="py-[16px] text-[14px] font-poppins text-[#292d32]">
                        {employee.lastName}
                      </td>
                      <td className="py-[16px] text-[14px] font-poppins text-black">
                        {employee.job}
                      </td>
                      <td className="py-[16px] text-[14px] font-poppins text-[#626262]">
                        {employee.hired}
                      </td>
                      <td className="py-[16px]">
                        <div className="flex items-center justify-between">
                          {getStatusBadge(employee.status)}
                          <div className="flex items-center gap-[14px]">
                            <img
                              src="/images/img_more_vertical_svgrepo_com.svg"
                              alt="more"
                              className="w-[24px] h-[24px] cursor-pointer hover:bg-gray-100 rounded p-1"
                            />
                            <img
                              src="/images/img_search_blue_gray_700.svg"
                              alt="view"
                              className="w-[24px] h-[24px] cursor-pointer hover:bg-gray-100 rounded p-1"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="flex flex-col items-center gap-[26px] mt-[18px]">
              <div className="w-full h-px bg-[#eeeeee]" />
              <div className="flex items-center justify-between w-full">
                <span className="text-[12px] font-poppins text-[#626262]">
                  Showing data 4 of 4 entries
                </span>
                <div className="flex items-center gap-[2px]">
                  <button className="w-[26px] h-[24px] border border-[#eeeeee] rounded-[4px] bg-[#f5f5f5] flex items-center justify-center">
                    <span className="text-[12px] font-poppins font-medium text-black">
                      &lt;
                    </span>
                  </button>
                  <button className="w-[26px] h-[24px] border border-[#2b6171] rounded-[4px] bg-[#2b6171] flex items-center justify-center">
                    <span className="text-[12px] font-poppins font-medium text-white">
                      1
                    </span>
                  </button>
                  <button className="w-[26px] h-[24px] border border-[#eeeeee] rounded-[4px] bg-[#f5f5f5] flex items-center justify-center">
                    <span className="text-[12px] font-poppins font-medium text-black">
                      &gt;
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Chat Button */}
          <div className="fixed bottom-[148px] right-[10px] w-[36px] h-[36px] bg-[#2b6171] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#1e4a57] transition-colors shadow-lg">
            <img
              src="/images/img_group_white_a700.svg"
              alt="chat"
              className="w-[18px] h-[14px]"
            />
          </div>
        </div>
      </div>

      {/* Create Modal */}
      <CreateEmployeeModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />
    </div>
  );
};

export default PeopleOrgPage;
