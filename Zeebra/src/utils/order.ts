import { http } from './http';

export interface OrderReq {
  ClientRequestId: string;
  cartId: number;
  salesItem: {
    salesId: number;
    quantity: number;
    price: number;
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
      orderItems: [
        {
          orderItemId: number;
          saleId: number;
          productOptionId: number;
          orderItemName: string;
          orderItemThumbnail: string;
          orderItemPrice: number;
          orderItemQuantity: number;
          orderItemAmount: number;
          orderItemStatus: string;
          orderItemOptions: [
            {
              name: string;
              value: string;
            }
          ];
        }
      ];
    };
  };
  sendTime: string;
}

export async function postOrder(form: OrderReq): Promise<OrderRes> {
    const { data } = await http.post<OrderRes>(`/orders`, form); // form을 두 번째 인자로 전달
    return data;
}