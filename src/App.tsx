
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import BrandPage from "./brands/pages/BrandPage";
// import BrandList from "./brands/pages/BrandListPage";
// import AddEditBrand from "./brands/pages/AddBrandPage";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<BrandPage />} />
//         <Route path="/brands" element={<BrandList />} />
//         <Route path="/brand/add" element={<AddEditBrand />} />
//         <Route path="/brand/edit/:id" element={<AddEditBrand />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from "./products/pages/ProductListPage";
import AddProduct from "./products/pages/AddProduct";
import EditProduct from "./products/pages/EditProduct";
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<ProductPage />} />
        <Route path="/product/new" element={<AddProduct />} />
        <Route path="/product/:id/edit" element={<EditProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
