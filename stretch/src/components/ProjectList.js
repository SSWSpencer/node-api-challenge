import React, {useState, useEffect} from "react";
import axios from "axios";

const ProjectList = () =>{
    let [projects] = useState([]);
    useEffect(()=>{
        projects = [];
        let allLooped = false;
        let count = 1;
        while(!allLooped){
            axios.get(`http://localhost:5678/api/projects/${count}`)
            .then(res=>{
                projects.push(res);
                count++;
                console.log(projects);
            })
            .catch(err=>{
                allLooped = true;
            })
        }
    },[])

    return(
        <div></div>
    )
}

export default ProjectList;