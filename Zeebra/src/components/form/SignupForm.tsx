import { http } from "@/utils/http";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface SignupFormData {
  userLoginId: string;
  memberName: string;
  memberEmail: string;
  password: string;
  nickname: string;
  confirmPassword: string;
  memberBirth: string;
  memberGender: string;
}

function SignupForm() {
  const [formData, setFormData] = useState<SignupFormData>({
    userLoginId: "",
    memberName: "",
    memberEmail: "",
    password: "",
    nickname: "",
    confirmPassword: "",
    memberBirth: "",
    memberGender: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setshowConfirmPassword] =
    useState<boolean>(false);
  const navigate = useNavigate();

  // 비밀번호와 비밀번호 확인이 맞는지 판별
  const isMatched =
    formData.password !== "" &&
    formData.confirmPassword !== "" &&
    formData.password === formData.confirmPassword;

  //닉네임 중복 여부 판별
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
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
  const isValidPwd = passwordRegex.test(formData.password);
  const ready =
    formData.userLoginId &&
    isValidPwd &&
    isMatched &&
    formData.memberName &&
    formData.nickname &&
    formData.memberGender;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isMatched) {
      alert("비밀번호가 일치하지 않아요!");
      return;
    }

    const payload = {
      userLoginId: formData.userLoginId,
      memberName: formData.memberName,
      memberEmail: formData.memberEmail,
      password: formData.password,
      nickname: formData.nickname,
      confirmPassword: formData.confirmPassword,
      memberBirth: formData.memberBirth,
      memberGender: formData.memberGender,
    };

    try {
      await http.post("/auth/signup", payload);
      alert("회원가입 성공!");
      navigate("/login");
    } catch (err) {
      console.error("회원가입 실패:", err);
      alert(`회원가입 실패 : ${err}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-fit h-fit min-w-[40vh] min-h-[60vh] gap-y-2.5 items-center bg-white rounded-[0.875rem] shadow-md "
    >
      <p className="mt-[3vh] font-bold text-xl">회원가입</p>
      <div className="w-[30vh] mt-[2vh] focus-within:font-bold">
        <div className="flex flex-row justify-between items-center">
          <label htmlFor="userLoginId">아이디</label>
          <button
            // onClick={checkNickname}
            type="button"
            className="bg-main-text text-main-bg px-2 py-1  rounded-[0.875rem] font-normal text-sm"
          >
            중복 확인
          </button>
        </div>
        <input
          id="userLoginId"
          type="text"
          name="userLoginId"
          value={formData.userLoginId}
          onChange={handleChange}
          required
          className="w-full border-b-2 h-5 border-grey outline-none focus:border-b-4 focus:border-b-main-text"
        />
      </div>
      <div className="w-[30vh] focus-within:font-bold">
        <div className="flex flex-row justify-between focus-within:font-bold">
          <label htmlFor="password">비밀번호</label>
        </div>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            minLength={8}
            maxLength={20}
            placeholder="영문 혹은 숫자 8~20자"
            onChange={handleChange}
            required
            className="w-full h-5 border-b-2 border-grey outline-none focus:border-b-4 focus:border-b-main-text"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-0 top-0 text-sm text-main-text"
            onMouseDown={(e) => e.preventDefault()}
          >
            {showPassword ? "숨기기" : "보기"}
          </button>
        </div>
      </div>
      <div className="w-[30vh] focus-within:font-bold">
        <div className="flex flex-row justify-between focus-within:font-bold">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
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
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full h-5 border-b-2 border-grey outline-none focus:border-b-4 focus:border-b-main-text"
          />
          <button
            type="button"
            onClick={() => setshowConfirmPassword((prev) => !prev)}
            onMouseDown={(e) => e.preventDefault()}
            className="absolute right-0 top-0 text-sm text-main-text"
          >
            {showConfirmPassword ? "숨기기" : "보기"}
          </button>
        </div>
      </div>
      <div className="w-[30vh] focus-within:font-bold">
        <label htmlFor="memberEmail">이메일</label>
        <input
          id="memberEmail"
          type="text"
          name="memberEmail"
          value={formData.memberEmail}
          onChange={handleChange}
          required
          className="w-full h-5 border-b-2 border-grey outline-none focus:border-b-4 focus:border-b-main-text font-normal"
        />
      </div>
      <div className="w-[30vh] focus-within:font-bold">
        <div className="flex flex-row justify-between items-center">
          <label htmlFor="nickname">닉네임</label>
        </div>
        <input
          id="nickname"
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          required
          className="w-full h-5 border-b-2 border-grey outline-none focus:border-b-4 focus:border-b-main-text font-normal"
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
        <label htmlFor="memberName">이름</label>
        <input
          id="memberName"
          type="text"
          name="memberName"
          value={formData.memberName}
          onChange={handleChange}
          required
          className="w-full h-5 border-b-2 border-grey outline-none focus:border-b-4 focus:border-b-main-text font-normal"
        />
      </div>
      <div className="w-[30vh] mt-5 focus-within:font-bold flex flex-row justify-between items-center">
        <label htmlFor="memberBirth">생년월일</label>
        <input
          id="memberBirth"
          type="date"
          name="memberBirth"
          value={formData.memberBirth}
          onChange={handleChange}
          className="font-normal"
        />
      </div>
      <div className="w-[30vh] mt-5 focus-within:font-bold flex flex-row justify-between items-center">
        <div className="flex flex-row items-center justify-between w-full">
          <p className="">성별</p>
          <div className="flex flex-row gap-6">
            {/* 남성 */}
            <label
              htmlFor="gender-man"
              className="flex items-center gap-2 font-normal"
            >
              <input
                id="gender-man"
                type="radio"
                name="memberGender" // ✅ 같은 name!
                value="MAN"
                checked={formData.memberGender === "MAN"}
                onChange={handleChange}
                className="w-4 h-5 transition-all duration-200 cursor-pointer hover:scale-110 focus:outline-none disabled:opacity-50"
              />
              남성
            </label>

            {/* 여성 */}
            <label
              htmlFor="gender-woman"
              className="flex items-center gap-2 font-normal"
            >
              <input
                id="gender-woman"
                type="radio"
                name="memberGender" // ✅ 같은 name!
                value="WOMAN"
                checked={formData.memberGender === "WOMAN"}
                onChange={handleChange}
                className="w-4 h-5 transition-all duration-200 cursor-pointer hover:scale-110 focus:outline-none disabled:opacity-50"
              />
              여성
            </label>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="mt-5 bg-main-text text-main-bg px-19 py-2 rounded-lg cursor-pointer text-lg font-bold mb-[3vh]"
        disabled={!ready}
      >
        회원가입
      </button>
    </form>
  );
}

export default SignupForm;
