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
            <form className="form" onSubmit={handleSubmit}>
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
                <button type="submit" className="button-submit">Sign In</button>
                <p className="p">ยังไม่มีบัญชี ? <span className="span" onClick={() => navigate('/signup')}>ลงทะเบียน</span></p>
                <p className="p line">หรือ</p>
                <div className="flex-row">
                    <button className="btn google">
                        Google
                    </button>
                    <button className="btn apple">
                        Apple
                    </button>
                </div>
            </form>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #FAF6E3;
    padding: 30px;
    width: 450px;
    border-radius: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  ::placeholder {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .form button {
    align-self: flex-end;
  }

  .flex-column > label {
    color: #151717;
    font-weight: 600;
  }

  .inputForm {
    border: 1.5px solid #ecedec;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    transition: 0.2s ease-in-out;
  }

  .input {
    margin-left: 10px;
    border-radius: 10px;
    border: none;
    width: 100%;
    height: 100%;
  }

  .input:focus {
    outline: none;
  }

  .inputForm:focus-within {
    border: 1.5px solid #2d79f3;
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
    margin: 20px 0 10px 0;
    background-color: #151717;
    border: none;
    color: white;
    font-size: 15px;
    font-weight: 500;
    border-radius: 10px;
    height: 50px;
    width: 100%;
    cursor: pointer;
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
    border: 1px solid #ededef;
    background-color: white;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

  .btn:hover {
    border: 1px solid #2d79f3;
  }
`;

export default Login_form;
