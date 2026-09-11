import { FaGithub } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";
import { useContext } from 'react';
import { AppContext } from '../../context.jsx';

const TextDisplay = ({ commonStyle }) => {
    const { history, currentChatId } = useContext(AppContext);

    const currentChat = history.find((index) => index.id === currentChatId);

    return (
        <div className='
            pt-20 pb-50
            w-full
            flex flex-col items-center gap-12
            '>
            {

                currentChat && currentChat.messages.map((e, index) => (
                    <div key={index}
                        className={`
                            flex flex-col gap-12
                            ${commonStyle.width}`}>
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
                                    <a href='https://github.com/tomoya0813' className='text-blue-500 underline hover:text-blue-700'>
                                        GitHub
                                    </a>
                                </li>
                                <li className="flex items-center gap-2">
                                    <IoMailSharp />
                                    <a href='https://tomoya0813.github.io/portfolio/contact' className='text-blue-500 underline hover:text-blue-700'>
                                        Email
                                    </a>
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaRegMoon />
                                    <a href='https://tomoya0813.github.io/portfolio/about/index.html' className='text-blue-500 underline hover:text-blue-700'>
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