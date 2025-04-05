import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Navigation from "./Navigation"


const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
