import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from "./styles.module.css";


const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState("")

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    }

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = (e) => {
        e.preventDefault();
        setPasswordShown(!passwordShown);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/auth";
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("token", res.data);
            window.location = "/"
        } catch (error) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }

    return (
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Login to your Account</h1>
                        <input
                            type="email"
                            placeholder='Email'
                            name='email'
                            value={data.email}
                            required
                            className={styles.input}

                            onChange={handleChange}
                        />
                        <div className={styles.pwd}>
                            <input
                                type={passwordShown ? "text" : "password"}
                                placeholder='Password'
                                name='password'
                                value={data.password}
                                required
                                className={styles.input}

                                onChange={handleChange}
                            />
                            <span onClick={togglePassword} className={styles.p_viewer}><img className={styles.pass_img} src={passwordShown ? "/images/open-eye.png" : "/images/closed-eye.png"} alt="show password icon" /></span>
                        </div>
                        <Link to="/forgot-password">Forgot Password</Link>

                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type='submit' className={styles.green_btn}>
                            Sign In
                        </button>
                    </form>
                </div>
                <div className={styles.right}>
                    <h1>New Here ?</h1>
                    <Link to="/signup">
                        <button type='button' className={styles.white_btn}>
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default Login;