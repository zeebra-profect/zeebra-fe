import { useState } from "react";
import Review from "./Review";

interface reviewType {
  id: number;
}

function ReviewList({ reviewCount }: { reviewCount: number | undefined }) {
  const initialState = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  const [reviews, setReviews] = useState<reviewType[]>(initialState);

  const more = () => {
    const newReviews = [
      ...reviews,
      { id: reviews.length + 1 },
      { id: reviews.length + 2 },
      { id: reviews.length + 3 },
      { id: reviews.length + 4 },
      { id: reviews.length + 5 },
      { id: reviews.length + 6 },
      { id: reviews.length + 7 },
      { id: reviews.length + 8 },
    ];
    setReviews(newReviews);
  };

  return (
    <>
    <hr className="text-grey"/>
      <div className="flex flex-col items-center px-4 md:px-0">
        <p className="text-lg md:text-xl font-medium mb-4 md:mb-5">리뷰 {reviewCount}</p>
        <div className="flex flex-row gap-x-2 md:gap-x-4 lg:gap-x-5 gap-y-3 md:gap-y-[5px] w-full lg:max-w-[1200px] flex-wrap justify-center lg:justify-start">
          {reviews.map((review) => (
            <Review key={review.id} />
          ))}
        </div>
        <button className="button-productDetail !mt-6 md:mt-10!" onClick={more}>
          더보기
        </button>
      </div>
    </>
  );
}

export default ReviewList;