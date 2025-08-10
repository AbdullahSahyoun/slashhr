import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const EmployeeDocumentsPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const employeeId = Number(params.get('id'));

  const API = import.meta.env.VITE_API_URL ;
  const token = localStorage.getItem('token');

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    if (!employeeId || Number.isNaN(employeeId)) {
      setErrMsg('Invalid employee ID in URL');
      setLoading(false);
      return;
    }

    const ctrl = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setErrMsg('');
        const res = await fetch(`${API}/employee/${employeeId}/documents`, {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          signal: ctrl.signal,
        });
        if (!res.ok) {
          const text = await res.text().catch(() => '');
          throw new Error(`API ${res.status}: ${text || res.statusText}`);
        }
        const data = await res.json();
        setDocuments(data.items || []);
      } catch (e) {
        if (e.name !== 'AbortError') {
          console.error('Failed to fetch documents:', e);
          setErrMsg('Failed to load documents.');
        }
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => ctrl.abort();
  }, [employeeId, API, token]);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  if (errMsg) {
    return (
      <div className="text-center py-10 text-red-500">
        {errMsg}
        <br />
        <span className="text-sm text-gray-600">Employee ID: {employeeId || 'Unknown'}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white p-4 sm:p-6 lg:p-12">
      {/* Documents Table Section */}
      <div className="bg-white border border-[#ebebeb] rounded-[14px] shadow-[0px_0px_6px_#00000005] p-[20px]">
        {/* Table Header */}
        <div className="px-[12px] mb-[14px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[40px]">
              <div className="flex items-center gap-[22px]">
                <div className="w-[22px] h-[22px] border border-[#d9d9d9] rounded-[5px]"></div>
                <span className="text-[14px] font-medium text-[#b5b7c0]">
                  File name
                </span>
              </div>
              <span className="text-[14px] font-medium text-[#b5b7c0]">
                Uploaded by
              </span>
            </div>
            <div className="flex items-center gap-[244px]">
              <span className="text-[14px] font-medium text-[#b5b7c0]">
                Created on
              </span>
              <span className="text-[14px] font-medium text-[#b5b7c0] mr-[116px]">
                Category
              </span>
            </div>
          </div>
        </div>

        {/* Table Data */}
        <div className="px-[12px]">
          {documents.map((doc, index) => (
            <div key={doc.DocumentID || index} className="mb-[18px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[20px]">
                  <div className="w-[22px] h-[22px] border border-[#d9d9d9] rounded-[5px]"></div>
                  <div className="flex items-center gap-[20px]">
                    <img
                      src="/images/img_frame_gray_300_02.svg"
                      alt="file icon"
                      className="w-[34px] h-[34px]"
                    />
                    <span className="text-[14px] font-medium text-black">
                      {doc.FileName}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-[64px]">
                  <div className="flex items-center gap-[64px]">
                    <img
                      src="/images/img_ellipse_26.png"
                      alt="user avatar"
                      className="w-[40px] h-[40px] rounded-[20px]"
                    />
                    <span className="text-[14px] font-medium text-black">
                      {doc.EmployeeName}
                    </span>
                  </div>
                  <span className="text-[14px] font-medium text-black">
                    {new Date(doc.UploadedAt).toLocaleDateString()}
                  </span>
                  <span className="text-[14px] font-medium text-black">
                    {doc.DocumentType || '—'}
                  </span>
                  <img
                    src="/images/img_search_blue_gray_700.svg"
                    alt="action"
                    className="w-[24px] h-[24px] cursor-pointer hover:opacity-70"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="w-full h-[1px] bg-[#eeeeee] my-[16px]"></div>

          {/* Pagination Section (placeholder for now) */}
          <div className="flex items-center justify-between pt-[16px]">
            <span className="text-[14px] text-[#b5b7c0]">
              Showing {documents.length} entries
            </span>

            <div className="flex items-center gap-[8px]">
              <button className="w-[26px] h-[18px] bg-[#f5f5f5] border border-[#eeeeee] rounded-[4px] text-[12px] text-black flex items-center justify-center hover:bg-gray-200 transition-colors">
                &lt;
              </button>
              <button className="w-[24px] h-[18px] bg-[#2b6171] rounded-[4px] text-[12px] text-white flex items-center justify-center">
                1
              </button>
              <button className="w-[26px] h-[18px] bg-[#f5f5f5] border border-[#eeeeee] rounded-[4px] text-[12px] text-black flex items-center justify-center hover:bg-gray-200 transition-colors">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDocumentsPage;
