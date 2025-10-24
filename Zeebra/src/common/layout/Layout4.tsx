import { Outlet } from "react-router-dom";
import PaymentButton from "../footer/paymentButton";

// 기본 레이아웃

function Layout4() {
  return (
    <>
      <Outlet />
      <div className="shadow-[4px_0_20px_rgba(0,0,0,0.1)] flex fixed bottom-0 w-full h-20 bg-white z-10 justify-center items-center">
        <PaymentButton />
      </div>
    </>
  );
}

export default Layout4;
