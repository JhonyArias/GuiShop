import React, {useState} from 'react';
import './Card.css';
import ShowImage from './ShowImage';

const Card = ({instrument}) => {
    const [count, setCount] = useState(instrument.count)
  
    return (
      <div className="card m-10 card-cont">
        <div className="">
          <ShowImage className="img" item={instrument} url="instrument"/>
          <h2>{instrument.brand}</h2>
          <p>${instrument.price}</p>
          <p>{instrument.description}</p>    
              <button className="btn btn-success">Ver Mas</button>
        </div>
      </div>
    )
  }
  
  export default Card;