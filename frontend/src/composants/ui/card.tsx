import type React from "react";
import type { ReactNode } from "react";
import styles from "./../../styles/Card.module.css";

interface CardProps {
    children : ReactNode,
    onClick : React.MouseEventHandler
}

const Card = ({onClick, children} : CardProps) => {
    return (
        <div className={styles.card} onClick={onClick}>
            {children}
        </div>
    );
}

export default Card;