import React, {lazy, Suspense, useState, useEffect} from 'react';
import logo from './logo.svg';
import { Navigate, Route, Routes } from 'react-router';
import {ErrorBoundary} from 'react-error-boundary'
import Login from './components/login-signup-components/Login';
import UserPage from './components/chat-components/UserPage';
import './App.css';
import Signup from './components/login-signup-components/Signup';
import { useSelector, useDispatch } from 'react-redux';
import { userIsLoggedInSelector, userDataSelector } from './components/features/user/userSelector';
// rfce 
function App() {
  const userDataState = useSelector(userDataSelector)
  const LoggedInState = useSelector(userIsLoggedInSelector)
  const state = useSelector((state)=>state)
  const ErrorFallback=({error,resetErrorBoundary})=>{
    console.log(error)
    return (<>
        <img src='https://i.imgur.com/lKJiT77.png'/>
        <h1>Sorry this page is broken</h1>
        
        <button onClick={resetErrorBoundary}>Try again</button>
    </>)
  }
  
  if (!LoggedInState) {
    // if location is signup return Signup component
    // else
    return(<Login/>);
  }
  return (
    <div className="App">
      <main>
        {/* {!user && <Navigate to='/login'/>} */}
        {/* {user && <Navigate from="/" to="/channels" />} */}
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<UserPage/>}>
              {/* <Route path="@me" element={<Homepage />}/> */}
            </Route>
          </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;
