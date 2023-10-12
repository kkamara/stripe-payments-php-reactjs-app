import React, { useEffect, useState, } from 'react'
import { useNavigate, } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
// import { register, } from '../../../redux/actions/authActions'

import "./RegisterComponent.scss";

export default function RegisterComponent() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const dispatch = useDispatch()
  const authState = useSelector(state => (state.auth))

  useEffect(() => {}, [])

  useEffect(() => {
    if (localStorage.getItem("user-token")) {
        return navigate("/");
    }
  }, [authState,])

  if (authState.loading) {
    return <p>Loading...</p>
  }

    const onFormSubmit = (e) => {
        e.preventDefault();

        // dispatch(register({
        //     email,
        //     password,
        // }));

        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
    };

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const onPasswordConfirmationChange = (e) => {
        setPasswordConfirmation(e.target.value);
    };

  return (
    <>
        <div className='container login-container'>
            <div className="col-md-4 offset-md-4">
                <h3 className="lead">Register</h3>
                <form method="post" onSubmit={onFormSubmit}>
                    {authState.error ?
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                            {authState.error}
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div> : null}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            name="email" 
                            className="form-control"
                            value={email}
                            onChange={onEmailChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            name="password" 
                            className="form-control"
                            value={password}
                            onChange={onPasswordChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password_confirmation">Password Confirmation</label>
                        <input 
                            type="password"
                            name="password_confirmation" 
                            className="form-control"
                            value={passwordConfirmation}
                            onChange={onPasswordConfirmationChange}
                        />
                    </div>
                    <a 
                        href="/user/login" 
                        className="btn btn-primary"
                    >
                        Login
                    </a>
                    <input 
                        type="submit" 
                        className="btn btn-success" 
                    />
                </form>
            </div>
        </div>
    </>       
  )
}