import { http } from "./http";

export interface ProductDetail {
    status: string;
    message: string;
    data : {
        productId: number;
        brandId: number;
        categoryId: number;
        productName: string;
        productDescription: string;
        modelNumber: string;
        productThumbnail: string;
        images: string[];
        lowPrice: number;
        reviewCount: number;
        favoriteProductCount: number;
        createdAt: string;
    };
    sendTime: string;
}

export async function getProduct(productId : number): Promise<ProductDetail> {
  const { data } = await http.get<ProductDetail>(`/products/${productId}`);
  return data;
}
