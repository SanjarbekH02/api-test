import React, { useState } from 'react';
import './Login.css'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [number, setNumber] = useState()
    const [password, setPasword] = useState()
    const navigate = useNavigate()

    const loginFunc= (event) => {
        event.preventDefault(   )
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin", {
            method: "POST",
            body: JSON.stringify({
                phone_number: number,
                password: password,
            }),
    
            headers:{
                "content-type" : "application/json"
            }
        }).then((data) => data.json())
        .then((elem) => {
            
            if(elem?.success === true){
                toast.success(elem?.message)
                localStorage.setItem("tokenItem", elem?.data?.tokens?.accessToken.token)
                navigate("/home")
            }else{
                toast.error(elem?.message)
            }
        })
        .catch((error) => console.log("error chiqdi"))
        
    
    }


    return (
        <div>
            <form onSubmit={loginFunc}  className="form">
                <input onChange={(e) => setNumber(e?.target?.value)} required placeholder='login...' type="text" className="form-input" />
                <input onChange={(e) => setPasword(e?.target?.value)} required placeholder='password...' type="text" className="form-input" />
                <button type='submit' className="form-submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
