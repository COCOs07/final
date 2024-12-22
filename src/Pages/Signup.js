import React from 'react';
import Signup_form from '../Components/Signup_form'
import Nav from '../Components/Nav';

const Signup = () => {
    return (
        <>
            <div style={{ 
                 backgroundImage: `url(${require('../IMG/background.jpg')})`,
                 backgroundSize: 'cover', // ปรับขนาดรูปให้ครอบคลุมพื้นที่ทั้งหมด
                     backgroundPosition: 'center', // จัดรูปให้อยู่กึ่งกลาง
                     backgroundRepeat: 'no-repeat', // ไม่ให้รูปซ้ำ
                     height: '100vh', // ครอบคลุมความสูงทั้งหมดของหน้าจอ
                     margin: 0,
                     padding: 0,
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                 }}>
                <Signup_form />
            </div>
        </>
    );
}

export default Signup;
