function Coupon()
{

    const couponAlert = () => {
        alert('사용할 수 있는 쿠폰이 없습니다.');
    };

    return(
        <div className="flex flex-col mb-5">
            <p className="text-left font-light text-xs">
                할인쿠폰
            </p>
            <div className="flex flex-row justify-between items-center flex-3">
                <div className="couponDiv">
                    <p>asdf</p>
                </div>
                <button className="button-smallButton" onClick={couponAlert}>
                    쿠폰
                </button>
            </div>
        </div>
    )
}

export default Coupon;