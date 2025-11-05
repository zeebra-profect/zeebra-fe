import { http } from "./http";

/**
 * 1. 주문 개별 아이템 정보
 */
export interface OrderItems {
  orderItemId: number;
  saleId: number;
  productOptionId: number;
  orderItemName: string;
  orderItemThumbnail: string;
  orderItemPrice: number;
  orderItemQuantity: number;
  orderItemAmount: number;
  orderItemStatus: string;
  orderItemOptions: Array<{
    name: string;
    value: string;
  }>;
}

/**
 * 2. 개별 주문 정보 (List 응답의 orders 배열 요소)
 * 기존 OrderRes.data.order와 동일한 구조입니다.
 */
export interface OrderInfo {
  orderId: number;
  orderNumber: string;
  orderStatus: string;
  orderTime: string;
  totalQuantity: number;
  totalPrice: number;
  totalAmount: number;
  usePoint: number;
  idempotencyKey: string;
  orderItems: Array<OrderItems>;
}

// --- API Request Interfaces ---

/**
 * 3. 주문 생성 요청 (기존과 동일)
 */
export interface OrderReq {
  clientRequestId: string;
  productOptionId: number;
}

/**
 * 4. 주문 목록 조회 요청 (기존과 동일)
 */
export interface OrderGetReq {
  startDate: string;
  endDate: string;
  orderStatus: string;
  pageable: {
    page: number;
    size: number;
    sort: string[];
  };
}

// --- API Response Interfaces ---

/**
 * 5. 단일 주문 생성 응답 (기존과 동일)
 * GET /orders/{id}나 POST /orders의 응답으로 사용 가능
 */
export interface OrderRes {
  status: string;
  message: string | null;
  data: {
    order: OrderInfo; // OrderInfo 타입을 재활용
  };
  sendTime: string;
}

/**
 * 6. 주문 ID로 조회 응답 (OrderRes와 구조가 유사하나, data 바로 아래에 OrderInfo 필드가 있는 경우)
 * 현재 API 구조에 맞춰 OrderInfo와 동일하게 정의합니다.
 */
export interface OrderByIdRes {
  status: string;
  message: string | null;
  data: OrderInfo; // data 바로 아래 주문 상세 정보가 있다고 가정
  sendTime: string;
}

/**
 * 7. ⭐️ 주문 목록 조회 응답 (가장 중요)
 * 제공해주신 JSON 구조와 정확히 일치하도록 정의합니다.
 */
export interface OrderListRes {
  status: string;
  message: string | null;
  data: {
    orders: Array<OrderInfo>; // ⭐️ 핵심: OrderInfo 배열
    currentPage: number;
    totalPages: number;
    totalElements: number;
    hasNext: boolean;
    // ... 기타 필드가 있다면 추가
  };
  sendTime: string;
}

// --- API Functions ---

export async function postOrder(form: OrderReq): Promise<OrderRes> {
  const { data } = await http.post<OrderRes>(`/orders`, form);
  return data;
}

/**
 * ⭐️ 주문 목록 조회 함수 (OrderListRes 반환)
 */
export async function getOrders(form: OrderGetReq): Promise<OrderListRes> {
  // GET /orders 엔드포인트는 OrderListRes 구조를 반환하도록 수정
  const { data } = await http.get<OrderListRes>(`/orders`, { params: form });
  console.log("data 확인:", data);
  return data;
}

export async function getOrderById(orderId: number): Promise<OrderByIdRes> {
  const { data } = await http.get<OrderByIdRes>(`/orders/${orderId}`);
  return data;
}
