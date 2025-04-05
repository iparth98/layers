export const Footer = () => {
  return (
    <footer className="bg-gray-50 w-full mt-10 py-10 px-6">
      <div className="grid grid-cols-4 max-w-6xl mx-auto">
        <div>
          <h1 className="text-lg font-semibold mb-3">Customer Care</h1>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>Ordering and Shipping</li>
            <li>Returns & refunds</li>
            <li>Size Guide</li>
            <li>Contact Us</li>
            <li>Warranty Statement</li>
          </ul>
        </div>
        <div>
          <h1 className="text-lg font-semibold mb-3">Product</h1>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>Responsible Materials</li>
            <li>Human Rights Statement</li>
            <li>Fur Policy</li>
            <li>Care and Cleaning</li>
            <li>Check Authenticity</li>
          </ul>
        </div>
        <div>
          <h1 className="text-lg font-semibold mb-3">Our Company</h1>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>Brand History</li>
            <li>Careers</li>
            <li>Find a store</li>
          </ul>
        </div>
        <div>
          <h1 className="text-lg font-semibold mb-3">Legal</h1>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>Privacy Policy</li>
            <li>Price Policy</li>
            <li>Terms & Conditions</li>
            <li>Cookies Settings</li>
          </ul>
        </div>
      </div>
      <div className="mt-10 text-center">
        <h1 className="text-lg font-semibold mb-3">
          Subcribe to out Newsletter
        </h1>
        <p className="text-sm text-gray-600 max-w-lg mx-auto mt-2">
          Join our herd to gain access to our latest drops, exclusive content,
          perks & more
        </p>
        <form action="#" className="mt-10 flex justify-center">
          <input type="email" placeholder="Email Address" className="h-8 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500" />
          <input type="submit" className="text-sm h-8 px-4 bg-black text-white hover:bg-gray-800" />
        </form>
      </div>
      <div className="text-sm flex justify-center font-semibold uppercase mt-10">
        <h5>© 2025 Layers INC.ALL RIGHTS RESERVED.</h5>
      </div>
    </footer>
  );
};

export default Footer;
