import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '', password: ''
  });
  let [logInError, setLogInError] = useState({});
  const navigate = useNavigate();
  const changeHandler = (event) => {
    setLoginData((loginData) => ({
      ...loginData,
      [event.target.name]: event.target.value
    }))
  };
  const submitHandler = (event) => {
    event.preventDefault()
    axios.post('http://localhost:8000/api/auth/login', loginData).then((response) => {
      localStorage.setItem('authorization', response.data.authorization)
      localStorage.setItem('auth_token', response.data.token)
      navigate("/");
    }).catch((err) => {
      console.log(err.response.data);
      setLogInError(err.response.data.errors);
      setLoginData({
        email: '',
        password: ''
      });
    })
  };
  return (
    <div className='container mt-3'>
      <div className='row'>
        <div className='col-4'></div>
        <div className='col-4'>
          <div className='card'>
            <div className='card-body py-3'>
            <h5 className="card-title">Login</h5>
            <p className="text-lest">Don't have an account? <Link to="/signup" className="card-link">Signup here</Link></p>
              <form onSubmit={submitHandler}>
                <div className='mb-3'>
                  <label htmlFor='email'>Email</label>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    name='email'
                    value={loginData.email}
                    onChange={changeHandler} 
                  />
                  {
                    logInError.email && 
                    <div className='d-block invalid-feedback'>
                      {logInError.email}
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
                    value={loginData.password}
                    onChange={changeHandler} 
                  />
                  {
                    logInError.password && 
                    <div className='d-block invalid-feedback'>
                      { logInError.password }
                    </div>
                  }
                </div>
                <button type="submit" className="btn btn-primary">Log in</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;