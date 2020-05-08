import React from 'react';
import logo from './logo.svg';
import ProjectList from "./components/ProjectList";
import './App.css';
import NewActionForm from "./components/NewActionForm"
import NewProjectForm from "./components/NewProjectForm"
import EditProjectForm from "./components/EditProjectForm"
import EditActionForm from "./components/EditActionForm"

function App() {
  return (
    <div className="App">
      <h1>Projects and Actions </h1>
      <div className="FormWrapper">
        <NewProjectForm />
        <EditProjectForm />
        <NewActionForm />
        <EditActionForm />

      </div>
      <ProjectList />
    </div>
  );
}

export default App;
