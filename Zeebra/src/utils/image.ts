// lorem flickr 적용시

// export const getImageUrl = (path: string | null, productId: number) => {
//   if (path && path.startsWith("http")) return path;

//   const lockIndex = productId % 100;

//   // 👇 300/300 대신 600/600으로 변경! (화질 깨짐 방지)
//   return `https://loremflickr.com/600/600/fashion,clothes?lock=${lockIndex}`;
// };


export const getImageUrl = (path: string | null, productId: number) => {
  // 1. 만약 DB에 진짜 이미지 주소(http...)가 있다면 그걸 우선 사용
  if (path && path.startsWith("http")) return path;

  // 2. 이미지가 없다면 Placehold.co 사용
  // - 600x600: 넉넉한 고화질 사이즈 (CSS object-cover로 맞춤)
  // - ?text=Product+${productId}: 이미지 한가운데에 상품 번호를 적어줌!
  return `https://placehold.co/600x600?text=Product+${productId}`;
};