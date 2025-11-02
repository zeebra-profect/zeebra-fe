import { http } from "./http";

// 판매 상태 타입
type SalesStatus = "ON_SALE" | "PENDING" | "CONFIRMED";

interface SalesData {
  salesId: number;
  productOptionId: number;
  price: number;
  salesStatus: SalesStatus;
  stock: number;
  createdAt: string;
}

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
  sendTime: string;
}


export interface SalesRequest {
  productOptionId: number;
  price: number;
  salesStatus: SalesStatus;
  stock: number;
}

// 최종 타입
export type SalesResponse = ApiResponse<SalesData>;

export async function postSales(form: SalesRequest): Promise<SalesResponse> {
  const {data} = await http.post<SalesResponse>(`/sales`, form);
  return data;
}