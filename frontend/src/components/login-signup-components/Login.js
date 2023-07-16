import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/user/userSlice';

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleLoginSubmit(e) {
    e.preventDefault();
    dispatch(loginUser(email, password));
    navigate('/', { replace: true });
  }

  return (
    <main className="sign-on-container">
      <form className="sign-on-form" onSubmit={handleLoginSubmit}>
        <header className="sign-on-header">
          <h4 className="sign-on-title">Sign in to your account</h4>
        </header>
        <div className="sign-on-body">
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
          </div>
          {/* <div className="form-check">
            <input type="checkbox" className="form-check-input" id="remember-me" />
            <label className="form-check-label" htmlFor="remember-me">
              Remember me
            </label>
          </div> */}
          <button type="submit" className="btn btn-primary btn-block">
            Sign in
          </button>
        </div>
        <footer className="sign-on-footer">
          <p className="mb-0">
            Don't have an account?&nbsp;
            <Link className="card-link" to="/signup">
              Sign up
            </Link>
          </p>
        </footer>
      </form>
    </main>
  );
}

export default Login;
