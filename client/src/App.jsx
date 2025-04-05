import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import RootLayout from "./components/Layout/RootLayout";
import ProductDetail from "./components/product/ProductDetail";
import VendorProducts from "./components/VendorProducts";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/Signup";
import Cart from "./pages/Cart";
import PrivateRoute from "./components/auth/PrivateRoute";

import DashboardLayout from "./components/Layout/DashboardLayout";
import VendorOperations from "./components/admin/VendorOperations";
import ManageVendorProducts from "./components/vendor/ManageVendorProducts";
import AddProduct from "./components/vendor/AddProduct";
import UpdateProduct from "./components/vendor/UpdateProduct";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        style={{ fontSize: "12px" }}
      />
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route exact index element={<Home />} />
          <Route exact path="/product/:productId" element={<ProductDetail />} />
          <Route exact path="/vendor/:vendorId" element={<VendorProducts />} />
          <Route exact path="sign-in" element={<SignIn />} />
          <Route exact path="sign-up" element={<SignUp />} />

          {/* Customer login required */}
          <Route element={<PrivateRoute role="customer" />}>
            <Route exact path="/cart" element={<Cart />} />
          </Route>
        </Route>

        {/* Admin Routes only */}
        <Route path="/admin" element={<PrivateRoute role="admin" />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<h2>Admin Dashboard</h2>} />
            <Route path="vendors" element={<VendorOperations />} />
          </Route>
        </Route>

        {/* Vendor Routes only */}
        <Route path="/vendor" element={<PrivateRoute role="vendor" />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<h2>Vendor Dashboard</h2>} />
            <Route path="/vendor/product" element={<AddProduct />} />
            <Route path="/vendor/product/:productId/edit" element={<UpdateProduct />} />
            <Route path="products" element={<ManageVendorProducts />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
