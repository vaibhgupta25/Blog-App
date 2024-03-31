import React from 'react'
import { Link } from 'react-router-dom'

const BreadCrumb = ({ data }) => {
    return (
        <div className='flex pb-8 font-roboto' >
            {data.map((item, index) => {
                return (
                    <div className='flex text-sm md:text-lg text-dark-light font-semibold' key={item.name}>
                        <Link to={item.link} >{item.name}</Link>
                        {index !== data.length - 1 ? <div className='px-2'>/</div> : ""}
                    </div>
                )
            })}
        </div>
    )
}

export default BreadCrumb
