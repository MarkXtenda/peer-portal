import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signupUser } from '../features/user/userSlice';
import background from "../../Peer-Portal.png"
const Signup = () => {

  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigate = useNavigate();

  function handleSignUpSubmit(e) {
    e.preventDefault();
    const userData = {
      username,
      email,
      password,
      password_confirmation: passwordConfirm,
    };
    dispatch(signupUser(userData));
    navigate('/', { replace: true });
  }
  
  return (
    <main className="sign-on-container" style={{background: background}}>
      <form className="sign-on-form" onSubmit={handleSignUpSubmit}>
        <header className="sign-on-header">
          <h4 className="sign-on-title">Create a new account</h4>
        </header>
        <div className="sign-on-body">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} className="form-control" id="username" placeholder="Enter your username" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" id="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" placeholder="Enter your password" />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm password</label>
            <input type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} className="form-control" id="confirm-password" placeholder="Confirm your password" />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Create account</button>
        </div>
        <footer className="sign-on-footer">
          <p className="mb-0">Already have an account?&nbsp;
            <Link className="card-link" to="/login">Log in</Link>
          </p>
        </footer>
      </form>
    </main>
  );
};

export default Signup;
