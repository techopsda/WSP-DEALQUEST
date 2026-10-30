import React, { ChangeEvent, useState } from 'react';

export interface selectedRatingProps {
  id: string;
  setSelectedRating: (selectedRating: number) => void;
}

export const StarInput: React.FC<selectedRatingProps> = ({ id, setSelectedRating }) => {
  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    const ratingValue = parseInt(e.target.value);
    setSelectedRating(ratingValue);
  };

  return (
    <>
      <div className="[ dqGameRating ] relative inline-flex flex-row-reverse gap-0.5 overflow-hidden">
        <input type="radio" name={id + 'rating'} id={id + 'rating-5'} value={5} onChange={handleRatingChange} />
        <label htmlFor={id + 'rating-5'} />
        <input type="radio" name={id + 'rating'} id={id + 'rating-4'} value={4} onChange={handleRatingChange} />
        <label htmlFor={id + 'rating-4'} />
        <input type="radio" name={id + 'rating'} id={id + 'rating-3'} value={3} onChange={handleRatingChange} />
        <label htmlFor={id + 'rating-3'} />
        <input type="radio" name={id + 'rating'} id={id + 'rating-2'} value={2} onChange={handleRatingChange} />
        <label htmlFor={id + 'rating-2'} />
        <input type="radio" name={id + 'rating'} id={id + 'rating-1'} value={1} onChange={handleRatingChange} />
        <label htmlFor={id + 'rating-1'} />
      </div>

      <style jsx>{`
        .dqGameRating > input {
          display: none;
        }

        .dqGameRating > label {
          cursor: pointer;
          width: 2.25rem;
          height: 2.25rem;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' strokeWidth='2' stroke='%234C547D' %3E%3Cpolygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' /%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: center;
          transition: 250ms;
        }

        .dqGameRating > input:checked ~ label,
        .dqGameRating > input:checked ~ label ~ label {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FBBC05' %3E%3Cpolygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' /%3E%3C/svg%3E");
        }

        .dqGameRating > input ~ label:hover,
        .dqGameRating > input ~ label:hover ~ label {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FFCC48' %3E%3Cpolygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' /%3E%3C/svg%3E") !important;
        }
      `}</style>
    </>
  );
};
