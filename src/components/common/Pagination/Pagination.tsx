import React from "react";
import styles from "./Pagination.module.css"
import {justNumberedArray} from "../../../utils/utils";

export type PaginationPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    pageSelect: (selectedPage: number) => void
}


const Pagination = (props: PaginationPropsType) => {
    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    return (
        <div className={ styles.pagination }>
            {
                justNumberedArray(pagesCount,1).map((p) => {
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
