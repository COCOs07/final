import React from 'react'
import Login_form from '../Components/Login_form'
import Nav from '../Components/Nav'
function Login() {
    return (
        <>
            <div className='mt-5' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

                <Login_form/>

            </div>
        </>
    )
}

export default Login