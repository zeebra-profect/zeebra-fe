import { http } from "./http";

export interface ProductDetail {
  status: string;
  message: string;
  data: {
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
      colorOptionResponses: Array<
    {
      colorOptionNameId: number;
      colorValue: string;
    }>;
    colorValue: string;
  };
  sendTime: string;
}

export interface ProductOption {
  status: string;
  message: string;
  data: {
    sizeOptionResponses: Array<
      {
        optionCombinationId: number;
        sizeValue: string;
        productOptionId: number;
        lowPriceOfSize: number;
      }>;
  };
  sendTime: string;
}

export async function getProduct(productId: number): Promise<ProductDetail> {
  const { data } = await http.get<ProductDetail>(`/products/${productId}`);
  return data;
}

export async function getProductOption(productId: number, colorOptionNameId: number): Promise<ProductOption> {
  const { data } = await http.get<ProductOption>(`/product-options/${productId}/${colorOptionNameId}`);
  return data;
}
