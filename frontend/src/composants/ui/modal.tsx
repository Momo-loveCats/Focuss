
import { HiArchiveBoxArrowDown } from "react-icons/hi2";
import styles from "./../../styles/modal.module.css"
import type React from "react";
import type { ReactNode } from "react";

interface ModalProps {
    title? : string
    onClose : () => void,
    children : ReactNode
}


const Modal = ({title , onClose, children} : ModalProps) => {

    const handleBackgroundClick = () => {
        onClose();
      };
    
      const stopClickPropagation = (e: React.MouseEvent) => {
        e.stopPropagation(); // 🔒 bloque la propagation vers le fond
      };
    
    return (
        <div className={styles.modal} onClick={handleBackgroundClick}>
            <div className={styles.body} onClick={stopClickPropagation}>
            <h3 className={styles.title}>{title}</h3>
            {children}
            <button type="button" className={styles.close} onClick={onClose}><HiArchiveBoxArrowDown size={22}/></button>
        </div>
        </div>

    )
}

export default Modal;