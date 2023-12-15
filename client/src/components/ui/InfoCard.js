import { useState, useEffect } from 'react';
import axios from 'axios';

const InfoCard = () => {
  const [info, setInfo] = useState({});
  useEffect(() => {
    try {
      const fetchInfo = async () => {
        const response = await axios.get('http://numbersapi.com/1/30/date?json')
        setInfo(response.data)
      }
      fetchInfo()
    } catch (error) {
      console.log(error.response.data);
    }
  }, []);
  return (
    <div className='card'>
      <div className="card-header">
        <h5>Info</h5>
      </div>
      {
        Object.keys(info).length === 0 ? (
          <div className="card-body">
            <h6 className='card-title fw-semibold'>Data not found.</h6>
          </div>
        ) : (
          <div className='card-body'>
            <h6 className='card-title fw-semibold'>{info.year}</h6>
            <p className='card-text'>{info.text}</p>
          </div>
        )
      }
  </div>
  )
}

export default InfoCard;