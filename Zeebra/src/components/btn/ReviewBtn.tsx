interface ReviewBtnProps {
  onClick: () => void;
}

function ReviewBtn({ onClick }: ReviewBtnProps) {
  return (
    <>
      <button className="button-cancelButton" onClick={onClick}>
        리뷰 작성
      </button>
    </>
  );
}

export default ReviewBtn;
