import { refetchMe } from "@/store/authSlice";
import profileimg from "../../img/test/profile_img.jpeg";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

function MyPage() {
  const dispatch = useAppDispatch();
  const memberInfo = useAppSelector((state) => state.auth.me);

  useEffect(() => {
    dispatch(refetchMe());
  }, []);

  useEffect(() => {
    console.log("memberInfo: ", memberInfo);
  }, [memberInfo]);

  return (
    <div className="flex flex-col w-full items-center mt-6 gap-4 font-bold text-2xl ">
      내 정보
      <div className="flex flex-row items-center justify-between gap-8 border-2 border-grey rounded-2xl px-12 py-6 mt-10">
        {memberInfo && memberInfo.memberImage ? (
          <img
            src={memberInfo.memberImage}
            alt="profile"
            className="w-[20vh] h-[20vh] rounded-full object-cover object-[50%_15%]"
          />
        ) : (
          <img
            src={profileimg}
            alt="profile"
            className="w-[20vh] h-[20vh] rounded-full object-cover object-[50%_15%]"
          />
        )}
        <div className="flex flex-col w-[30vh] ml-10 items-start gap-4">
          <div className="flex flex-row items-start gap-1">
            <p className="text-xl font-semibold">{memberInfo?.nickname}</p>
            <button
              className="text-sm font-extralight mt-auto text-grey2 cursor-pointer"
              onClick={() => alert("닉네임 변경 추가 예정")}
            >
              닉네임 변경
            </button>
          </div>
          <p className="text-base">{memberInfo?.memberEmail}</p>
          <div className="flex flex-row gap-6">
            <p
              className="font-extralight text-sm mt-6 cursor-pointer text-main-text border-b-1 border-grey2"
              onClick={() => alert("이미지 변경 추가 예정")}
            >
              프로필 이미지 변경
            </p>
            <p
              className="font-extralight text-sm mt-6 cursor-pointer text-main-text border-b-1 border-grey2"
              onClick={() => alert("비번 변경 추가 예정")}
            >
              비밀번호 변경
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
