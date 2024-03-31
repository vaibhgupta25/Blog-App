import React from 'react'
import { NavLink } from 'react-router-dom'

const NavItem = ({ title, link, name, icon, activeName, setActiveName }) => {
    return (
        <NavLink
            to={link}
            onClick={() => { 
                setActiveName(name)
             }}
            className={`flex items-center gap-x-2 text-lg ${name === activeName ? "text-primary font-semibold" : "text-[#a5a5a5]"}`}
        >
            {icon}
            {title}
        </NavLink>
    )
}

export default NavItem
