import { useState } from "react";
import ReviewModal from "@/common/modal/ReviewModal";

function ReviewBtn() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="button-cancelButton" onClick={() => setIsOpen(true)}>
        리뷰 작성
      </button>

      {isOpen && <ReviewModal onClose={() => setIsOpen(false)} />}
    </>
  );
}

export default ReviewBtn;
