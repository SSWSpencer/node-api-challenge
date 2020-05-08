import React, {useState, useEffect} from "react";
import axios from "axios";
import Action from "./Action";

const ActionList = props => {
    const [actions, setActions] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:5678/api/projects/${props.id}/actions`)
        .then(res=>{
            setActions(res.data)
        })
        .catch(err=>{
            console.log(err);
        })
    },[])

    return(
        <div className="ActionWrapper">
            {
                actions.map(action=>{
                    return <Action key={action.id} actionId={action.id} actionDesc={action.description} actionNotes={action.notes} actionCompleted={action.completed}/>
                })
            }
        </div>
    )

}

export default ActionList;