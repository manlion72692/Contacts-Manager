import { useState } from 'react';
import "../CSS files/Register.css";
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    
    const navigate = useNavigate();
    const [ data, setData ] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })
    
    const registerUser = async (e) => {
        e.preventDefault();
        const { email, password, confirmPassword } = data
        if(password !== confirmPassword){
            toast.error("Password Doesn't Match");
        }
        try {
            const {data} = await axios.post("/register", {
                email, password, confirmPassword 
            })
            if(data.error){
                toast.error(data.error)
            } else {
                setData({})
                toast.success("Login Successful. Welcome!")
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
             <div className="main">
            <div className="circle1"></div>
            <div className="circle2"></div>
            <div className="container">
                <div className="left_aside"><img src="/Images/img.png" alt="img" /></div>
                <div className="center">
                    <img src="/Images/Logo.png" alt="Logo" width="50px" height="50px" />
                    <div className="signup_page">
                        <p>Create New Account</p>
                        <form onSubmit = { registerUser }>
                            <input
                                type="email"
                                name="email"
                                placeholder="Mail ID"
                                value={ data.email }
                                onChange = {(e) => setData({...data, email: e.target.value})}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={ data.password }
                                onChange = {(e) => setData({...data, password: e.target.value})}
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value= { data.confirmPassword }
                                onChange = {(e) => setData({...data, confirmPassword: e.target.value})}
                            />
                            <button 
                                type="submit"
                                style={{ backgroundColor: '#7D8CC4', height: '28px', marginTop: '30px'}} 
                            > Sign In </button>
                        </form>
                    </div>
                </div>
                <div className="right_aside"><img src="/Images/img.png" alt="img" /></div>
            </div>
        </div>
    )
}

export default Register;