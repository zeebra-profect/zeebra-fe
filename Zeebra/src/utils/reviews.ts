import { http } from "./http";

export interface ReviewRes {
  identifier: string;
  password: string;
}

export async function CreateReview(data: ReviewRes): Promise<void> {
  await http.post("/reviews/{productOptionId}", data);
}

// members/me 호출 refetch에 활용됨
export async function getReview() {
  const res = await http.get("/reviews/{reviewId}");
  return res.data;
}

export async function deleteReview() {
  await http.delete("/reviews/{reviewId}");
}
