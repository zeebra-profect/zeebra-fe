interface ProductColorOptionProps {
  value: string;
  isSelected?: boolean;
  onClick: () => void;
}

function ProductColorOption({ value, isSelected, onClick }: ProductColorOptionProps) {
  return (
    <button 
      className={`button-color ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
export default ProductColorOption;