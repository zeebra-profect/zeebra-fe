import { useState, type ChangeEvent, type FormEvent } from "react";

interface SignupFormData {
  loginId: string;
  password: string;
  confirmPassword: string;
  name: string;
  nickname: string;
  birth: string;
  gender: string;
}

function SignupForm() {
  const [formData, setFormData] = useState<SignupFormData>({
    loginId: "",
    password: "",
    confirmPassword: "",
    name: "",
    nickname: "",
    birth: "",
    gender: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setshowConfirmPassword] =
    useState<boolean>(false);

  const isMatched =
    formData.password !== "" &&
    formData.confirmPassword !== "" &&
    formData.password === formData.confirmPassword;

  const isPossibleNickname =
    formData.nickname !== "" &&
    formData.nickname.length >= 2 &&
    // 여기에 닉네임 중복 확인 로직 추가 필요
    true; // 예시로 항상 true 반환

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 form 제출 핸들러
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 새로고침 방지

    console.log("회원가입 데이터:", formData);

    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않아요!");
      return;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      action="GET"
      className="flex flex-col w-fit h-fit min-w-[40vh] min-h-[60vh] gap-y-[10px] items-center bg-white rounded-[0.875rem] shadow-md "
    >
      <p className="mt-[3vh] font-bold text-xl">회원가입</p>
      <div className="w-[30vh] mt-[2vh] focus-within:font-bold">
        <div className="flex flex-row justify-between items-center">
          <label htmlFor="formData.loginId">아이디</label>
          <button className="bg-main-text text-main-bg px-2 py-1  rounded-[0.875rem] font-normal text-sm">
            중복 확인
          </button>
        </div>
        <input
          id="formData.loginId"
          type="text"
          name="loginId"
          value={formData.loginId}
          onChange={handleChange}
          required
          className="w-full border-b-2 border-grey outline-none focus:border-b-4 focus:border-b-main-text"
        />
      </div>
      <div className="w-[30vh] focus-within:font-bold">
        <div className="flex flex-row justify-between focus-within:font-bold">
          <label htmlFor="formData.password">비밀번호</label>
        </div>
        <div className="relative">
          <input
            id="formData.password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border-b-2 border-grey outline-none focus:border-b-4 focus:border-b-main-text"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-0 top-0 text-sm text-main-text"
          >
            {showPassword ? "숨기기" : "보기"}
          </button>
        </div>
      </div>
      <div className="w-[30vh] focus-within:font-bold">
        <div className="flex flex-row justify-between focus-within:font-bold">
          <label htmlFor="formData.confirmPassword">비밀번호 확인</label>
          {/* 조건부 렌더링 부분 💡 */}
          {formData.confirmPassword !== "" &&
            (isMatched ? (
              <p className="text-green-500 text-sm mt-1 font-normal">
                비밀번호가 일치합니다
              </p>
            ) : (
              <p className="text-red-500 text-sm mt-1 font-normal">
                비밀번호가 일치하지 않습니다
              </p>
            ))}
        </div>
        <div className="relative">
          <input
            id="formData.confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full border-b-2 border-grey outline-none focus:border-b-4 focus:border-b-main-text"
          />
          <button
            type="button"
            onClick={() => setshowConfirmPassword((prev) => !prev)}
            className="absolute right-0 top-0 text-sm text-main-text"
          >
            {showConfirmPassword ? "숨기기" : "보기"}
          </button>
        </div>
      </div>
      <div className="w-[30vh] focus-within:font-bold">
        <div className="flex flex-row justify-between items-center">
          <label htmlFor="formData.nickname">닉네임</label>
        </div>
        <input
          id="formData.nickname"
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          required
          className="w-full border-b-2 border-grey outline-none focus:border-b-4 focus:border-b-main-text font-normal"
        />
        {formData.nickname !== "" &&
          (isPossibleNickname ? (
            <p className="text-green-500 text-sm mt-1 font-normal">
              사용가능한 닉네임입니다.
            </p>
          ) : (
            <p className="text-red-500 text-sm mt-1 font-normal">
              이미 사용중인 닉네임입니다.
            </p>
          ))}
      </div>
      <div className="w-[30vh] focus-within:font-bold">
        <label htmlFor="formData.name">이름</label>
        <input
          id="formData.name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border-b-2 border-grey outline-none focus:border-b-4 focus:border-b-main-text font-normal"
        />
      </div>
      <div className="w-[30vh] mt-[20px] focus-within:font-bold flex flex-row justify-between items-center">
        <label htmlFor="formData.birth">생년월일</label>
        <input
          id="formData.birth"
          type="date"
          name="birth"
          value={formData.birth}
          onChange={handleChange}
          className="font-normal"
        />
      </div>
      <div className="w-[30vh] mt-[20px] focus-within:font-bold flex flex-row justify-between items-center">
        <div className="flex flex-row items-center justify-between w-full">
          <p className="">성별</p>
          <div className="flex flex-row gap-6">
            <label className="flex items-center gap-2 font-normal">
              <input
                type="radio"
                name="gender"
                value="MAN"
                checked={formData.gender === "MAN"}
                onChange={handleChange}
                className="w-4 h-5 transition-all duration-200 cursor-pointer hover:scale-110 focus:outline-none disabled:opacity-50"
              />
              남성
            </label>

            <label className="flex items-center gap-2 font-normal">
              <input
                type="radio"
                name="gender"
                value="WOMAN"
                checked={formData.gender === "WOMAN"}
                onChange={handleChange}
                className="w-4 h-5 transition-all duration-200 cursor-pointer hover:scale-110 focus:outline-none disabled:opacity-50"
              />
              여성
            </label>
          </div>
        </div>
      </div>
      <button className="mt-[20px] bg-main-text text-main-bg px-19 py-2 rounded-lg cursor-pointer text-lg font-bold mb-[3vh]">
        회원가입
      </button>
    </form>
  );
}

export default SignupForm;
