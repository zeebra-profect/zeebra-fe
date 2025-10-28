function ReviewBtn({
  setIsModalOpen,
}: {
  setIsModalOpen: (isOpen: boolean) => void;
}) {
  return (
    <button
      className="button-cancelButton"
      onClick={() => setIsModalOpen(true)}
    >
      리뷰 작성
    </button>
  );
}

export default ReviewBtn;
