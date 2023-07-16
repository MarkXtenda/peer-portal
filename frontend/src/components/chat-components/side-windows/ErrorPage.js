import React, { useEffect, useState } from 'react'
import "./ErrorBox.css";
import { useDispatch, useSelector } from 'react-redux';
import { errorsStateSelector } from '../../features/errors/errorsSelector';
import { clearErrors } from '../../features/errors/errorsSlice';

function ErrorPage() {
    const errors = useSelector(errorsStateSelector)
    const dispatch = useDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
          if (errors.length > 0) {
            dispatch(clearErrors());
          }
        }, 2500);
    
        return () => {
          clearInterval(interval);
        };
      }, [dispatch, errors]);

    return(
        <div className='error-box'>
            {errors.length > 0 ? errors.map((error, index)=><div key={index} className='error-block'><label>{error}</label></div>) : null}
            </div>
    )
}

export default ErrorPage