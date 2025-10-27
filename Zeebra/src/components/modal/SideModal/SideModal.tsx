import Gender from "./Gender";
import Category from "./Category";
import Color from "./Color";

const num = 123456;

function SideModal() {
  return (
    <div>
      <Gender />
      <Category />
      <Color />
      <div className="flex flex-row justify-center gap-6">
        <button className="bg-main-bg text-main-text border-1 border-grey w-fit h-fit px-4 py-2 rounded-md text-sm">
          초기화
        </button>
        <button className="bg-main-text text-main-bg border-1 border-grey w-fit h-fit px-4 py-2 rounded-md text-sm">
          {num}개 상품보기
        </button>
      </div>
    </div>
  );
}

export default SideModal;
