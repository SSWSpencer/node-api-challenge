import React, {useState} from "react";
import axios from "axios";

const EditActionForm = () =>{
    const [action, setAction] = useState({
        id: "",
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
        axios.put(`http://localhost:5678/api/actions/${action.id}`, action)
        .then(res=> {
            console.log(res)
            window.location.reload(false);
        })
        .catch(err=> console.log({err}));
    }

    return(
        <div className="Form">
            <h3>Edit an Existing Action</h3>
            <form onSubmit={handleSubmit}>
                <input 
                type="number"
                name="id"
                placeholder="Action ID"
                value={action.id}
                onChange={handleChanges}
                /><br/>
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
                <button>Edit Action</button>
            </form>
        </div>
    )
}

export default EditActionForm;