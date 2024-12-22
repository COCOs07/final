import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import { database, ref, get } from '../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';

const Login_form = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            navigate('/home');
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const userRef = ref(database, 'users/' + formData.email.replace('.', '_'));
        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                // In a real application, you'd compare the password here
                localStorage.setItem('isLoggedIn', true);
                Swal.fire('Welcome back!', `${userData.firstname} ${userData.lastname}`, 'success');
                navigate('/home');
            } else {
                Swal.fire('Error', 'User not found. Please check your email or sign up.', 'error');
            }
        }).catch((error) => {
            Swal.fire('Error', error.message, 'error');
        });
    };

    return (
        <StyledWrapper>
      
          <div className='container'>
            <form className="form" onSubmit={handleSubmit}>        
            <h4>เข้าสู่ระบบ</h4>
                <div className="flex-column">
                    <label>อีเมล</label>
                </div>
                <div className="inputForm">
                    <input
                        placeholder="Enter your Email"
                        className="input"
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex-column">
                    <label>รหัสผ่าน </label>
                </div>
                <div className="inputForm">
                    <input
                        placeholder="Enter your Password"
                        className="input"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="button-submit">ตกลง</button>
                <p className="p line">หรือ</p>
                <div className="flex-row">
                  <></>
                    <button className="btn google">
                        Google
                    </button>
                    <button className="btn apple">
                        Apple
                    </button>
                </div>
            </form>

            <div className="signup-box">
                    <h2>Welcome</h2>
                    <p>ยินดีต้อนรับสู้การเข้าใช้งานเว็บไซต์ สำหรับระบบตรวจจับและแจ้งเตือนเด็กตกหล่นบนรถตู้</p> 
                    <p className="signin" onClick={() => navigate('/signup')}>หากยังไม่มีบัญชี </p>
                    <button className="signup-button" onClick={() => navigate('/signup')}>สมัครใช้งาน</button>
                </div>
                
            </div>

        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
 * {
  backdrop-filter: blur(20px);
  padding: 0px;
  margin: 0px;
  border-radius: 30px;
}

  .container {
    display: flex;
    gap: 10px;
    height: 550px;
    border-radius: 30px;
    border:3px solid rgba(255,255,255, 0.3) ;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    position: relative; /* กำหนดให้ container เป็นตำแหน่งอ้างอิง */
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    padding: 30px;
    width: 400px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  h4 {
    text-align: center; /* กำหนดให้อยู่กึ่งกลาง */
    font-size: 22px; /* ขนาดของฟอนต์ */
    font-weight: bold; /* ตัวหนา */
    color: #FFF; /* สีฟอนต์ */
    margin-bottom: 20px; /* เพิ่มระยะห่างด้านล่าง */
  }

  ::placeholder {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .form button {
    align-self: flex-end;
    z-index: 1;
  }

  .flex-column > label {
    color: white;
    font-weight: 600;
  }

.inputForm {
    border: none; /* ลบเส้นขอบ */
    border-radius: 10px; /* มุมโค้ง */
    height: 50px;
    display: flex;
    align-items: center;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.4); /* เพิ่มเส้นขอบแบบบาง */
    transition: all 0.2s ease-in-out;
    padding-left: 15px; /* เพิ่มระยะห่างด้านซ้าย */
    backdrop-filter: blur(20px);
    outline: none;
}

.input {
    border: none; /* ลบเส้นขอบ */
    width: 100%;
    height: 100%;
    border-radius: 10px; /* มุมโค้ง */
    background-color: transparent; /* สีพื้นหลังโปร่งใส */
    font-size: 16px;
    color: white; /* เปลี่ยนข้อความเป็นสีขาว */
    backdrop-filter: blur(20px);
    padding-left: 15px; /* เพิ่มระยะห่างด้านซ้าย */
    
}

::placeholder {
    color: rgba(255, 255, 255, 0.7); /* สีของ placeholder เป็นสีขาวแบบโปร่งแสง */
    font-size: 14px; /* ขนาดตัวอักษรของ placeholder */
}

.inputForm:focus-within {
    backdrop-filter: blur(40px);
}


  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
  }

  .flex-row > div > label {
    font-size: 14px;
    color: black;
    font-weight: 400;
  }

  .span {
    font-size: 14px;
    margin-left: 5px;
    color: #2d79f3;
    font-weight: 500;
    cursor: pointer;
  }

  .button-submit {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    border: none;
    box-shadow: 0 5px 10px rgba(0,0,0,0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    gap: 10px;
    background-color: #441752;
    cursor: pointer;
    transition: 0.2s;
    color: white;
  }

  .button-submit:hover {
  background-color: #1B1833;
  box-shadow: 0 5px 10px rgba(0,0,0,0.2);
  }

  .p {
    text-align: center;
    color: black;
    font-size: 14px;
    margin: 5px 0;
    
  }

  .btn {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    gap: 10px;
    border: 1px solid none;
    box-shadow: 0 5px 10px rgba(0,0,0,0.2);
    background-color: #441752;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    color: white;
  }

  .btn:hover {
    background-color: #1B1833;
    box-shadow: 0 5px 10px rgba(0,0,0,0.2);
  }

  .signup-box {
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(40px);
    border-radius: 30% 5% 5% 30%;
    transition: border-radius 0.3s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 60px;
    width: 450px;
    text-align: center;
    color: #333;
}

.signup-box h2, 
.signup-box p {
    color: #fff; /* สีของฟอนต์ */
    margin: 10px 0; /* ระยะห่างด้านบนและล่าง */
    background: none; /* ลบพื้นหลัง */
    backdrop-filter: none; /* ลบเบลอ */
}

  .signup-button {
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    transition: .2s;
    box-shadow: 0 5px 10px rgba(0,0,0,0.2);
    background-color: #640D5F;
    
  }

  .signup-button:hover {
    background-color: #441752;
  }

  .p.line {
    text-align: center; /* จัดข้อความให้อยู่กึ่งกลาง */
    color: white; /* สีของข้อความ */
    font-size: 14px; /* ขนาดฟอนต์ */
    margin: 15px 0; /* เพิ่มระยะห่างด้านบนและล่าง */
    position: relative; /* ใช้สำหรับวางเส้นคั่น */
}

.p.line::before, .p.line::after {
    content: ''; /* ไม่มีเนื้อหา */
    position: absolute;
    top: 50%; /* จัดเส้นให้กึ่งกลางข้อความ */
    width: 40%; /* ความยาวของเส้น */
    height: 1px; /* ความหนาของเส้น */
    background-color: #ccc; /* สีของเส้น */
}

.p.line::before {
    left: 0; /* เส้นทางด้านซ้าย */
}

.p.line::after {
    right: 0; /* เส้นทางด้านขวา */
}


`;

export default Login_form;
