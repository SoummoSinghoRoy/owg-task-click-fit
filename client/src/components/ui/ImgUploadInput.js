import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImgUploadInput = () => {
  const token = localStorage.getItem('auth_token');
  const [imgUpload, setImgUpload] = useState({});
  const [uploadResult, setUploadResult] = useState('');
  const changeHandler = (event) => {
    setImgUpload((imgUpload) => ({
      ...imgUpload,
      [event.target.name]: event.target.files[0]
    }))
  }
  const submitHandler = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/api/image/upload', imgUpload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'auth_token': token
      }
    }).then((response) => {
      console.log(response.data);
      setUploadResult(response.data.message);
      setImgUpload({})
      event.target.reset()
      window.location.reload();
    }).catch((err) => {
      console.log(err.response);
      setUploadResult(err.response.data.message)
      event.target.reset()
    })
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      setUploadResult('')
    }, 15000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className='card mt-2'>
      <div className='card-header'>
        <h5>Select image</h5>
      </div>
      <div className='card-body'>
        <form onSubmit={submitHandler}>
          <div className='mb-3'>
            <label htmlFor='demoImg'>Attach a image</label>
            <input 
              type='file'
              className='form-control'
              name='demoImg'
              id='demoImg'
              onChange= {changeHandler} 
            />
            {
              uploadResult !== '' && <div className="d-block">
                <p className='text-secondary fw-semibold'>{uploadResult}</p>
              </div>
            }
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default ImgUploadInput;