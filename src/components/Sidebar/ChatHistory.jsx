import { FaRegTrashAlt } from "react-icons/fa";
import { useContext } from "react";
import { AppContext } from "../../context.jsx";

const ChatHistory = ({ className, commonStyle, shouldShowContent }) => {

    const { history, setHistory,
        currentChatId, setCurrentChatId,
        sidebarIsOpened } = useContext(AppContext)

    const deleteHistory = (id) => {
        setHistory(history.filter((item) => item.id !== id));
        if (currentChatId === id)
            setCurrentChatId('start')
    }
    return (
        shouldShowContent && (
            <div className={`
                flex flex-col gap-1 
                ${commonStyle.padding} 
                ${className}
                transition-opacity ${commonStyle.transition}
                ${sidebarIsOpened ? 'opacity-100' : 'opacity-0'}`}>

                {history.map((e) => (
                    <div className={`
                        flex justify-between
                        p-1 pl-3 pr-3 
                        cursor-pointer
                        group
                        ${commonStyle.borderRadius}
                        ${commonStyle.hover}
                         ${e.id === currentChatId && commonStyle.bgColor}`}
                        key={e.id}
                        onClick={() => setCurrentChatId(e.id)}>
                        <div className="shrink-0 whitespace-nowrap">要約内容</div>
                        <button className="
                        cursor-pointer 
                        opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(event) => {
                                event.stopPropagation();
                                deleteHistory(e.id);
                            }}><FaRegTrashAlt /></button>
                    </div>
                ))}
            </div>
        )
    )
}

export default ChatHistory