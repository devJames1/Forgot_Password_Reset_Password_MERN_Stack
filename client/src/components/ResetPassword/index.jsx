import React from 'react';
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import styles from "./styles.module.css";


function ResetPassword() {
    const [password, setPassword] = useState();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { _id, token } = useParams();
    console.log({ _id, token })

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = (e) => {
        e.preventDefault();
        setPasswordShown(!passwordShown);
    }

    // axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8080/api/reset-password/${_id}/${token}`, { password })
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/login')
                }
            }).catch(error => {
                if (error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                    setError(error.response.data.message)
                }
            })
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-50">
                <h4>Reset Password</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>New Password</strong>
                        </label>
                        <div className={styles.pwd}>
                            <input
                                type={passwordShown ? "text" : "password"}
                                placeholder="Enter Password"
                                autoComplete="off"
                                name="password"
                                className="form-control rounded-0"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span onClick={togglePassword} className={styles.p_viewer}><img className={styles.pass_img} src={passwordShown ? "/images/open-eye.png" : "/images/closed-eye.png"} alt="show password icon" /></span>
                        </div>
                    </div>
                    {error && <div style={{ marginBottom: "10px" }} className="bg-danger">{error}</div>}
                    <button style={{ backgroundColor: "#3bb19b", color: "white" }} type="submit" className="btn  w-100 rounded-0">
                        Update
                    </button>
                </form>

            </div>
        </div>
    )
}

export default ResetPassword;