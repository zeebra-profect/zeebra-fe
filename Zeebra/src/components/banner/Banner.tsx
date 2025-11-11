import smallBanner from "@/img/icons/smallBanner.png";

function Banner() {
  return (
    <div className="w-full max-w-[1200px] h-[100px] md:h-[130px] lg:h-[150px] rounded-lg md:rounded-xl lg:rounded-2xl bg-grey">
      <img
        src={smallBanner}
        alt="smallBanner"
        className="w-full h-full object-cover rounded-lg md:rounded-xl lg:rounded-2xl"
      />
    </div>
  );
}

export default Banner;
