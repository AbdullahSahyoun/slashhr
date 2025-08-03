import React from 'react';
import RatingBar from '../../../components/ui/RatingBar';

const EmployeeFeedbackPage = () => {
  const feedbackData = [
    {
      id: 1,
      fullName: 'Manal Battache',
      feedback: 'Perfect work',
      date: '01/11/2025',
      rating: 4
    },
    {
      id: 2,
      fullName: 'Manal Battache',
      feedback: 'Perfect work',
      date: '01/11/2025',
      rating: 4
    },
    {
      id: 3,
      fullName: 'Manal Battache',
      feedback: 'Perfect work',
      date: '01/11/2025',
      rating: 4
    }
  ];

  return (
    <div className="flex w-full bg-white min-h-screen px-[98px] py-[42px]">
      <div className="flex flex-col gap-[28px] w-full">
        {feedbackData.map((feedback) => (
          <div key={feedback.id} className="flex gap-[18px]">
            {/* QR Code */}
            <div className="bg-white border border-header-1 rounded-[14px] p-[24px] shadow-[0px_0px_6px_#00000005]">
              <img
                src="/images/img_frame_black_900_100x100.svg"
                alt="QR Code"
                className="w-[100px] h-[100px]"
              />
            </div>

            {/* Feedback Details */}
            <div className="flex-1 bg-white border border-header-1 rounded-[14px] p-[20px] shadow-[0px_0px_6px_#00000005]">
              {/* Header Row */}
              <div className="flex justify-between items-center mb-[16px]">
                <span className="text-[14px] font-poppins font-medium text-global-8">Full name</span>
                <span className="text-[14px] font-poppins font-medium text-global-8 ml-[164px]">Feedback</span>
                <span className="text-[14px] font-poppins font-medium text-global-8">Date</span>
                <span className="text-[14px] font-poppins font-medium text-global-8">Reviews</span>
              </div>

              {/* Divider */}
              <div className="w-full h-[1px] bg-global-7 mb-[18px]"></div>

              {/* Data Row */}
              <div className="flex justify-between items-center">
                <span className="text-[14px] font-poppins font-medium text-black">{feedback.fullName}</span>
                <span className="text-[14px] font-poppins font-medium text-black ml-[56px]">{feedback.feedback}</span>
                <span className="text-[14px] font-poppins font-medium text-black ml-[130px]">{feedback.date}</span>
                <div className="ml-auto">
                  <RatingBar
                    rating={feedback.rating}
                    maxRating={5}
                    readOnly={true}
                    size="small"
                    color="yellow"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeFeedbackPage;
