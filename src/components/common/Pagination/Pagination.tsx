import React from "react";
import styles from "./Pagination.module.css"

export type PaginationPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    pageSelect: (selectedPage: number) => void
}


const Pagination = (props: PaginationPropsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let justArray = (a: number): number[] => {
        let b: number[] = []
        while (a--) b[a] = a + 1;
        return b
    }
    let pages = justArray(pagesCount)

    return (
        <div className={ styles.pagination }>
            {
                pages.map(p => {
                    return <div
                        key={ p * 0.3 }
                        className={ `${ styles.page } ${ props.currentPage === p && styles.selectedPage }` }
                        onClick={ (e) => {
                            props.pageSelect(p)
                        } }
                    >{ p }</div>
                })
            }
        </div>
    )
}

export default Pagination
