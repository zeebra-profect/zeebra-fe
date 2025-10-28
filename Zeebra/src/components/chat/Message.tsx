interface MessageProps {
  messageId: number;
  memberId: number;
  myMemberId: number;
  content: string;
  time: string;
}

function Message({
  _messageId,
  memberId,
  myMemberId,
  content,
  _time,
}: MessageProps) {
  if (memberId != myMemberId) {
    return (
      <div className="flex flex-row gap-x-1 m-1.5 font-pretendard items-center max-w-[400px]">
        <div className="min-w-[30px] min-h-[30px] rounded-3xl bg-amber-300"></div>
        {/* <img src="" className="w-[30px] h-[30px] rounded-3xl"/> */}
        <div className="">
          <p className="font-semibold text-xs">asdf1234</p>
        </div>
        <div className="bg-main-text text-white max-w-[250px] max-h-auto pt-0.2 pb-0.2 pl-2 pr-2 rounded-lg flex justify-center items-center">
          <pre className="font-normal text-xs">
            asdasdasdㄴㅇㄹaㅁㄴㅇㅁㄴㅇㄴㅁㅇㅁㄴㅇㅁㄴㅇㅁㄴㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇdㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
            {content}
          </pre>
        </div>
        <p className="text-[10px] font-light">13:11</p>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row gap-x-1 m-1.5 font-pretendard items-center max-w-[400px] justify-end">
        <p className="text-[10px] font-light">13:11</p>
        <div className="bg-green text-white max-w-[250px] max-h-auto pt-0.2 pb-0.2 pl-2 pr-2 rounded-lg flex justify-center items-center">
          <pre className="font-normal text-xs">
            asdasdasdㄴㅇㄹaㅁㄴㅇㅁㄴㅇㄴㅁㅇㅁㄴㅇㅁㄴㅇㅁㄴㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇdㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
            {content}
          </pre>
        </div>
      </div>
    );
  }
}

export default Message;
