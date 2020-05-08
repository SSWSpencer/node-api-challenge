import React, {useState} from "react";
import axios from "axios";

const EditProjectForm = () =>{
    const [project, setProject] = useState({
        project_id: "",
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
        axios.put(`http://localhost:5678/api/projects/${project.project_id}`, project)
        .then(res=> {
            console.log(res)
            window.location.reload(false);
        })
        .catch(err=> console.log({err}));
    }

    return(
        <div className="Form">
            <h3>Edit an Existing Project</h3>
            <form onSubmit={handleSubmit}>
                <input 
                type="number"
                name="project_id"
                placeholder="Project ID"
                value={project.project_id}
                onChange={handleChanges}
                /><br/>
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
                <button>Edit Project</button>
            </form>
        </div>
    )
}

export default EditProjectForm;