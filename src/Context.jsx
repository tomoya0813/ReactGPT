import { createContext } from "react";
import { useState, useEffect } from "react";

export const AppContext = createContext();

function ContextProvider({ children }) {
    const [history, setHistory] = useState([]);
    const [currentChatId, setCurrentChatId] = useState('start');
    const [sidebarIsOpened, setSidebarIsOpened] = useState(true);

    const [texts, setTexts] = useState({ start: '' });
    const setCurrentTexts = (value) => {
        setTexts({ ...texts, [currentChatId]: value })
    }


    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])


    return (
        <AppContext.Provider value={{
            history, setHistory,
            currentChatId, setCurrentChatId,
            sidebarIsOpened, setSidebarIsOpened,
            texts, setCurrentTexts,
            windowWidth
        }}>
            {children}
        </AppContext.Provider>
    )
}


export default ContextProvider