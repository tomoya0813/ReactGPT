import { FiSidebar } from "react-icons/fi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaReact } from "react-icons/fa";
import { useContext } from 'react';
import { AppContext } from '../../context.jsx';


const Header = ({ commonStyle }) => {

    const { setSidebarIsOpened, sidebarIsOpened, setCurrentChatId } = useContext(AppContext);

    return (
        <header className={`border-b ${commonStyle.borderColor}
         h-25 
         flex flex-col justify-between
         ${commonStyle.padding}`}>

            <div className="flex justify-between h-6">
                {sidebarIsOpened ? (
                    <>
                        <h1 className="text-[18px] cursor-pointer" onClick={() => setCurrentChatId('start')}>ReactGPT</h1>
                        <div className="flex gap-1.25">
                            <FiSidebar
                                size={25}
                                onClick={() => setSidebarIsOpened(false)}
                                className="cursor-ew-resize shrink-0"
                            />
                        </div>
                    </>
                ) : (
                    <button onClick={() => setSidebarIsOpened(true)} className={`cursor-pointer ${commonStyle.borderRadius}`}>
                        <FaReact size={25} className="shrink-0 cursor-ew-resize" />
                    </button>
                )}
            </div>

            <button className={`
                        flex justify-start items-center 
                        h-6 
                        cursor-pointer
                        ${commonStyle.borderRadius}
                        ${commonStyle.hover}`}
                onClick={() => setCurrentChatId('start')}>
                <HiOutlinePencilSquare size={25} className="shrink-0" />
                <div className={`
                    ${commonStyle.transition}
                    transition-opacity
                    ${sidebarIsOpened ? 'opacity-100' : 'opacity-0'}`}>
                    新しいチャット
                </div>
            </button>

        </header>
    );
};

export default Header