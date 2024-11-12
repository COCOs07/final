// นำเข้า React และฟังก์ชันที่จำเป็น
import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

// นำเข้าคอมโพเนนต์เพจต่างๆ
import Home from "../Pages/Home";
import History from "../Pages/History";
import Statistics from "../Pages/Statistics";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";

// คอมโพเนนต์สำหรับแสดงหน้า 404 เมื่อเส้นทางไม่มีอยู่
const NotFound = () => {
  return <h2>404 - Page Not Found</h2>;
};

// ฟังก์ชันสำหรับตรวจสอบว่าผู้ใช้เข้าสู่ระบบหรือยัง
const isAuthenticated = () => {
  return localStorage.getItem('isLoggedIn') === "true";
};


// ฟังก์ชันสำหรับการป้องกันการเข้าถึงหน้าที่ต้องล็อกอิน
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

// สร้าง router object โดยใช้ `createBrowserRouter`
const router = createBrowserRouter([
  {
    path: "/",
    element: isAuthenticated() ? <Navigate to="/home" /> : <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: isAuthenticated() ? <Navigate to="/home" /> : <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/home",
    element: <ProtectedRoute element={<Home />} />,
  },
  {
    path: "/history",
    element: <ProtectedRoute element={<History />} />,
  },
  {
    path: "/statistics",
    element: <ProtectedRoute element={<Statistics />} />,
  },
  // เส้นทางสำหรับหน้า 404
  {
    path: "*",
    element: <NotFound />,
  },
]);

// สร้าง functional component ชื่อ Routing
const Routing = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

// export คอมโพเนนต์ Routing เพื่อให้ส่วนอื่นๆ ของแอปพลิเคชันสามารถนำไปใช้งานได้
export default Routing;
