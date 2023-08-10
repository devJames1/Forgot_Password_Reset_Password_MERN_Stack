import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'


function ForgotPassword() {
    const [email, setEmail] = useState()
    const [error, setError] = useState("")

    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/api/forgot-password', { email })
            .then(res => {
                if (res.data.Status === "Success") {
                    alert("Reset link sent to email")
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
                <h4>Forgot Password</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {error && <div style={{ marginBottom: "10px" }} className="bg-danger">{error}</div>}
                    <button style={{ backgroundColor: "#3bb19b", color: "white" }} type="submit" className="btn  w-100 rounded-0">
                        Send
                    </button>
                </form>

            </div>
        </div>
    )
}

export default ForgotPassword;