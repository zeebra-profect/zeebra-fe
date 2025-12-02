export const getImageUrl = (path: string | null, productId: number) => {
  if (path && path.startsWith("http")) return path;

  // 2. Lorem Flickr 원본 URL 생성
  const lockIndex = productId % 1000;
  const originalUrl = `https://loremflickr.com/600/600/fashion,clothes?lock=${lockIndex}`;

  return `https://images.weserv.nl/?url=${encodeURIComponent(
    originalUrl
  )}&output=webp&q=80`;
};
