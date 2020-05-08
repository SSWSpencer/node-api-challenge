import React, {useState} from "react";
import axios from "axios";

const NewActionForm = () =>{
    const [action, setAction] = useState({
        project_id: "",
        description: "",
        notes: "",
        completed: false,
    });

    const handleChanges = e =>{
        setAction({
            ...action,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e =>{
        e.preventDefault();
        axios.post("http://localhost:5678/api/actions", action)
        .then(res=> {
            console.log(res)
            window.location.reload(false);
        })
        .catch(err=> console.log({err}));
    }

    return(
        <div className="Form">
            <h3>Add a New Action</h3>
            <form onSubmit={handleSubmit}>
                <input 
                type="number"
                name="project_id"
                placeholder="Project ID"
                value={action.project_id}
                onChange={handleChanges}
                /><br/>
                <input 
                type="text"
                name="description"
                placeholder="Action Description"
                value={action.description}
                onChange={handleChanges}
                /><br/>
                <input 
                type="text"
                name="notes"
                placeholder="Action Notes"
                value={action.notes}
                onChange={handleChanges}
                /><br/>
                <button>Add New Action</button>
            </form>
        </div>
    )
}

export default NewActionForm;