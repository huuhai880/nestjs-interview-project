import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '@/pages/Login';
import NotFound from '@/shared/Errors/NotFound';
import Product from '@/pages/Product';


export default function AuthRouter() {
  return (
    <Routes>
      <Route element={<Product />} path="/" />
      <Route element={<Login />} path="/login" />
      <Route element={<Navigate to="/login" replace />} path="/logout" />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}