import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Design from './pages/Design';
import Admin from './pages/Admin';
import About from './pages/About';
import ProductDetailPage from './pages/Products/ProductDetailPage';
import GroupedProductsPage from './pages/Products/GroupedProductsPage';
import Menu from './components/Menu';

const App = () => {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/grouped" element={<GroupedProductsPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/design" element={<Design />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
};

export default App;
