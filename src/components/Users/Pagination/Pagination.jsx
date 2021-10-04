import React from "react";
import styles from "./Pagination.module.css"

const Pagination = (props) => {
    let pagesCount = Math.ceil(props.totalCount / props.pageSize)
    // let pagesCount = Math.ceil(100 / props.pageSize)
    let pages = []
    for (let i=1; i<= pagesCount; i++) {
      pages.push(i)
    }

    return (
      <div className={styles.pagination}>
        {
          pages.map(p => {
            return <div
              key = {p*0.3}
              className={`${styles.page} ${props.currentPage===p && styles.selectedPage}`}
              onClick={ (e)=>{ props.pageSelect(p) } }
            >{p}</div>
          })
        }
      </div>
    )
}

export default Pagination
