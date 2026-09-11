import { createContext } from "react";
import { useState } from "react";

export const AppContext = createContext();

function ContextProvider({ children }) {
    const [history, setHistory] = useState([]);
    const [currentChatId, setCurrentChatId] = useState('start');
    const [sidebarIsOpened, setSidebarIsOpened] = useState(true);

    const [texts, setTexts] = useState({ start: '' });
    const setCurrentTexts = (value) => {
        setTexts({ ...texts, [currentChatId]: value })
    }



    return (
        <AppContext.Provider value={{
            history, setHistory,
            currentChatId, setCurrentChatId,
            sidebarIsOpened, setSidebarIsOpened,
            texts, setCurrentTexts
        }}>
            {children}
        </AppContext.Provider>
    )
}


export default ContextProvider