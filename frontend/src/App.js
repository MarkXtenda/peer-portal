import React, { Suspense, useState, useEffect} from 'react';
import { Route, Routes } from 'react-router';
import { Navigate } from "react-router-dom";
import {ErrorBoundary} from 'react-error-boundary'
import Login from './components/login-signup-components/Login';
import UserPage from './components/chat-components/UserPage';
import './App.css';
import Signup from './components/login-signup-components/Signup';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router'
import { userIsLoggedInSelector } from './components/features/user/userSelector';
import Loading from './components/features/Loading';
import HomePage from './components/chat-components/HomePage';
import { setErrors } from './components/features/errors/errorsSlice';
import ErrorPage from './components/chat-components/side-windows/ErrorPage';

// rfce 
function App() {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const LoggedInState = useSelector(userIsLoggedInSelector)
  const location = useLocation()
  const path = location.pathname.split('/')[1]
  const channelIdPath = location.pathname.split('/')[2]
  useEffect(() => {
    setIsLoading(true)
    // auto-login
      fetch("/me").then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            dispatch({ type: "user/login", payload: user });
          });
          setIsLoading(false)
        }
        else {
          setIsLoading(false)
          // r.json().then((err)=> dispatch(setErrors(err.error)))
        }
      });
  }, []);

  const ErrorFallback=({error,resetErrorBoundary})=>{
    console.log(error)
    return (
    <>
        <img src='https://i.imgur.com/lKJiT77.png'/>
        <h1>Sorry this page is broken</h1>   
        <button onClick={resetErrorBoundary}>Try again</button>
    </>)
  }

  // if (!LoggedInState && !isLoading) {
  //   if (path === "signup") {
  //     return <Signup/>
  //   }
  //   else {
  //     return(<Login/>);
  //   }
  // }

  if (isLoading) {
    return <Loading/>
  }

  return (
    <div className="App">
      <main>
        {/* {!user && <Navigate to='/login'/>} */}
        {/* {user && <Navigate from="/" to="/channels" />} */}
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<div>Loading...</div>}>
          <ErrorPage />
          <Routes>
            <Route path="/login" element={!LoggedInState ? <Login /> : <Navigate to='/'/>}/>
            <Route path="/signup" element={!LoggedInState ? <Signup /> : <Navigate to='/'/>}/>
            <Route exact path="/" element={LoggedInState ? <HomePage/> : path === "signup" ? <Signup/> : <Login/>}/>
            <Route path="/channels/:id" element={<UserPage channelId={channelIdPath} />}/>
          </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;