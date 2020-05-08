import React from "react";
import ActionList from "./ActionList"

const Project = props =>{

    return(
        <div className="ProjectCard">
            <p><span>Name:</span> {props.name}</p>
            <p><span>Description:</span> {props.desc}</p>
            <p><span>Project ID:</span> {props.id}</p>
            <p><span>Actions:</span></p>
            <ActionList id={props.id} />
        </div>
    )
}

export default Project;