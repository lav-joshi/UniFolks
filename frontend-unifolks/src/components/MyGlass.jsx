import React from 'react';
import './../styles/MyGlass.modules.css';

const MyGlass = ({ comp }) => {
  return (
    <>
        <div className="blur">{comp}</div>
    </>
  );
};

export default MyGlass;
