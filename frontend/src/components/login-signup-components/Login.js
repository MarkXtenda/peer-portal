import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <main className="container-fluid bg d-flex justify-content-center align-items-center">
      <form className="card">
        <header className="card-header">
          <h4 className="card-title">Sign in to your account</h4>
        </header>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Password" />
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="remember-me" />
            <label className="form-check-label" htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="btn btn-primary btn-block">Sign in</button>
        </div>
        <footer className="card-footer">
          <p className="mb-0">Don't have an account? 
          <a href="/discord-clone/signup" className="card-link">Sign up</a>
          </p>
        </footer>
      </form>
    </main>
  );
};

export default Login;
