// นำเข้าไฟล์ CSS หลักของแอปพลิเคชัน
import './App.css'; 

// นำเข้าไลบรารี React ซึ่งจำเป็นสำหรับการสร้างคอมโพเนนต์ React
import React from 'react';

// นำเข้า Provider จาก react-redux เพื่อเชื่อมต่อส่วนประกอบต่างๆ กับ Redux store 
import { Provider } from 'react-redux';

// นำเข้าคอมโพเนนต์ Routing ซึ่งน่าจะจัดการเส้นทาง (routes) ภายในแอปพลิเคชัน
import Routing from './Router/Routing';

// นำเข้าไอคอนจาก Bootstrap Icons เพื่อใช้ในแอปพลิเคชัน
import 'bootstrap-icons/font/bootstrap-icons.css';

// สร้างคอมโพเนนต์หลักของแอปพลิเคชัน
function App() {
  // คืนค่า JSX ซึ่งเป็นส่วนประกอบหลักของแอปพลิเคชัน
  return (
    <>
      {/* แสดงผลคอมโพเนนต์ Routing ซึ่งจะจัดการการแสดงผลหน้าต่างๆ ตามเส้นทาง */}
      <Routing/>
    </>
  );
}

// ส่งออกคอมโพเนนต์ App เพื่อให้สามารถนำไปใช้ในส่วนอื่นๆ ของแอปพลิเคชันได้
export default App;