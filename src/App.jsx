import Home from './pages/Home';
import Shop from './pages/shop/Shop';
import ProductList from './pages/shop/ProductList';
import Product from './pages/shop/Product';
import Cart from './pages/shop/Cart';
import Billing from './pages/billing/Billing';
import CustomerInfo from './pages/billing/CustomerInfo';
import Checkout from './pages/billing/Checkout';
import Invoice from './pages/billing/Invoice';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />}>
          <Route path="/shop/products/:category" element={<ProductList />} />
          <Route path="/shop/products/" element={<ProductList />} />
          <Route path="/shop/product/:id" element={<Product />} />
          <Route path="/shop/cart" element={<Cart />} />
        </Route>
        <Route path="/billing" element={<Billing />}>
          <Route path="/billing/customer_info" element={<CustomerInfo />} />
          <Route path="/billing/checkout" element={<Checkout />} />
          <Route path="/billing/invoice" element={<Invoice />} />
        </Route>
      </Routes>
    </Router>
  );

};

export default App;



