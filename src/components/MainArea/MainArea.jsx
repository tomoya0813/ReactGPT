import { useContext } from 'react';
import { AppContext } from '../../context.jsx';
import UserActions from './UserActions';
import TextDisplay from './TextDisplay';
import { v4 as uuidv4 } from 'uuid';

const MainArea = () => {

  const { history, setHistory,
    currentChatId, setCurrentChatId,
    texts, setCurrentTexts, } = useContext(AppContext);


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
    width: 'w-175',
  }

  return (
    <div className="h-screen flex flex-col">
      {currentChatId === 'start' ? (
        <div className="flex-1 flex items-center justify-center">
          <UserActions
            text={texts[currentChatId] || ''}
            setCurrentTexts={setCurrentTexts}
            handleSubmit={handleSubmit}
            commonStyle={commonStyle}
          />
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto">
            <TextDisplay commonStyle={commonStyle} />
          </div>
          <div className="pb-7 flex justify-center">
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