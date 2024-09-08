import { IRating } from '@/types';
import  { useState } from 'react';

const Reviews = () => {
  const [reviews] = useState<IRating[]>([
    {
      rating: 5,
      review: 'Good Material',
      comment: 'Fabric quality is very good',
      name: 'Gaurav Sharma',
      date: '1/1/2024',
      location: 'Howrah',
    },
    {
      rating: 4,
      review: 'Nice Product',
      comment: 'Comfortable to wear',
      name: 'Anita Joshi',
      date: '2/1/2024',
      location: 'Delhi',
    },
    {
      rating: 5,
      review: 'Good Material',
      comment: 'Fabric quality is very good',
      name: 'Gaurav Sharma',
      date: '1/1/2024',
      location: 'Howrah',
    },
    {
      rating: 4,
      review: 'Nice Product',
      comment: 'Comfortable to wear',
      name: 'Anita Joshi',
      date: '2/1/2024',
      location: 'Delhi',
    },
    {
      rating: 5,
      review: 'Good Material',
      comment: 'Fabric quality is very good',
      name: 'Gaurav Sharma',
      date: '1/1/2024',
      location: 'Howrah',
    },
    {
      rating: 4,
      review: 'Nice Product',
      comment: 'Comfortable to wear',
      name: 'Anita Joshi',
      date: '2/1/2024',
      location: 'Delhi',
    },
  ]);

  return (
    <div className="h-auto p-5 sm:p-10 flex flex-col sm:flex-row gap-4 mt-5 sm:mt-10">
      {/* Rate & Review Section */}
      <div className="box1 w-full sm:w-[30%] border-t-2 sm:border-t-0">
        <h1 className="sm:text-3xl text-xl font-semibold mb-5 sm:mb-1 mt-5 sm:mt-0">
          Rate & Review
        </h1>
        <div className="flex justify-start items-center mt-3">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            className="text-xl text-green-600"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"></path>
          </svg>
          <span className="font-semibold text-xl mx-1 sm:mx-2">3.8</span>
          <span className="text-slate-400 sm:ml-4 ml-1 text-[14px]">
            4 verified customers reviewed this.
          </span>
        </div>
        {/* Rating Breakdown */}
        {[5, 4, 3, 2, 1].map((rating, index) => (
          <div
            key={index}
            className="flex justify-start items-center text-slate-400 text-[15px] sm:text-xl my-1 sm:my-5"
          >
            {rating}
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              className="text-slate-400 text-base mx-3"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"></path>
            </svg>
            <div className="h-[10px] w-[50%] sm:w-[60%] mr-2 bg-slate-200">
              <div
                style={{ width: `${rating * 10}%` }}
                className="h-full bg-green-500"
              ></div>
            </div>
            <div className="text-slate-900 sm:text-base text-[15px]">
              {rating <= 3 ? 0 : 2}
            </div>
          </div>
        ))}
      </div>

      {/* Customer Reviews Section */}
      <div className="box2 w-full sm:w-[50%]">
        <h1 className="sm:text-3xl text-xl font-semibold mb-5 sm:mb-10">
          Customer Reviews
        </h1>
        <div className="flex flex-col gap-5 duration-500">
          {reviews.map((review, index) => (
            <div key={index} className="card w-full h-auto pb-3 border-b-2">
              <div className="flex items-center">
                <div className="flex justify-center text-white items-center py-0 rounded-[4px] px-1 p bg-green-600">
                  <p className="font-semibold mt-[2px]">{review.rating}</p>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="ml-1 text-xs"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"></path>
                  </svg>
                </div>
                <p className="font-semibold sm:ml-5 ml-2">{review.review}</p>
              </div>
              <p className="text-base font-medium sm:mt-5 mt-3 text-slate-600">
                {review.comment}
              </p>
              <div className="flex justify-start items-center my-4"></div>
              <div className="flex justify-start items-center">
                <span className="text-xs text-slate-500 mr-4">
                  {review.name}
                </span>
                <span className="text-xs hidden sm:block text-slate-400 mr-4">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="inline-block text-base"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z"></path>
                  </svg>
                  Certified Buyer, {review.location}
                </span>
                <span className="text-xs text-slate-400 mr-4">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
        //show all reviews
      <button className="duration-500 text-red-600 text-start">Hide reviews <svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" className="inline-block text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M17.6569 16.2427L19.0711 14.8285L12.0001 7.75739L4.92896 14.8285L6.34317 16.2427L12.0001 10.5858L17.6569 16.2427Z" fill="currentColor"></path></svg></button>
      </div>
    </div>
  );
};

export default Reviews;
