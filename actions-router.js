const express = require("express");
const Actions = require("./data/helpers/actionModel.js");
const Projects = require("./data/helpers/projectModel.js");

const router = express.Router();
router.use(express.json());

router.get('/', (req, res) =>{
    res.status(200).json({message: "Actions Router is Working!"})
})

router.get('/:id', validateActionId, (req, res)=>{
    Actions.get(req.params.id)
    .then(action=>{
        res.status(200).json(action)
    })
    .catch(err=>{
        res.status(500).json({error: "could not get the action with the specified ID"})
    })
})

router.post("/", validateProjectId, validateAction, (req, res) =>{
    let newAction = {};
    if(req.body.completed){
        newAction = {
            project_id: req.body.project_id,
            description: req.body.description,
            notes: req.body.notes,
            completed: req.body.completed
        }
    }
    else{
        newAction = {
            project_id: req.body.project_id,
            description: req.body.description,
            notes: req.body.notes,
            completed: false
        }
    }
    Actions.insert(newAction)
    .then(action=>{
        res.status(201).json(action)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error: "could not create the action"})
    })
})

router.put("/:id", validateActionId, validateProjectId, validateAction, (req, res) =>{
    let newAction = {};
    if(req.body.completed){
        newAction = {
            project_id: req.body.project_id,
            description: req.body.description,
            notes: req.body.notes,
            completed: req.body.completed
        }
    }
    else{
        newAction = {
            project_id: req.body.project_id,
            description: req.body.description,
            notes: req.body.notes,
            completed: false
        }
    }
    Actions.update(req.params.id, newAction)
    .then(action=>{
        res.status(201).json(action)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error: "could not update the action"})
    })
})

router.delete("/:id", validateActionId, (req, res) =>{
    Actions.remove(req.params.id)
    .then(action=>{
        res.status(200).json(action)
    })
    .catch(err=>{
        res.status(500).json({error: "could not remove the specified action"})
    })
})

function validateAction(req, res, next){
    if(!req.body.description || !req.body.notes){
        res.status(400).json({error: "please provide a description and notes for the action"})
    }
    else{
        if(req.body.description.length > 128){
            res.status(400).json({error: "maximum character limit of description (128) is exceeded"})
        }
        else{
            next();
        }
    }
}

function validateActionId(req, res, next) {
    Actions.get(req.params.id)
    .then(action=>{
      if(!action){
        res.status(404).json({error: "the action with the specified id does not exist"})
      }
      else{
        next();
      }
    })
    .catch(err => {
      res.status(500).json({error: "could not find an action with the specified id"})
    })
  }

  function validateProjectId(req, res, next) {
    if(req.body.project_id){
        Projects.get(req.body.project_id)
        .then(project=>{
        if(!project){
            res.status(404).json({error: "the project with the specified id does not exist"})
        }
        else{
            next();
        }
        })
        .catch(err => {
        res.status(500).json({error: "could not find a project with the specified id"})
        })
    }
    else{
        res.status(400).json({error:"please provide a project id for the action"})
    }
}
module.exports = router;