import type { ProductDetail } from "@/utils/product";

interface ProductColorOptionListProps {
  colorOptionResponses: ProductDetail["data"]["colorOptionResponses"]; // 적절한 타입으로 변경
  selectedColor: string;
  onColorChange: (color: string) => void;
}

function ProductColorOptionList({
  colorOptionResponses,
  selectedColor,
  onColorChange,
}: ProductColorOptionListProps) {
  return (
    <div className="pl-0 md:pl-10 flex flex-row gap-x-1">
      {colorOptionResponses?.map((option) => (
        // <ProductColorOption
        //   value={option.colorValue}
        //   isSelected={selectedColor === option.colorValue}
        //   onClick={() => onColorChange(option.colorValue)}
        // />
      ))}
    </div>
  );
}
export default ProductColorOptionList;