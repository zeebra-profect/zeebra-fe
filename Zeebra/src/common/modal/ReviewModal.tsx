import { useState } from "react";
import OrderProduct from "@/components/order/OrderProduct";

interface ReviewModalProps {
  onClose: () => void;
}

function ReviewModal({ onClose }: ReviewModalProps) {
  const [previews, setPreviews] = useState<string[]>([]);

  const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    // 최대 5장 제한
    if (previews.length + fileArray.length > 5) {
      alert("이미지는 최대 5장까지 첨부 가능합니다.");
      return;
    }

    // 파일을 URL로 변환
    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    // input 초기화 (같은 파일 재선택 가능하도록)
    e.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = () => {
    // 리뷰 제출 로직
    console.log("리뷰 제출", previews);
    onClose();
  };

  // 빈 슬롯 생성 (5개 - 현재 이미지 수)
  const emptySlots = Array(5 - previews.length).fill(null);

  return (
    <>
      <div
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/40"
        onClick={onClose}
      >
        <div
          className="w-fit h-[660px] bg-main-bg border-2 rounded-[.75rem] z-50 px-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-row justify-between items-center mt-3 mb-4">
            <p className="font-bold text-lg font-family-pretendard">
              리뷰 작성
            </p>
            <button
              onClick={onClose}
              className="text-xl font-bold hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col items-center gap-y-3">
            <OrderProduct />

            <textarea
              name="content"
              id="content"
              minLength={5}
              maxLength={200}
              required
              placeholder="리뷰를 작성해주세요 (최소 5자)"
              className="border border-grey w-[320px] h-[170px] px-3 py-2 rounded resize-none focus:outline-none focus:border-main-text"
            />

            <input
              type="file"
              name="photo"
              id="reviewImage"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handlePreview}
              disabled={previews.length >= 5}
            />

            <div className="flex flex-row gap-x-2">
              {previews.map((preview, idx) => (
                <div
                  key={idx}
                  className="relative w-[55px] h-[55px] bg-grey rounded overflow-hidden"
                >
                  <img
                    src={preview}
                    alt={`preview-${idx}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-0 right-0 bg-black/60 text-white text-xs w-5 h-5 flex items-center justify-center hover:bg-black/80"
                  >
                    ✕
                  </button>
                </div>
              ))}

              {emptySlots.map((_, idx) => (
                <div
                  key={`empty-${idx}`}
                  className="w-[55px] h-[55px] bg-grey rounded"
                />
              ))}
            </div>

            <p className="text-sm text-gray-600">
              이미지는 최대 5장까지 가능해요 ({previews.length}/5)
            </p>

            <label
              className={`bg-main-text text-main-bg w-fit px-4 py-2 rounded-[.75rem] cursor-pointer hover:opacity-90 ${
                previews.length >= 5 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              htmlFor="reviewImage"
            >
              사진 첨부
            </label>

            <button
              onClick={handleSubmit}
              className="bg-main-text text-main-bg w-[320px] py-2 mt-2 rounded-[.75rem] font-md hover:opacity-90 font-family-pretendard"
            >
              리뷰 등록
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviewModal;
