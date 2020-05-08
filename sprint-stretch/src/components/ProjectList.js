import React, {useState, useEffect} from "react";
import axios from "axios";
import Project from "./Project"

const ProjectList = () =>{
    const [projects, setProjects] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:5678/api/projects/all")
        .then(res=>{
            setProjects(res.data)
            console.log(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    
    
    return(
        <div className="ProjectList">
            {
                projects.map(project=>{
                    return <Project key={project.id} desc={project.description} id={project.id} name={project.name} />
                })
            }
        </div>
    )
}

export default ProjectList;