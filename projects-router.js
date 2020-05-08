const express = require("express");
const Projects = require("./data/helpers/projectModel.js");

const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
    res.status(200).json({message: "Projects Router Working!"})
})

router.get("/all", (req, res)=>{
    Projects.getAllProjects()
    .then(projects=>{
        res.status(200).json(projects)
    })
})

router.get("/:id", validateProjectId, (req, res)=>{
    Projects.get(req.params.id)
        .then(project=>{
            res.status(200).json(project)
        })
        .catch(err=>{
            res.status(500).json({error: "could not find project"})
        })
})

router.post('/', validateProject, (req, res) =>{
    let newProject = {};
    if(req.body.completed){
         newProject = {
            name: req.body.name,
            description: req.body.description,
            completed: req.body.completed,
        }
    }
    else{
         newProject = {
            name: req.body.name,
            description: req.body.description,
            completed: false,
        }
    }
    Projects.insert(newProject)
    .then(project=>{
        res.status(200).json(project)
    })
    .catch(err=>{
        res.status(500).json({error: "could not save the new project"})
    })
})

router.put('/:id', validateProjectId, validateProject, (req, res)=>{
    let newProject = {};
    if(req.body.completed){
         newProject = {
            name: req.body.name,
            description: req.body.description,
            completed: req.body.completed,
        }
    }
    else{
         newProject = {
            name: req.body.name,
            description: req.body.description,
            completed: false,
        }
    }
    Projects.update(req.params.id, newProject)
    .then(project=>{
        res.status(200).json(project)
    })
    .catch(err=>{
        res.status(500).json({error: "could not update the project"})
    })
})

router.delete("/:id", validateProjectId, (req, res) => {
    Projects.remove(req.params.id)
    .then(project=>{
        res.status(200).json(project)
    })
    .catch(err=>{
        res.status(500).json({error: "Could not delete the project"});
    })
})

router.get("/:id/actions", validateProjectId, (req, res)=>{
    Projects.getProjectActions(req.params.id)
    .then(projects=>{
        res.status(200).json(projects)
    })
    .catch(err=>{
        res.status(500).json({error: "Could not get the actions for the project"})
    })
})

function validateProjectId(req, res, next) {
    Projects.get(req.params.id)
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

  function validateProject(req, res, next){
      if(!req.body.name || !req.body.description){
          res.status(400).json({error: "please provide a name an a body for the project"})
      }
      else{
          next();
      }
  }

module.exports = router;