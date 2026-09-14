import { TiArrowUp } from "react-icons/ti";

import { useRef, useEffect, useContext } from 'react';
import { AppContext } from '../../context.jsx';

function UserActions({ text, setCurrentTexts, handleSubmit }) {

    const { currentChatId } = useContext(AppContext);
    const hasText = text.trim() !== '';
    const textAreaRef = useRef(null);
    useEffect(() => {
        textAreaRef.current.focus();
    }, [currentChatId])

    return (
        <>
            <div className={`
             border border-solid border-gray-300 rounded-[30px]
             shadow-sm bg-white`}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSubmit()
                    }}
                    className="
                        relative 
                        flex 
                        pt-1.25 pb-1.25 pl-2.5 pr-10
                        ">
                    <textarea
                        name="search"
                        placeholder='ここにテキストを入力'
                        value={text}
                        ref={textAreaRef}
                        onChange={(e) => {
                            setCurrentTexts(e.target.value);
                            // console.log("内容", typeof (e.target.value))
                        }}
                        onKeyDown={(e) => {

                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault()
                                handleSubmit()
                            }
                        }}

                        className='
                        flex-1
                        resize-none field-sizing-content
                        focus:outline-none
                         max-h-75 min-h-7.5
                       pt-0.5
                       m-1.25
                       '/>
                    <button
                        type="submit"

                        className={`
                      text-white 
                        ${hasText ? 'bg-blue-500' : 'bg-blue-200'}
                        w-7.5 h-7.5
                        border-none rounded-2xl
                           focus:outline-none
                        absolute bottom-2.25 right-3.5`}>
                        <TiArrowUp size={30} className="-translate-x-px" />
                    </button>
                </form>
            </div >
        </>
    )
}

export default UserActions