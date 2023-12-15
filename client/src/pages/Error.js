import React from 'react';
import errorImg from '../error.png';

const Error = () => {
	return(
		<div className='container'>
      <div className='row'>
        <div className='col-12'>
          <div className='my-3'>
            <img src= {errorImg} alt='Error' className='img-fluid mx-auto d-block' width='300' height='auto'/>
            <h2 className='text-center'>404 Page not found!</h2>
          </div>
        </div>
      </div>
		</div>
	)
}

export default Error;