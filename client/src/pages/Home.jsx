import FeatureSection from "../components/FeatureSection";
import HeroSection from "../components/HeroSection";
import TrendingOne from "../components/TrendingOne";
import Products from "../components/product/Products";

export const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
      <TrendingOne />
      <Products />
    </div>
  );
};

export default Home;
