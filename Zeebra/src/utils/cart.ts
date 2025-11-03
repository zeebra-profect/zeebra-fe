import { http } from "./http";
import { AxiosError } from "axios";

// ======================================================================
// 1. 장바구니 항목 상세 인터페이스 (백엔드 응답을 기반으로 재정의)
// ======================================================================

export interface ProductOption {
  name: string;
  value: string;
}

export interface CartItemRes {
  productOptionId: number;
  productId: number;
  snapShotPrice: number;
  currentLowestPrice: number;
  quantity: number;
  isSoldOut: boolean;
  productName: string;
  thumbnail: string;
  options: ProductOption[];
}

export interface CartDataRes {
  cartId: number;
  totalPrice: number;
  discount: number;
  totalQuantity: number;
  cartItems: CartItemRes[]; // ✅ 상세 항목 리스트
  currentPage: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
}

// ======================================================================
// 2. API 응답 및 요청 인터페이스
// ======================================================================

export interface ApiResponse<T = void> {
  status: string;
  message: string | null;
  data: T;
  sendTime: string;
}

export interface CartRes {
  status: string;
  message: string;
  data: {
    cartId: number;
  };
}

// 🛒 장바구니 수량 변경 요청 (PATCH/PUT용)
export interface CartUpdateReq {
  quantity: number;
}

// ======================================================================
// 3. API 함수 구현
// ======================================================================

// 장바구니에 상품 추가 (기존 함수 재정의)
export async function addCart(productOptionId: number): Promise<CartRes> {
  // 백엔드가 quantity 없이 productOptionId만으로 추가를 처리한다고 가정
  const { data } = await http.post<CartRes>(`/carts/${productOptionId}`);
  return data;
}

// 장바구니 목록 조회
export async function getCartList(): Promise<CartDataRes> {
  try {
    const { data: responseBody } = await http.get<ApiResponse<CartDataRes>>(
      `/carts`
    );

    if (!responseBody.data) {
      throw new Error("장바구니 데이터를 불러오는 데 실패했습니다.");
    }

    return responseBody.data;
  } catch (error) {
    console.error("❌ 장바구니 목록 조회 실패:", error);
    if (error instanceof AxiosError && error.response?.status === 404) {
      // 404가 발생하면 장바구니가 비어있는 것으로 간주하고 기본값 반환 가능
      // 혹은 빈 배열을 포함하는 CartDataRes 구조를 반환하도록 처리
    }
    throw error;
  }
}

// 장바구니 상품 수량 변경 (PATCH 또는 PUT)
export async function updateCartQuantity(
  productOptionId: number,
  quantity: number
): Promise<void> {
  const reqBody: CartUpdateReq = { quantity };

  await http.patch<ApiResponse>(`/carts/${productOptionId}`, reqBody);
}

// 장바구니 특정 상품 삭제
export async function deleteCartItem(productOptionId: number): Promise<void> {
  await http.delete<ApiResponse>(`/carts/${productOptionId}`);
}

// 장바구니 전체 비우기 (선택 사항)
export async function clearAllCart(): Promise<void> {
  await http.delete<ApiResponse>(`/carts`);
}
