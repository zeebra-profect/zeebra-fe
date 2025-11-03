import { http } from "./http";

export interface OrderReq {
  clientRequestId: string;
  productOptionId: number;
}

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

export interface OrderRes {
  status: string;
  message: string;
  data: {
    order: {
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
    };
  };
  sendTime: string;
}

export interface OrderByIdRes {
  status: string;
  message: string;
  data: {
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
  };
  sendTime: string;
}

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

export async function postOrder(form: OrderReq): Promise<OrderRes> {
  const { data } = await http.post<OrderRes>(`/orders`, form); // form을 두 번째 인자로 전달
  return data;
}

export async function getOrders(form: OrderGetReq): Promise<OrderRes> {
  const { data } = await http.get<OrderRes>(`/orders`, { params: form });
  return data;
}

export async function getOrderById(orderId: number): Promise<OrderByIdRes> {
  const { data } = await http.get<OrderByIdRes>(`/orders/${orderId}`);
  return data;
}
