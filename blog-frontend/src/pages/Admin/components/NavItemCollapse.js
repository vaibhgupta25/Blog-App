import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const NavItemCollapse = ({ title, content, name, icon, activeName, setActiveName }) => {
    const [check, setCheck] = useState(false);
    useEffect(()=>{
        if(activeName!==name) setCheck(false)
    }, [activeName, check])
    return (
        <div>
            <div
                onClick={() => {
                    setActiveName(name)
                    setCheck((prev) => !prev)
                }}
                className={`flex items-center justify-between gap-x-2 text-lg ${name === activeName ? "text-blue-500 font-semibold" : "text-[#a5a5a5]"}`}
            >
                <div className={`flex items-center  gap-x-2`}>
                    {icon}
                    {title}
                </div>
                <div>{">"}</div>
            </div>
            <div className={`${check && activeName===name? "opacity-100 " : "opacity-0 "}flex flex-col gap-y-1.5 mt-1.5 transition-all duration-500`}>
                {
                    content.map(item => {
                        return <NavLink to={item.link} className={`px-7`}>{item.title}</NavLink>
                    })
                }
            </div>
        </div>
    )
}

export default NavItemCollapse
