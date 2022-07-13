import React from "react";

import "components/Button.scss";
import { action } from "@storybook/addon-actions";

export default function Button(props) {
   let buttonClass = "button";

   if (props.confirm) {
      buttonClass += " button--confirm";
   };

   if (props.danger) {
      buttonClass += " button--danger";
   };

 
   return (
      <button 
         onClick={props.onClick} 
         disabled={props.disabled} 
         className={buttonClass}
      >
         {props.children}
      </button>
   );

}
