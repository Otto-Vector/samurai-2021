import React from 'react';
import styles from './DialogItem.module.css';
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    let path = "/dialogs/" + props.id;

    return <div className={styles.dialog}>
            <img className={styles.image} alt="dialogImage" src={props.imageURL}/>
            <NavLink to={path} className={styles.profileName} activeClassName={styles.active}>{props.name}</NavLink>
        </div>
}

export default DialogItem;
