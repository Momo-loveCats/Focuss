import { MdAdd } from "react-icons/md";
import Card from "./card";
import Modal from './modal';
import useModal from "../../hooks/modal.hook";
import {useForm} from "react-hook-form"
import { ProjectSchema, type ProjectAdd } from "../../validations/project.schema";
import {zodResolver} from "@hookform/resolvers/zod"
import styles from "./../../styles/modal.module.css"
import { useEffect } from "react";


const AddProject = ({onAdd} : {onAdd : (name : string, description : string) => void}) => {
    const [show, handleClose, handleClick] = useModal();

    const {register, handleSubmit, reset, formState : {errors, isSubmitting}} = useForm<ProjectAdd>({
        resolver : zodResolver(ProjectSchema),
        mode : "onSubmit"
    });

    const onSubmit = async (data : ProjectAdd) => {
        await onAdd(data.name, data.description);
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
             <Card onClick={handleClick}>
            <MdAdd size={20}/>
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

export default AddProject;



