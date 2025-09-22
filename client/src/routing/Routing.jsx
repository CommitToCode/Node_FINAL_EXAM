import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer";
import NotFound from "../components/NotFound";
import AllProducts from "../pages/AllProducts";
import View from "../pages/View";

const Routing = () => {
  return (
    <BrowserRouter>
      {/* <Navbar/> */}
      <div style={{ paddingBottom: "60px" }}>
        {" "}
        <Routes>
          <Route path="/" element={<AllProducts />} />
          <Route path="/products/:id" element={<View />} />

          {/* all else route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default Routing;
