import { useState } from 'react';
import { Link } from 'react-router-dom';
import Signup from './Register';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../CSS files/Login.css';
const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        try {
            const { data } = await axios.post('/login', {
                email,
                password
            })
            if (data.error) {
                toast.error(data.error)
            } else {
                setData({});
                toast.success("Login Successful");
                navigate("/total_contacts");
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
                <div className="left_aside">
                    <img src="/Images/img.png" alt="img" />
                </div>
                <div className="center">
                    <img src="/Images/Logo.png" alt="Logo" width="50px" height="50px" />
                    <div className="signup_page">
                        <p>Enter Your credentials to access your account</p>
                        <form onSubmit={loginUser}>
                            <input
                                type="email"
                                name="email"
                                placeholder="User ID"
                                value={data.email}
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={data.password}
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                            />
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: '#7D8CC4',
                                    marginTop: '30px',
                                    height: '28px'
                                }}
                            > Sign In </button>
                        </form>
                        <p className="text"><Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }} element={<Signup />}>Sign up</Link></p>
                    </div>
                </div>
                <div className="right_aside"><img src="/Images/img.png" alt="img" /></div>
            </div>
        </div>
    )
}
export default Login;