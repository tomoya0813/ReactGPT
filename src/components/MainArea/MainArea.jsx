import { useContext } from 'react';
import { AppContext } from '../../context.jsx';
import UserActions from './UserActions';
import TextDisplay from './TextDisplay';
import { v4 as uuidv4 } from 'uuid';

const MainArea = ({ layoutState }) => {

  const { history, setHistory,
    currentChatId, setCurrentChatId,
    texts, setCurrentTexts, sidebarIsOpened, windowWidth } = useContext(AppContext);

  const userActionsPosition = () => {
    const sideW = layoutState.find(state => state.sidebarIsOpened === sidebarIsOpened)
      .sidebarWidth;
    const mainW = windowWidth - sideW;
    const left = sideW + (mainW / 2);
    return {
      left, transform: 'translateX(-50%)'
    }
  }
  const handleSubmit = () => {
    if (texts[currentChatId].trim() === '') return;

    if (currentChatId === 'start') {
      const temp = uuidv4();
      setHistory([...history, { id: temp, messages: [texts[currentChatId]] }])
      setCurrentChatId(temp)
    } else {
      setHistory(history.map((item) => {
        if (item.id === currentChatId) {
          return { ...item, messages: [...item.messages, texts[currentChatId]] }
        }
        return item;
      }))
    }
    setCurrentTexts('')
  }

  const commonStyle = {
    width: 'lg:w-175 md:w-130'
  }

  return (
    <div className="h-screen">
      {currentChatId === 'start' ? (
        <div className={`fixed bottom-1/2 `} style={userActionsPosition()}>
          <UserActions
            text={texts[currentChatId] || ''}
            setCurrentTexts={setCurrentTexts}
            handleSubmit={handleSubmit}
            commonStyle={commonStyle}
          />
        </div>
      ) : (
        <>
          <div className="h-screen overflow-y-auto  scrollbar-gutter-both">
            <TextDisplay commonStyle={commonStyle} />
          </div>
          <div className={`fixed bottom-7`} style={userActionsPosition()}>
            <UserActions
              text={texts[currentChatId] || ''}
              setCurrentTexts={setCurrentTexts}
              handleSubmit={handleSubmit}
              commonStyle={commonStyle}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default MainArea