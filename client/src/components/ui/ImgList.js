import { useState, useEffect } from 'react';
import axios from 'axios';

const ImgList = () => {
  const token = localStorage.getItem('auth_token');
  const [images, setImages] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8000/api/image/fetch', {
      headers: {'auth_token': token}
    }).then((response) => {
      setImages(response.data.images)
    }).catch((err) => {
      console.log(err.response);
    })
  }, []);
  return (
    <div className='card'>
      <div className="card-header">
        <h5>Images</h5>
      </div>
      {
        images.length !== 0 ? (
          <div className='card-body'>
            <div className='row'>
              {
                images.map((image) => (
                  <div className='col-3 my-2' key={image.id}>
                    <img  
                      src={`http://localhost:8000${image.img}`} 
                      alt={`Image ${image.id}`}
                      className='img-fluid'
                      width='200'
                      height='auto'
                    />
                  </div>
                ))
              }
            </div>
          </div>
        ) :(
          <div className='card-body'>
            <h6 className='card-title fw-semibold'>Images not found.</h6>
          </div>
        )
      }
    </div>
  )
}

export default ImgList;