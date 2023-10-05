import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {ProductList,AddProduct,ProductDetail} from './feature/index';
import TheHeader from './components/theHeader/theHeader';
function App() {
  return (
    <Router>
      <TheHeader />

      <Routes>

      <Route  path="/" element={<ProductList/>} />
      <Route  path="/Product/:id" element={<ProductDetail/>} />
      <Route  path="/add" element={<AddProduct/>} />

        
      </Routes>      
    </Router>
  );
}

export default App;
