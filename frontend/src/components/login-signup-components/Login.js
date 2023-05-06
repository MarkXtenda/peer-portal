import React, {useState} from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/user/userSlice';

function Login() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([])
  const navigate = useNavigate();

  function HandleSubmit(e) {
    e.preventDefault()
    dispatch(loginUser(email, password))
    navigate("/", { replace: true })
  }
  return (
    <main className="container-fluid bg d-flex justify-content-center align-items-center">
      <form className="card" onSubmit={HandleSubmit}>
        <header className="card-header">
          <h4 className="card-title">Sign in to your account</h4>
        </header>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="password" placeholder="Password" />
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
