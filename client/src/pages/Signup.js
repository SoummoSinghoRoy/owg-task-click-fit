import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = (props) => {
  const [signupData, setSignupData] = useState({
    email: '', password: '', type: ''
  });
  let [signUpError, setSignupError] = useState({});
  const navigate = useNavigate();
  const changeHandler = (event) => {
    setSignupData((signupData) => ({
      ...signupData,
      [event.target.name]: event.target.value
    }))
  };
  const submitHandler = (event) => {
    event.preventDefault()
    axios.post('http://localhost:8000/api/auth/signup', signupData).then((response) => {
      navigate("/login");
    }).catch((err) => {
      console.log(err.response.data);
      setSignupError(err.response.data.errors);
      setSignupData({
        email: '',
        type: '',
        password: ''
      });
    })
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSignupError({})
    }, 15000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className='container mt-3'>
      <div className='row'>
        <div className='col-4'></div>
        <div className='col-4'>
          <div className='card'>
            <div className='card-body py-3'>
            <h5 className="card-title">Signup</h5>
            <p className="text-start">Have an account? <Link to="/login" className="card-link">Login here</Link></p>
              <form onSubmit={submitHandler}>
                <div className='mb-3'>
                  <label htmlFor='email'>Email</label>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    name='email'
                    value={signupData.email}
                    onChange={changeHandler} 
                  />
                  {
                    signUpError.email && 
                    <div className='d-block invalid-feedback'>
                      {signUpError.email}
                    </div>
                  }
                </div>
                <div className='mb-3'>
                  <label htmlFor='type'>Type</label>
                  <input
                    type='text'
                    className='form-control'
                    id='type'
                    name='type'
                    value={signupData.type}
                    onChange={changeHandler} 
                  />
                  {
                    signUpError.type && 
                    <div className='d-block invalid-feedback'>
                      {signUpError.type}
                    </div>
                  }
                </div>
                <div className='mb-3'>
                  <label htmlFor='email'>Password</label>
                  <input
                    type='password'
                    className='form-control'
                    id='password'
                    name='password'
                    value={signupData.password}
                    onChange={changeHandler} 
                  />
                  {
                    signUpError.password && 
                    <div className='d-block invalid-feedback'>
                      { signUpError.password }
                    </div>
                  }
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup;