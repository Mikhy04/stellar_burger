import React from 'react';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Modal } from './components/Modal/Modal';
import { ConstructorPage } from '@pages';
import { AppHeader } from '@components';
import '../../index.css';
import styles from './app.module.css';
import Feed from '@pages/Feed';
import Login from '@pages/Login';
import Register from '@pages/Register';
import ForgotPassword from '@pages/ForgotPassword';
import ResetPassword from '@pages/ResetPassword';
import Profile from '@pages/Profile';
import ProfileOrders from '@pages/ProfileOrders';
import NotFound404 from '@pages/NotFound404';
import OrderInfo from './components/OrderInfo/OrderInfo';
import IngredientsDetails from './components/IngredientsDetails/IngredientsDetails';
import { ConstructorPage } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';

// Функция для проверки авторизации (замените на вашу логику)
const isLoggedIn = () => {
  // Например, проверка наличия токена в localStorage
  return localStorage.getItem('token') !== null; 
};

// Компонент защищенного роута
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return isLoggedIn() ? children : <Navigate to="/login" />;
};


//const App = () => (
//  <div className={styles.app}>
//    <AppHeader />
//    <ConstructorPage />
//  </div>
//);

const AppLayout = () => (
  <div className={styles.app}>
    <AppHeader />
    <ConstructorPage />
    <Outlet /> {/* Здесь будет отображаться контент, соответствующий текущему роуту */}
  </div>
);


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AppLayout />} > {/* AppHeader будет общим для "/" и "/feed" */}
        <Route index element={<ConstructorPage />} /> {/* index для "/" внутри AppLayout */}
        <Route path="feed" element={<Feed />} />
        <Route path="feed/:number" element={<Modal><OrderInfo /></Modal>} />
      </Route> {/* Закрываем роут AppLayout */}
      <Route path="/ingredients/:id" element={<Modal><IngredientsDetails /></Modal>} />
      <Route path="/login" element={<ProtectedRoute><Login /></ProtectedRoute>} />
      <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
      <Route path="/forgot-password" element={<ProtectedRoute><ForgotPassword /></ProtectedRoute>} />
      <Route path="/reset-password" element={<ProtectedRoute><ResetPassword /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/profile/orders" element={<ProtectedRoute><ProfileOrders /></ProtectedRoute>} />
      <Route path="/profile/orders/:number" element={<ProtectedRoute><Modal><OrderInfo /></Modal></ProtectedRoute>} />
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  </BrowserRouter>
);

export default App;
