import React from "react";

const Action = props =>{
    return(
        <div className="Action">
            <p><span>Action ID:</span> {props.actionId}</p>
            <p><span>Action Description:</span> {props.actionDesc}</p>
            <p><span>Action Notes:</span> {props.actionNotes}</p>
        </div>
    )
}

export default Action;