import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {ProductList,AddProduct,ProductDetail,Panier,Inscription,Connexion} from './feature/index';
import TheHeader from './components/theHeader/theHeader';
function App() {
  return (
    <Router>
      <TheHeader />

      <Routes>

      <Route  path="/" element={<ProductList/>} />
      <Route  path="/Panier" element={<Panier/>} />
      <Route  path="/Product/:id" element={<ProductDetail/>} />
      <Route  path="/add" element={<AddProduct/>} />
      <Route  path="/signup" element={<Inscription/>} />
      <Route  path="/signin" element={<Connexion/>} />

        
      </Routes>      
    </Router>
  );
}

export default App;
