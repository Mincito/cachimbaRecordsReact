import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {CartProvider} from './context/CartContext';
import {ProductsProvider} from './context/ProductsContext';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter><ProductsProvider><CartProvider><App /></CartProvider></ProductsProvider></BrowserRouter>
  </React.StrictMode>
);
