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
            <form className="form" onSubmit={handleSubmit}>
                <p className="title">Register </p>
                <p className="message">Signup now and get full access to our app. </p>
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
                <button type="submit" className="submit">Submit</button>
                <p className="signin" onClick={() => navigate('/login')}>Already have an account? <a href="#">Signin</a> </p>
            </form>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 350px;
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;
    position: relative;
  }

  .title {
    font-size: 28px;
    color: royalblue;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
  }

  .title::before,.title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: royalblue;
  }

  .title::before {
    width: 18px;
    height: 18px;
    background-color: royalblue;
  }

  .title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
  }

  .message, .signin {
    color: rgba(88, 87, 87, 0.822);
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
    width: 100%;
    padding: 10px 10px 20px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
  }

  .form label .input + span {
    position: absolute;
    left: 10px;
    top: 15px;
    color: grey;
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
    border: none;
    outline: none;
    background-color: royalblue;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transform: .3s ease;
  }

  .submit:hover {
    background-color: rgb(56, 90, 194);
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