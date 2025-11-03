import type { ApiResponse } from "./favorite";
import { http } from "./http";

export interface Amount {
  value: number;
  currency: string;
}

export interface PaymentRes {
  paymentId: number;
  amount: Amount;
  orderName: string;
  tossOrderId: string;
  successUrl: string;
  failUrl: string;
}

export interface PaymentReq {
  orderId: number;
  orderName: string;
  price: number;
  discount: number;
  amount: number;
  clientRequestId: string;
}

export interface PaymentApproveReq {
  paymentKey: string;
  tossOrderId: string;
  amount: number;
  clientRequestId: string;
}

interface OrderInfo {
  orderId: 0;
  orderNumber: string;
  orderStatus: string;
  orderTime: string;
  totalPrice: number;
  totalAmount: number;
  usePoint: number;
}

export interface PaymentApproveRes {
  paymentId: number;
  orderNameSnapshot: string;
  paymentAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  approvedAt: string;
  isApproved: true;
  orderInfo: OrderInfo;
}

export interface PaymentFailReq {
    code: string;
    message: string;
    tossOrderId: string;
    clientRequestId: string;
}

export type PaymentResponse = ApiResponse<PaymentRes>;
export type PaymentApproveResponse = ApiResponse<PaymentApproveRes>;

export async function createPayment(req: PaymentReq): Promise<PaymentResponse> {
  const { data } = await http.post<PaymentResponse>(`/payments`, req);
  console.log("paymentData: ", data);
  return data;
}

export async function postApprove(req: PaymentApproveReq): Promise<PaymentApproveResponse> {
    const {data} = await http.post<PaymentApproveResponse>(`/payments/approve`, req);
    console.log("paymentApproveData: ", data);
    return data;
}

export async function postFail(req: PaymentFailReq): Promise<PaymentApproveResponse> {
    const {data} = await http.post<PaymentApproveResponse>(`/payments/fail`, req);
    console.log("paymentFailData: ", data);
    return data;
}
