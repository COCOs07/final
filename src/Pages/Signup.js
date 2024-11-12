import React from 'react';
import Signup_form from '../Components/Signup_form'
import Nav from '../Components/Nav';

const Signup = () => {
    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Signup_form />
            </div>
        </>
    );
}

export default Signup;
