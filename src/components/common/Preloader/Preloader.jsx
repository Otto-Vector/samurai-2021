import React from "react";
import styles from "./Preloader.module.css"
import preLoader from "../../../assets/images/Spinner.svg"

const Preloader = () => {

    return (
      <div className={styles.preloader}>
        <img src={preLoader} alt='preload' />
      </div>
    )
}

export default Preloader
