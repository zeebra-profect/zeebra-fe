interface Noti {
  type: string;
  text: string;
  isRead: boolean;
  createdTime: string;
}

function Notification({ type, isRead, text, createdTime }: Noti) {
  const formatted = new Date(createdTime).toLocaleString("ko-KR", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <div className="w-full flex justify-center">
        <hr className="text-grey w-11/12" />
      </div>
      <div className="flex flex-row justify-between mt-2.5 mb-2.5 ml-5 mr-5">
        <div className="flex flex-row gap-y-2.5 gap-x-2.5">
          <img src="" className="w-12 h-12 rounded-full" />
          <div className="flex flex-col text-left">
            <p className="font-normal text-grey2 text-xs">{formatted}</p>
            <p className="font-medium text-xs">{type}</p>
            <p
              className={
                isRead
                  ? "text-grey2 font-light text-sm"
                  : "text-main-text font-light text-sm"
              }
            >
              {text}
            </p>
          </div>
        </div>
        <div className="cursor-pointer">
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 9L9 15M9 9L15 15"
              stroke="#222222"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
export default Notification;
