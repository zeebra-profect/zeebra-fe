import { http } from "./http";

export interface CartReq {
  quantity: number;
}

// export interface CartsReq {

// }

export interface CartListRes {
  cartItem: number;
  productOptionId: number;
  createdAt: string;
}

export interface CartRes {
  status: string;
  message: string;
  data: {
    cartId: number;
  };
}

export async function postCart(productOptionId: number): Promise<CartRes> {
  const { data } = await http.post<CartRes>(`/carts/${productOptionId}`);
  return data;
}

// export async function postCarts()

// export async function delCart()
