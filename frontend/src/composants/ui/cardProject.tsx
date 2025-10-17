import { useNavigate } from "react-router-dom";
import type { GetProject } from "../../api/services/projectService";
import Card from "./card";
import style from './../../styles/buttonControle.module.css'
import { HiMiniPencilSquare, HiMiniTrash } from "react-icons/hi2";
import Modal from "./modal";
import useModal from "../../hooks/modal.hook";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectSchema, type ProjectAdd } from "../../validations/project.schema";
import { useForm } from "react-hook-form";
import styles from "./../../styles/modal.module.css"

interface CardProjectProps {
    project : GetProject,
    onChangeProjects : (
        id: number,
        name: string,
        description: string
      ) => void,
      onDeleteProjects : (id : number) => void
}

const CardProject = ({project, onChangeProjects, onDeleteProjects} : CardProjectProps) => {
    const navigate = useNavigate();
    const [show, handleClose, handleClick] = useModal();

    const {register, handleSubmit, reset, formState : {errors, isSubmitting}} = useForm<ProjectAdd>({
        resolver : zodResolver(ProjectSchema),
        mode : "onSubmit",
        defaultValues : {
            name : project.project.name,
            description : project.project.description!
        }
    });

    const handleRedirect = () => {
        navigate(`/projects/${project.project.id}`)
    }

    const handleDelete = () => {
        onDeleteProjects(project.project.id!);
    }

    const onSubmit = async (data : ProjectAdd) => {
        await onChangeProjects(project.project.id!,data.name, data.description);
        reset();
        handleClose();
    }

    useEffect(() => {
        if (!show) {
            reset();
        }
    }, [show, reset]);

    return (
        <>
            <Card onClick={handleRedirect}>
                <div >
                    <h2>{project.project.name}</h2>
                    <p>{project.project.description}</p>
                    <p>Role : {project.role}</p>
                </div>
                {project.role === "admin" && <div className={style.btnControl}>
                    <button type="button" className={style.change} onClick={(e) =>{e.stopPropagation();handleClick()}}> <HiMiniPencilSquare size={22}/></button>
                    <button type="button" className={style.delete} onClick={(e) =>{e.stopPropagation();handleDelete()}}><HiMiniTrash size={22}/> </button>
                </div>}
            </Card>
            {show && (
                        <Modal onClose={handleClose} title="Ajouter Projet">
                        <form  onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                            <div className={styles.field}>
                                <label>Name</label>
                                <input type="text" {...register('name')} placeholder="Nom du projet"/>
                                {errors.name && <p className={styles.error}>{errors.name.message}</p>}
                            </div>
                            <div className={styles.field}>
                                <label>Description</label>
                                <textarea {...register('description')}></textarea>
                                {errors.description && <p className={styles.error}>{errors.description.message}</p>}
                            </div>
            
                            <button type="submit" disabled={isSubmitting} className={styles.button}>{isSubmitting ? 'Envoi ...' : 'Ajouter'}</button>
                        </form>
                        </Modal>)
                        }
        </>
    )
}

export default CardProject;