import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div id="page-404">
    <div className="content">
      <div className="title-on-desktop">
        <svg style={{width: "600px", height: "200px"}} alignmentBaseline="middle">
          <defs>
            <clipPath id="clip2">
              <path d="M 0 0 L 600 0 L 600 80 L 0 80 L 0 0 L 0 125 L 600 125 L 600 200 L 0 200 Z" />
            </clipPath>
          </defs>
          <text x="300" y="190" style={{width: "600px", height: "200px"}} textAnchor="middle" fontFamily="Lato" fontWeight="700" fontSize="250" fill="#505458" clipPath="url(#clip2)">4<tspan fill="#35b8e0">0</tspan>4</text>
        </svg>
        <div className="title">PAGE NOT FOUND</div>
      </div>
      <h1 className="title-on-mobile">Error 404: Page not found</h1>

          <button className="btn btn-info"><Link to="/home">
            Return home 
          </Link></button>
      
    </div>
  </div>
  
  
    );
};

export default NotFound;
