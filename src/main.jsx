import React from 'react';
import ReactDOM from 'react-dom/client';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Login from './pages/login/login';
import Home from './pages/home/home';

import './index.css';
import App from './App';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "home",
    element: <Home />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
