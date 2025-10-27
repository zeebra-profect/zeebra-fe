import { useState } from "react";
import PrivateChatModal from "./PrivateChatModal";

function Chat() {

    const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="w-full flex justify-center">
        <hr className="text-grey w-11/12" />
      </div>
      <div className="flex flex-row justify-between mt-2.5 mb-2.5 ml-5 mr-5 cursor-pointer" onClick={() => setIsOpen(true)}>
        <div className="flex flex-row gap-y-2.5 gap-x-2.5">
          <img src="" className="w-12 h-12 rounded-full" />
          <div className="flex flex-col text-left">
            <p className="font-normal text-grey2 text-xs">asdf1234</p>
            <p className="font-medium text-xs">
              Nike Air Force 1 ‘07 Low White
            </p>
            <p className="font-light text-sm">배송 보내셨나요?</p>
          </div>
        </div>
        <div className="cursor-pointer flex flex-col gap-y-0.5 p-2 items-center">
          <div className="min-w-6 h-auto bg-orange rounded-xl p-0.5 text-center">
            <p className="text-white font-bold">1</p>
          </div>
          <p>15:34</p>
        </div>
      </div>
      <PrivateChatModal isOpen={isOpen} onClose={() => setIsOpen(false)} children={undefined}/>
    </>
  );
}

export default Chat;
