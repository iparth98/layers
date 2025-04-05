import background from "../assets/background.jpg";
export const HeroSection = () => {
  return (
    <div className="relative w-full h-screen bg-cover bg-center bg-no-repeat ">
      <img
        src={background}
        alt="image not found"
        className="w-full h-screen object-cover"
      />
      <div className="absolute bottom-[10%] left-10 text-white bg-black/60 p-3">
        <h1 className="text-4xl">
          THE SS25 COLLECTION
        </h1>
        <p className="text-lg">Discover all-new Air Down, here at Camp Moose.</p>
      </div>
    </div>
  );
};

export default HeroSection;
