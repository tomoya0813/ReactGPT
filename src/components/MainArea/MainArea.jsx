import { useContext, useRef, useEffect, useState } from 'react';
import { AppContext } from '../../context.jsx';
import UserActions from './UserActions';
import TextDisplay from './TextDisplay';
import { v4 as uuidv4 } from 'uuid';
import { BiAlignLeft } from "react-icons/bi";

const MainArea = ({ layoutState }) => {


  // =====================================================================

  const config = {
    padding: 20,
    contentsWidth: 'lg:w-175 md:w-130 '
  }


  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const {
    history, setHistory,
    currentChatId, setCurrentChatId,
    texts, setCurrentTexts, sidebarIsOpened, setSidebarIsOpened, windowWidth, isMobile
  } = useContext(AppContext);

  const scrollRef = useRef(null);
  const [gutterWidth, setGutterWidth] = useState(0);

  useEffect(() => {
    if (scrollRef.current) {
      setGutterWidth(scrollRef.current.offsetWidth - scrollRef.current.clientWidth)
      // console.log('gutter:', gutterWidth);
    }
  }, [currentChatId]);


  const commonStyle = {
    displayPadding: config.padding,
    UserActionsPadding: gutterWidth / 2 + config.padding
  }

  const userActionsPosition = () => {
    if (isMobile) {
      return {
        left: commonStyle.UserActionsPadding,
        right: commonStyle.UserActionsPadding
      }
    }
    const sideW = layoutState.find(state => state.sidebarIsOpened === sidebarIsOpened)
      .sidebarWidth;
    const mainW = windowWidth - sideW;
    const left = sideW + (mainW / 2);
    return {
      left, transform: 'translateX(-50%)'
    }
  }


  const handleSubmit = () => {

    const currentText = texts[currentChatId] || '';
    if (currentText.trim() === '') return;

    if (currentChatId === 'start') {
      const temp = uuidv4();
      setHistory([
        ...history,
        { id: temp, messages: [currentText] }
      ])
      setCurrentChatId(temp)
    } else {
      setHistory(history.map((item) => {
        if (item.id === currentChatId) {
          return {
            ...item,
            messages: [...item.messages, currentText]
          }
        }
        return item;
      }))
    }

    setCurrentTexts('')
  }


  return (
    <div className="h-screen w-full">
      {currentChatId === 'start' ? (
        <>
          {isMobile &&
            <button className='fixed top-2.5 left-2.5 cursor-pointer bg-white p-1 rounded-xs z-1'
              onClick={() => setSidebarIsOpened(true)}>
              <BiAlignLeft size={25} />
            </button>}

          <div className={`fixed bottom-1/2  ${config.contentsWidth}`}
            style={{
              ...userActionsPosition(),
            }}>
            <UserActions
              text={texts[currentChatId] || ''}
              setCurrentTexts={setCurrentTexts}
              handleSubmit={handleSubmit}
            />
          </div>
        </>
      ) : (
        <>
          {isMobile &&
            <button className='fixed top-2.5 left-2.5 cursor-pointer bg-white p-1 rounded-xs z-1'
              onClick={() => setSidebarIsOpened(true)}>
              <BiAlignLeft size={25} />
            </button>}
          <div ref={scrollRef}
            className="h-screen scrollbar-gutter-both  w-full"
            style={{
              padding: `${commonStyle.displayPadding}px`,
              overflowY: (isMobile && sidebarIsOpened) ? 'hidden' : 'auto'
            }} >
            <TextDisplay contentsWidth={config.contentsWidth} />
          </div>
          <div className={`fixed bottom-7 ${config.contentsWidth}`}
            style={{
              ...userActionsPosition(),
            }}>
            <UserActions
              text={texts[currentChatId] || ''}
              setCurrentTexts={setCurrentTexts}
              handleSubmit={handleSubmit}
            />
          </div>
        </>
      )
      }
    </div >
  )
}

export default MainArea