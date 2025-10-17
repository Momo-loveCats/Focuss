import useProject from "../../hooks/project.hook";
import AddProject from './cardAdd';
import CardProject from "./cardProject";
import styles from "./../../styles/dashboard.module.css"


const Dashboard = () => {
    const {projects, addProject, deleteProjects, changeProjects} = useProject();


    return (
        <div className={styles.dashboard}>
           <AddProject onAdd={addProject}/>
           {projects.map((project) => (
            <CardProject key={project.project.id} project={project} onChangeProjects={changeProjects} onDeleteProjects={deleteProjects}/>
           ))}
        </div>
    )
}

export default Dashboard;