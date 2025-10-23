function Review() {
  return (
    <>
      <div className="w-[160px] md:w-[220px] lg:w-[285px] h-auto flex flex-col gap-y-[8px]">
        <div className="w-[160px] h-[160px] md:w-[220px] md:h-[220px] lg:w-[285px] lg:h-[285px] rounded-[10px] bg-gray-100 flex-shrink-0">
          {/* <img className="w-full h-full object-cover rounded-[10px]" /> */}
        </div>
        <div className="flex flex-row gap-x-[5px] items-center">
          <div className="w-[24px] h-[24px] md:w-[30px] md:h-[30px] rounded-full bg-gray-100 flex-shrink-0">
            {/* <img className="w-full h-full object-cover rounded-full" /> */}
          </div>
          <p className="text-xs md:text-sm font-pretendard font-normal truncate">asdf1234</p>
        </div>
        <p className="text-xs md:text-sm font-pretendard font-normal line-clamp-2">asdfsdfasdf</p>
      </div>
    </>
  );
}

export default Review;