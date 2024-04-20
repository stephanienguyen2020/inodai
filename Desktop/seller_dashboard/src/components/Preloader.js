
import React from 'react';
import { Image } from '@themesberg/react-bootstrap';

import VB_Dark from "../assets/img/technologies/vb_dark.png";

export default (props) => {

  const { show } = props;

  return (
    <div className={`preloader bg-soft flex-column justify-content-center align-items-center ${show ? "" : "show"}`}>
      <Image className="loader-element animate__animated animate__jackInTheBox" src={VB_Dark} height={40} />
    </div>
  );
};
