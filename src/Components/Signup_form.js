import React, { useState } from 'react';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import { database, ref, set } from '../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';

const Signup_form = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            Swal.fire('Error', 'Passwords do not match!', 'error');
            return;
        }

        const userRef = ref(database, 'users/' + formData.email.replace('.', '_'));
        set(userRef, {
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
        }).then(() => {
            Swal.fire('Success', 'Registration successful!', 'success');
            navigate('/login');
        }).catch((error) => {
            Swal.fire('Error', error.message, 'error');
        });
    };

    return (
        <StyledWrapper>
            <div className='container'>
            <form className="form" onSubmit={handleSubmit}>
                <p className="title">ลงทะเบียน </p>
                <p className="message">ลงทะเบียนเพื่อเข้าใช้งานเว็บไซต์ </p>
                <div className="flex">
                    <label>
                        <input
                            required
                            type="text"
                            className="input"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleInputChange}
                        />
                        <span>Firstname</span>
                    </label>
                    <label>
                        <input
                            required
                            type="text"
                            className="input"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleInputChange}
                        />
                        <span>Lastname</span>
                    </label>
                </div>
                <label>
                    <input
                        required
                        type="email"
                        className="input"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <span>Email</span>
                </label>
                <label>
                    <input
                        required
                        type="password"
                        className="input"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <span>Password</span>
                </label>
                <label>
                    <input
                        required
                        type="password"
                        className="input"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                    <span>Confirm password</span>
                </label>
                <button type="submit" className="submit">ลงทะเบียน</button>
            </form>
            <div className="signup-box">
                    <h2>Welcome</h2>
                    <p>ยินดีต้อนรับสู้การลงทะเบียนเว็บไซต์ เพื่อเข้าใช้งานตัวระบบตรวจจับและแจ้งเตือนเด็กตกหล่นบนรถตู้แบบเต็มรูปแบบ</p> 
                    <p className="signin" onClick={() => navigate('/login')}>มีบัญชีอยู่แล้วหรือไม่?</p>
                    <button className="signup-button" onClick={() => navigate('/login')}>เข้าสู่ระบบ</button>
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
    gap: 60px;
    height: 550px;
    border-radius: 30px;
    border:3px solid rgba(255,255,255, 0.3) ;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    position: relative; /* กำหนดให้ container เป็นตำแหน่งอ้างอิง */

    }
    
  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 350px;
    padding: 25px;
    border-radius: 20px;
    position: relative;
    border: none;
    padding-left: 45px;
    padding-right: 5px;
  }
  .title {
    font-size: 28px;
    color: white;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    padding-left: 90px;
    align-items: center;
  }

  .title::before,.title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: #FFE6E6;
  }

  .title::before {
    width: 18px;
    height: 18px;
    background-color: #AD88C6;
  }

  .title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
  }

  .message, .signin {
    color: white;
    font-size: 14px;
  }

  .signin {
    text-align: center;
  }

  .signin a {
    color: royalblue;
  }

  .signin a:hover {
    text-decoration: underline royalblue;
  }

  .flex {
    display: flex;
    width: 100%;
    gap: 6px;
  }

  .form label {
    position: relative;
  }

  .form label .input {
    width: 100%; /* ทำให้ input ขยายเต็มพื้นที่ฟอร์ม */
    padding: 10px;
    height: 50px; /* กำหนดความสูงให้ดูสวยงาม */
    outline: none;
    border: 1px solid grey;
    border-radius: 10px;
    background-color: transparent;
    box-sizing: border-box; /* ให้ padding รวมอยู่ใน width */
}
  .form label .input + span {
    position: absolute;
    left: 10px;
    top: 15px;
    color: white;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }

  .form label .input:placeholder-shown + span {
    top: 15px;
    font-size: 0.9em;
  }

  .form label .input:focus + span,.form label .input:valid + span {
    top: 30px;
    font-size: 0.7em;
    font-weight: 600;
  }

  .form label .input:valid + span {
    color: green;
  }

  .submit {
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

  .submit:hover {
  background-color: #1B1833;
  box-shadow: 0 5px 10px rgba(0,0,0,0.2);
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }

    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }`;

export default Signup_form;