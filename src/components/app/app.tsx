import React, { JSX } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Modal } from '../modal/modal';
import { ConstructorPage } from '@pages';
import { AppHeader } from '@components';
import '../../index.css';
import styles from './app.module.css';
import { Feed } from '@pages';
import { Login } from '@pages';
import { Register } from '@pages';
import { ForgotPassword } from '@pages';
import { ResetPassword } from '@pages';
import { Profile } from '@pages';
import { ProfileOrders } from '@pages';
import { NotFound404 } from '@pages';
import { OrderInfo } from '@components';
import { IngredientDetails } from '@components';
import '../../index.css';


// Функция для проверки авторизации (замените на вашу логику)
const isLoggedIn = () => {
  // Например, проверка наличия токена в localStorage
  return localStorage.getItem('token') !== null; 
};

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
        <Route path="feed/:number" element={<Modal title={''} onClose={function (): void {
          throw new Error('Function not implemented.');
        } }><OrderInfo /></Modal>} />
      </Route> {/* Закрываем роут AppLayout */}
      <Route path="/ingredients/:id" element={<Modal title={''} onClose={function (): void {
        throw new Error('Function not implemented.');
      } }><IngredientDetails /></Modal>} />
      <Route path="/login" element={<ProtectedRoute><Login /></ProtectedRoute>} />
      <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
      <Route path="/forgot-password" element={<ProtectedRoute><ForgotPassword /></ProtectedRoute>} />
      <Route path="/reset-password" element={<ProtectedRoute><ResetPassword /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/profile/orders" element={<ProtectedRoute><ProfileOrders /></ProtectedRoute>} />
      <Route path="/profile/orders/:number" element={<ProtectedRoute><Modal title={''} onClose={function (): void {
        throw new Error('Function not implemented.');
      } }><OrderInfo /></Modal></ProtectedRoute>} />
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  </BrowserRouter>
);

export default App;
