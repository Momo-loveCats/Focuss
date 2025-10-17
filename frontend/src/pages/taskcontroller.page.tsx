import { useParams } from "react-router-dom";
import NavBar from "../composants/ui/navBar";



const TasksManagerPage = () => {
    const {projectId} = useParams();
    return (
        <>
            <NavBar />
            <p>Nous le projet {projectId} </p>
        </>
    )
}

export default TasksManagerPage;