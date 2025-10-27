interface SizeButtonProps {
  size: number;
  price: number;
  onClick: () => void;
  isSelected: boolean;
}

function SizeButton({ size, price, onClick, isSelected }: SizeButtonProps) {
  const formatted = price.toLocaleString();

  return (
    <button
      onClick={onClick}
      className={`${isSelected ? "button-size2" : "button-size"}`}
    >
      <p className="text-sm">{size}</p>
      <p className="text-xs text-orange">{formatted}</p>
    </button>
  );
}

export default SizeButton;
