import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Landing = () => {

    const handleBegin = () => {
        Navigate("/filters");
  };


    return(
        <>
            <h1>Bestow</h1>
            <h4>Bestow AI BeginUnlock the perfect gift for every 
            personality with our AI-powered 
            shopping companion – thoughtful, 
            personalized, and just one click 
            away!</h4>
        </>
    )
};

export default Landing;