import React, {useState, useEffect} from 'react';
import Navbar from '../layout/Navbar';
import {getInstruments} from './apiCore';
import Card from './Card';


const Home = (req,res) => {
    
    const [instruments, setInstruments] = useState([]);
    const [error, setError] = useState(false);

    const loadInstruments = () => {
        getInstruments().then(data => {
        if (data.error) {
            setError(data.error)
        } else {
            setInstruments(data);
            console.log(data);
        }
        })
}

  useEffect(() => {
    loadInstruments();
  }, [])

  return (
    <div>
      <Navbar/>
      <div className="container">
      <div className="row">
        {instruments.map((instrument, i) => (
          <div key={i} className="col-lg-4 col-md-6 col-sm-6 col-sm-6">
            <Card instrument={instrument} />
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}

export default Home;