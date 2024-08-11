import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/HomePage';
import AboutUs from '../pages/AboutUs';
import MatrimonialHomePage from '../pages/MatrimonialHomePage';
import MatrimonialProfilePage from '../pages/MatrimonialProfilePage';
import MatrimonialAddFormPage from '../pages/MatrimonialAddFormPage';
import MatrimonialUpdateFormPage from '../pages/MatrimonialUpdateFormPage';
import MatrimonialListPage from '../pages/admin/MatrimonialListPage';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ShippingPage from '../pages/ShippingPage';
import PrivateRoute from '../components/PrivateRoute';
import PaymentPage from '../pages/PaymentPage';
import PlaceOrderPage from '../pages/PlaceOrderPage';
import OrderDetailsPage from '../pages/OrderDetailsPage';
import ProfilePage from '../pages/ProfilePage';
import AdminRoute from '../components/AdminRoute';
import OrderListPage from '../pages/admin/OrderListPage';
import ProductListPage from '../pages/admin/ProductListPage';
import UserListPage from '../pages/admin/UserListPage';
// import CreateProductPage from '../pages/admin/CreateProductPage';
// import UpdateProductPage from '../pages/admin/UpdateProductPage';
import ProductFormPage from '../pages/admin/ProductFormPage';
import UpdateUserFormPage from '../pages/admin/UpdateUserFormPage';
import NotFoundPage from '../pages/NotFoundPage';
import AdminDashboard from '../AdminDashboard';
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import Dashboard from '../pages/admin/Dashboard';
import AdminProfilePage from '../pages/admin/AdminProfilePage';
import AdminListPage from '../pages/admin/AdminListPage';
import ResetPasswordRequestPage from '../pages/ResetPasswordRequestPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import ComingsoonPage from "../pages/ComingsoonPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        path: '/',
        element: <HomePage />
      },
      {
        path: '/aboutUs',
        element: <AboutUs/>
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/register',
        element: <RegisterPage />
      },
      {
        path: '/ComingsoonPage',
        element: <ComingsoonPage />
      },
      {
        path: '/matrimonialProfile/create',
        element: <MatrimonialAddFormPage />
      },
      {
        path: '/matrimonialHomePage',
        element: <MatrimonialHomePage showMyPanel={false}/>
      },
      {
        path: '/matrimonialHomePage/my-panel',
        element: <MatrimonialHomePage showMyPanel={true} />
      },
      {
        path: '/matrimonialProfile/:id',
        element: <MatrimonialProfilePage />
      },
      {
        path: '/matrimonialProfile/update/:id',
        element: <MatrimonialUpdateFormPage />
      },
      // {
      //   path: '/admin/product/create',
      //   element: <ProductFormPage />
      // },
      // {
      //   path: '/admin/product/update/:id',
      //   element: <ProductFormPage />
      // },
      // {
      //   path: '/admin/product-list',
      //   element: <ProductListPage />
      // },
      {
        path: '/product/:id',
        element: <ProductPage />
      },
      {
        path: '/cart',
        element: <CartPage />
      },
      {
        path: '/reset-password',
        element: <ResetPasswordRequestPage />
      },
      {
        path: '/reset-password/:id/:token',
        element: <ResetPasswordPage />
      },
      {
        path: '',
        element: <PrivateRoute />,
        children: [
          {
            path: '/shipping',
            element: <ShippingPage />
          },
          {
            path: '/payment',
            element: <PaymentPage />
          },
          {
            path: '/place-order',
            element: <PlaceOrderPage />
          },
          {
            path: '/order/:id',
            element: <OrderDetailsPage />
          },
          {
            path: '/profile',
            element: <ProfilePage />
          },
        ]
      }
    ]
  },
  {
    path: '/admin/login',
    element: <AdminLoginPage />
  },
  {
    path: '',
    element: <AdminDashboard />,
    children: [
      {
        path: '',
        element: <AdminRoute />,
        children: [
          {
            path: '/admin/dashboard',
            element: <Dashboard />
          },
          {
            path: '/admin/matrimonial-list',
            element: <MatrimonialListPage />
          },
          {
            path: '/admin/order-list',
            element: <OrderListPage />
          },
          {
            path: '/admin/product-list',
            element: <ProductListPage />
          },
          {
            path: '/admin/user-list',
            element: <UserListPage />
          },
          {
            path: '/admin/product/create',
            element: <ProductFormPage />
          },
          {
            path: '/admin/profile',
            element: <AdminProfilePage />
          },
          {
            path: '/admin/admin-list',
            element: <AdminListPage />
          },
          {
            path: '/admin/order/:id',
            element: <OrderDetailsPage />
          },
          {
            path: '/admin/user/update/:id',
            element: <UpdateUserFormPage />
          },
          {
            path: '/admin/product/update/:id',
            element: <ProductFormPage />
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]);
const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
