import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <main className="sign-on-container">
      <form className="sign-on-form">
        <header className="sign-on-header">
          <h4 className="sign-on-title">Create a new account</h4>
        </header>
        <div className="sign-on-body">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" id="username" placeholder="Enter your username" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter your password" />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm password</label>
            <input type="password" className="form-control" id="confirm-password" placeholder="Confirm your password" />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Create account</button>
        </div>
        <footer className="sign-on-footer">
          <p className="mb-0">Already have an account? 
            <Link className="card-link" to="/login">Sign in</Link>
          </p>
        </footer>
      </form>
    </main>
  );
};

export default Signup;
