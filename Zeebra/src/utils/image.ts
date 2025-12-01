export const getImageUrl = (path: string | null, productId: number) => {
  if (path && path.startsWith("http")) return path;

  const lockIndex = productId % 100;

  // 👇 300/300 대신 600/600으로 변경! (화질 깨짐 방지)
  return `https://loremflickr.com/600/600/fashion,clothes?lock=${lockIndex}`;
};
