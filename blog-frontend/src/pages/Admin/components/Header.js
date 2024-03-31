import { RiDashboard2Fill } from "react-icons/ri";
import { FaComments } from "react-icons/fa6";
import { HiSquares2X2 } from "react-icons/hi2"
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai"
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { useWindowSize } from '@uidotdev/usehooks'
import NavItem from "./NavItem";
import NavItemCollapse from "./NavItemCollapse";

const MenuItems = [
    {
        title: "Dashboard",
        link: "/admin",
        icon: <RiDashboard2Fill className="text-xl" />,
        name: "dashboard",
        type: "link"
    },
    {
        title: "Comments",
        link: "/admin/comments",
        icon: <FaComments className='text-xl' />,
        name: "comments",
        type: "link"
    },
    {
        title: "Posts",
        content: [
            { title: "New", link: "/admin/posts/new" },
            { title: "Manage", link: "/admin/posts/manage" },
        ],
        icon: <HiSquares2X2 className='text-xl' />,
        name: "posts",
        type: "collapse"
    },

]

const Header = () => {
    const [isMenuActive, setIsMenuActive] = useState(false);
    const [activeName, setActiveName] = useState("dashboard");
    const windowsize = useWindowSize()
    const toggleMenuHandler = (e) => {
        e.preventDefault();
        setIsMenuActive((prev) => !prev)
        console.log(1)
    }

    useEffect(() => {
        windowsize.width > 1024 ? setIsMenuActive(true) : setIsMenuActive(false)
    }, [windowsize.width])

    return (
        <header className="h-fit lg:h-full lg:w-1/5 w-full  p-4 lg:p-0 flex lg:flex-col lg:items-start lg:justify-between items-center justify-between">
            <Link to="/" className="text-xl">Wp</Link>
            <div className="cursor-pointer">
                {
                    isMenuActive ? (
                        <AiOutlineClose className="w-6 h-6" onClick={toggleMenuHandler} />
                    ) : (
                        <AiOutlineMenu className="w-6 h-6" onClick={toggleMenuHandler} />
                    )
                }
            </div>
            {/* SideBar */}
            {
                isMenuActive && <div className="fixed inset-0">
                    <div
                        className="fixed lg:static inset-0  bg-black opacity-50 lg:hidden"
                        onClick={toggleMenuHandler}
                    />
                    <div className="fixed lg:static lg:h-full lg:w-1/5 top-0 left-0 bottom-0 z-50 w-3/4 overflow-y-auto  p-4 lg:p-6 bg-white">
                        <Link to="/" className="text-xl">Wp</Link>
                        <h3 className="mt-10 text-[#c7c7c7] font-bold">Main Menu</h3>
                        <div className="flex flex-col mt-6 gap-y-2">
                            {
                                MenuItems.map(item =>
                                    item.type === 'link' ? <NavItem
                                        title={item.title}
                                        link={item.link}
                                        name={item.name}
                                        icon={item.icon}
                                        activeName={activeName}
                                        setActiveName={setActiveName}

                                    /> : <NavItemCollapse
                                        title={item.title}
                                        content={item.content}
                                        name={item.name}
                                        icon={item.icon}
                                        activeName={activeName}
                                        setActiveName={setActiveName}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>
            }
        </header>
    )
}

export default Header
