import largeBanner from "@/img/icons/largeBanner480.png";

function LargeBanner() {
  return (
    <div className="w-full max-w-[1200px] h-[300px] md:h-[400px] lg:h-[480px] rounded-lg md:rounded-xl lg:rounded-2xl bg-grey">
      <img
        src={largeBanner}
        alt="LargeBanner"
        className="w-full h-full object-cover rounded-lg md:rounded-xl lg:rounded-2xl"
      />
    </div>
  );
}

export default LargeBanner;
