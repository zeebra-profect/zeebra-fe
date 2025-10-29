import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/auth";
import { AxiosError } from "axios";

interface LoginFormData {
  identifier: string;
  password: string;
}

function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginFormData>({
    identifier: "",
    password: "",
  });
  const [showPw, setShowPw] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");

  // 비밀번호 및 아이디 유효성 검사
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;
  const isValid =
    form.identifier.trim().length > 0 &&
    passwordRegex.test(form.password.trim());

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errMsg) setErrMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrMsg("");

    try {
      setLoading(true);
      const res = await login({
        identifier: form.identifier,
        password: form.password,
      });

      localStorage.setItem("accessToken", res.accessToken);
      if (res.refreshToken) {
        localStorage.setItem("refreshToken", res.refreshToken);
      }

      // 로그인 성공 후 리다이렉트
      navigate("/");
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>;
      if (err.response) {
        setErrMsg(
          err.response.data?.message ||
            "로그인에 실패했습니다. 다시 시도해주세요."
        );
      } else {
        setErrMsg("서버와의 연결에 실패했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  const onEnterSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm mx-auto mt-10 p-6 bg-white rounded-2xl shadow"
    >
      <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>

      {/* 아이디 */}
      <div className="mb-4 focus-within:font-semibold">
        <label htmlFor="identifier" className="block mb-1">
          아이디
        </label>
        <input
          id="identifier"
          name="identifier"
          type="text"
          value={form.identifier}
          onChange={handleChange}
          onKeyDown={onEnterSubmit}
          maxLength={16}
          required
          className="w-full border-b-2 border-gray-300 outline-none py-2
                     focus:border-b-4 focus:border-main-text transition-all h-5"
        />
      </div>

      {/* 비밀번호 */}
      <div className="mb-2 focus-within:font-semibold">
        <label htmlFor="password" className="block mb-1">
          비밀번호
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPw ? "text" : "password"}
            value={form.password}
            maxLength={12}
            onChange={handleChange}
            onKeyDown={onEnterSubmit}
            required
            minLength={8}
            placeholder="8~12자"
            className="w-full border-b-2 border-gray-300 outline-none py-2 pr-16
                       focus:border-b-4  focus:border-main-text transition-all h-5 placeholder:text-grey2 font-normal"
            aria-invalid={!isValid && form.password.length > 0}
          />
          <button
            type="button"
            onClick={() => setShowPw((s) => !s)}
            className="absolute right-0 top-0 text-sm text-main-text"
          >
            {showPw ? "숨기기" : "표시"}
          </button>
        </div>
      </div>

      {/* 에러 메시지 */}
      {errMsg && <p className="text-red-500 text-sm mt-1">{errMsg}</p>}

      {/* 로그인 버튼 */}
      <button
        type="submit"
        disabled={!isValid || loading}
        className="mt-4 w-full py-2 rounded-lg text-white bg-main-text transition cursor-pointer hover:bg-main-text-dark"
      >
        {loading ? "로그인 중..." : "로그인"}
      </button>

      {/* 하단 액션들 */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <button
          type="button"
          className="text-gray-600 hover:underline cursor-pointer"
          onClick={() => alert("아이디 찾기 페이지로 이동 (라우팅 연결)")}
        >
          아이디 찾기
        </button>
        <button
          type="button"
          className="text-gray-600 hover:underline cursor-pointer"
          onClick={() => alert("비밀번호 찾기 페이지로 이동 (라우팅 연결)")}
        >
          비밀번호 찾기
        </button>
        <button
          type="button"
          className="ml-2 text-blue-600 font-medium hover:underline cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          회원가입
        </button>
      </div>

      {/* 선택: 자동로그인/아이디 저장 */}
      <div className="mt-3 flex items-center gap-2">
        <input
          id="remember"
          type="checkbox"
          className="w-4 h-4 accent-main-text cursor-pointer"
        />
        <label htmlFor="remember" className="text-sm text-main-text">
          로그인 상태 유지
        </label>
      </div>
    </form>
  );
}
export default LoginForm;
