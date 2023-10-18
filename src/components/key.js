import React from "react";
import '../stylesheets/key.css';
function Key(props) {

    const typeOfKey = value => {
      if(value === "="){
        return "equal";
      }
      else if(value === "AC"){
        return "ac";
      }
      else if(isNaN(value) &&value !== "."){
        return "operator";
      }
      else if(value === "0"){
        return "zero";
      }
    };
  
    return (
      <div
        className={`botton ${typeOfKey(props.children)}`.trimEnd()} onClick={() => props.manageClick(props.children)}>
       < h2 id="content">{props.children}</h2> 
      </div>
    );
  }

  export default Key;