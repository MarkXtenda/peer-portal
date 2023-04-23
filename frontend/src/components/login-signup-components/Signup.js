import React from 'react';
import './Login.css';

const Signup = () => {
  return (
    <main className="container-fluid bg d-flex justify-content-center align-items-center">
      <form className="card">
        <header className="card-header">
          <h4 className="card-title">Create a new account</h4>
        </header>
        <div className="card-body">
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
        <footer className="card-footer">
          <p className="mb-0">Already have an account? 
          <a href="#" className="card-link">Sign in</a>
          </p>
        </footer>
      </form>
    </main>
  );
};

export default Signup;
