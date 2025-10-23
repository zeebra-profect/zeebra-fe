import { useState } from "react";
import Review from "./Review";

interface reviewType {
  id: number;
}

function ReviewList() {
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
      <div className="flex flex-col items-center">
        <p className="text-xl font-medium mb-[20px]">리뷰 21,515</p>
        <div className="flex flex-row gap-x-[20px] gap-y-[5px] max-w-[1200px] flex-wrap">
          {reviews.map((review) => (
            <Review key={review.id} />
          ))}
        </div>
        <button className="button-productDetail !mt-[40px]" onClick={more}>
          더보기
        </button>
      </div>
    </>
  );
}

export default ReviewList;
