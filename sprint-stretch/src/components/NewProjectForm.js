import React, {useState} from "react";
import axios from "axios";

const NewProjectForm = () =>{
    const [project, setProject] = useState({
        name: "",
        description: "",
        completed: false,
    });

    const handleChanges = e =>{
        setProject({
            ...project,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e =>{
        e.preventDefault();
        axios.post("http://localhost:5678/api/projects", project)
        .then(res=> {
            console.log(res)
            window.location.reload(false);
        })
        .catch(err=> console.log({err}));
    }

    return(
        <div className="Form">
            <h3>Add a New Project</h3>
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                name="name"
                placeholder="Project Name"
                value={project.name}
                onChange={handleChanges}
                /><br/>
                <input 
                type="text"
                name="description"
                placeholder="Project Description"
                value={project.description}
                onChange={handleChanges}
                /><br/>
                <button>Add New Project</button>
            </form>
        </div>
    )
}

export default NewProjectForm;