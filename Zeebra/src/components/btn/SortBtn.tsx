const BtnItems = ["카테고리", "색상", "가격대"];

import SideModal from "../modal/SideModal/SideModal";
import ModalShell from "../../common/modal/ModalShell";
import { useState } from "react";

function SortBtn() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex gap-2">
        {BtnItems.map((item) => (
          <button
            key={item}
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 w-fit h-fit border border-none bg-grey rounded-3xl text-sm hover:bg-grey2 cursor-pointer"
          >
            <p className="font-extralight text-[3/4rem] font-family-pretendard">
              {item}
            </p>
          </button>
        ))}
      </div>
      <ModalShell open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4 items-center mb-4">
            <button onClick={() => setIsOpen(false)}>X</button>
            <p className="font-semibold font-family-pretendard text-lg">필터</p>
          </div>
          <SideModal />
        </div>
      </ModalShell>
    </>
  );
}

export default SortBtn;
