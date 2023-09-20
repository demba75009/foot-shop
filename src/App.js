import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {ProductList,AddProduct} from './feature/index';

function App() {
  return (
    <Router>

      <Routes>

      <Route  path="/" element={<ProductList/>} />
      <Route  path="/add" element={<AddProduct/>} />

        
      </Routes>      
    </Router>
  );
}

export default App;
