import React from 'react'
import { useParams } from 'react-router-dom';

const Gamepage = () => {
  const { id } = useParams();

  return (
     
    <div>Gamepage: {id}</div>
  )
}

export default Gamepage