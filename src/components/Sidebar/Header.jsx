import { FiSidebar } from "react-icons/fi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaReact } from "react-icons/fa";
import { useContext } from 'react';
import { AppContext } from '../../context.jsx';


const Header = ({ commonStyle, shouldShowContent, handleMobileSidebar }) => {

    const { setSidebarIsOpened, sidebarIsOpened, setCurrentChatId, isMobile } = useContext(AppContext);

    return (
        <header className={`border-b ${commonStyle.borderColor}
         h-25 
         flex flex-col justify-between
         ${commonStyle.padding}`}>

            <div className={`relative h-6.25 w-full `}>

                {shouldShowContent && (
                    <>
                        <h1 className={`
                            absolute left-0
                            text-xl 
                            cursor-pointer 
                            ${commonStyle.transition}
                            transition-opacity
                            ${sidebarIsOpened ? 'opacity-100' : 'opacity-0'}`}
                            onClick={() => {
                                setCurrentChatId('start');
                                handleMobileSidebar()
                            }}>
                            {isMobile ? <FaReact size={25} className="shrink-0 cursor-pointer" /> : 'ReactGPT'}
                        </h1>
                        <button className={`
                        flex gap-1.25 
                        absolute right-0
                         ${commonStyle.transition}
                            transition-opacity
                            ${sidebarIsOpened ? 'opacity-100' : 'opacity-0'}`}
                            type="button" onClick={() => setSidebarIsOpened(false)}>
                            <FiSidebar
                                size={25}
                                className="cursor-ew-resize shrink-0" />
                        </button>
                    </>
                )}
                {!shouldShowContent && !isMobile ? (
                    <button className='cursor-pointer  absolute left-0'
                        type="button" onClick={() => setSidebarIsOpened(true)}>
                        <FaReact size={25} className="shrink-0 cursor-pointer" />
                    </button>) : <></>}
            </div>





            <button className={`
                        flex justify-start items-center 
                        h-6.25 
                        cursor-pointer
                        ${commonStyle.borderRadius}
                        ${commonStyle.hover}`}
                onClick={() => {
                    setCurrentChatId('start');
                    handleMobileSidebar();
                }}>
                <HiOutlinePencilSquare size={25} className="shrink-0" />

                {shouldShowContent && (
                    <div className={`
                            shrink-0
                            whitespace-nowrap
                            ${commonStyle.transition}
                            transition-opacity
                            ${sidebarIsOpened ? 'opacity-100' : 'opacity-0'}
                            `}>
                        新しいチャット
                    </div>)}
            </button>

        </header >
    );
};

export default Header