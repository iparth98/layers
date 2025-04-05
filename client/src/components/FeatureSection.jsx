import home_image_1 from "../assets/home/home_image_1.webp";
import home_image_2 from "../assets/home/home_image_2.webp";
import home_image_3 from "../assets/home/home_image_3.webp";

export const FeatureSection = () => {
  return (
    <>
      <div className="flex justify-center mt-5 relative w-full h-screen bg-cover bg-center overflow-hidden">
        {/* Left Image - Full Height */}
        <div className="relative w-1/3 h-full">
          {/* Image */}
          <img
            src={home_image_1}
            alt="Image Not Found"
            className="w-full h-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent opacity-80"></div>

          {/* Text Content */}
          <div className="absolute bottom-[10%] text-white w-full text-center text-sm">
            <h2 className="">INTERNATIONAL WOMEN'S DAY</h2>
            <p>This one is for the ladies.</p>
          </div>
        </div>

        {/* Right Column - Two Stacked Images */}
        <div className="w-1/3 flex flex-col h-full">
          <div className="h-1/2 relative">
            {/* Gradient Overlay */}
            <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent opacity-80"></div>
            <img
              src={home_image_2}
              alt="Image Not Found"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-[10%] text-white w-full text-center text-sm">
              <h2 className="">ICONS FOR A REASON</h2>
              <p>These classics don’t quit</p>
            </div>
          </div>
          <div className="h-1/2 relative">
            {/* Gradient Overlay */}
            <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent opacity-80"></div>

            <img
              src={home_image_3}
              alt="Image Not Found"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-[10%] text-white w-full text-center text-sm">
              <h2 className="">BUNNY</h2>
              <p>Discover the season’s softest</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureSection;
