import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";

function CartPage()
{
    return(
        <>
        <div className="flex flex-col w-full max-w-[660px] text-center text-main-text">
            <p className="font-extrabold text-3xl">
                장바구니
            </p>
            <div className="flex flex-row items-center justify-between mt-10 pl-5 pr-5">
                <div className="flex flex-row items-center gap-x-[5px]">
                    <input type="checkbox" className="input-checkBox" id="all"/>
                    <label className="text-sm font-normal" for="all">전체선택</label>
                </div>
                <button className="button-smallButton">선택 삭제</button>
            </div>
            <hr className="text-grey mt-2.5"/>
            <CartItem/>
            <CartItem/>
            <CartItem/>
            <CartSummary/>
        </div>
        </>
    )
}

export default CartPage;