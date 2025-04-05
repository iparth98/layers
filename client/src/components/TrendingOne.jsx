import home_image_air_1 from "../assets/home/home_image_air_1.png";
import home_image_air_2 from "../assets/home/home_image_air_2.png";

export const TrendingOne = () => {
  return (
    <>
      <div className="flex justify-center mt-20 gap-1">
        <div className="w-1/3 bg-blue-300 text-white">
          <img src={home_image_air_1} alt="" />
        </div>
        <div className="w-1/3 bg-red-300 text-white">
          <img src={home_image_air_2} alt="" />
        </div>
      </div>
      {/* Bottom Centered SHOP NOW Button */}
      <div className="flex justify-center pt-9 pb-11">
        <a
          href="#"
          className="text-black underline uppercase text-sm hover:font-bold"
        >
          shop air down
        </a>
      </div>
    </>
  );
};

export default TrendingOne;
