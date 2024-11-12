// นำเข้าไลบรารี React ซึ่งจำเป็นสำหรับการสร้างส่วนประกอบต่างๆ ในแอปพลิเคชัน
import React from 'react';

// นำเข้าส่วนของ ReactDOM เพื่อใช้ในการแสดงผลส่วนประกอบ React ลงใน DOM
import ReactDOM from 'react-dom/client';

// นำเข้าไฟล์ CSS ที่ชื่อ 'index.css' เพื่อกำหนดสไตล์ให้กับแอปพลิเคชัน

// นำเข้าส่วนประกอบหลักของแอปพลิเคชันที่ชื่อ 'App'
import App from './App';

// นำเข้าไฟล์ CSS ของ Bootstrap เพื่อใช้สไตล์สำเร็จรูปในการออกแบบเว็บไซต์
import 'bootstrap/dist/css/bootstrap.min.css';

// สร้าง "root" ซึ่งเป็นจุดเริ่มต้นในการแสดงผลส่วนประกอบ React ในเว็บเพจ
// โดยจะค้นหา element ที่มี id ว่า 'root' ใน HTML และใช้เป็นตำแหน่งในการแสดงผล
const root = ReactDOM.createRoot(document.getElementById('root'));

// แสดงผลส่วนประกอบ 'App' ลงในตำแหน่งที่ 'root' กำหนดไว้
// โดยครอบด้วย React.StrictMode เพื่อช่วยตรวจสอบปัญหาที่อาจเกิดขึ้นในแอปพลิเคชัน
root.render(
  <React.StrictMode>
    <App /> 
  </React.StrictMode>
);