import { FaGithub } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";
import { useContext, useRef, useEffect } from 'react';
import { AppContext } from '../../context.jsx';

const TextDisplay = ({ contentsWidth }) => {
    const { history, currentChatId } = useContext(AppContext);
    const ref = useRef(null)


    const currentChat = history.find((chat) => chat.id === currentChatId);
    const currentLastMessageIndex = currentChat ?
        currentChat.messages.length - 1 : null;

    useEffect(() => {
        ref.current?.scrollIntoView();
    }, [currentChatId, currentLastMessageIndex])

    return (
        <div className={`
            ${contentsWidth}   
            mx-auto
            pt-20 pb-50 
            flex flex-col items-center gap-12
            `}>
            {currentChat && currentChat.messages.map((e, index) => (
                <div key={index}
                    ref={index === currentLastMessageIndex ? ref : null}
                    className={`
                            flex flex-col gap-12 w-full
                          `}>
                    <div className='
                            self-end
                            bg-blue-200
                            pr-7 pl-7 pt-5 pb-5
                            min-w-15 max-w-full
                            rounded-3xl'>{e}</div>
                    <div className='self-start 
                                  bg-gray-100 
                                    min-w-15 max-w-full
                                    pr-7 pl-7 pt-5 pb-5
                                    rounded-3xl'>
                        <p className='mb-3'>返信機能は実装していません</p>
                        <p className='mb-1.5'>各種リンクはこちら↓</p>
                        <ul className='flex flex-col gap-2'>
                            <li className="flex items-center gap-2">
                                <FaGithub />
                                <a href='https://github.com/tomoya0813' target="_blank" className='text-blue-500 underline hover:text-blue-700'>
                                    GitHub
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <IoMailSharp />
                                <a href='https://tomoya0813.github.io/portfolio/contact' target="_blank" className='text-blue-500 underline hover:text-blue-700'>
                                    Email
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaRegMoon />
                                <a href='https://tomoya0813.github.io/portfolio/about/index.html' target="_blank" className='text-blue-500 underline hover:text-blue-700'>
                                    MY About
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TextDisplay 