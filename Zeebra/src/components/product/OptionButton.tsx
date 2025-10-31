interface OptionButtonProps {
  size: number;
  price: number;
  onClick: () => void;
  isSelected: boolean;
}

function OptionButton({ size, price, onClick, isSelected }: OptionButtonProps) {
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

export default OptionButton;
