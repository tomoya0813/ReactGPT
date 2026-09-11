import Header from './Header';
import ChatHistory from './ChatHistory';
import Footer from './Footer';
import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context.jsx';


const Sidebar = ({ sidebarTransition, sidebarTransitionTime }) => {

  const { sidebarIsOpened, } = useContext(AppContext);
  const [shouldShowContent, setShouldShowContent] = useState(true);



  useEffect(() => {
    if (sidebarIsOpened) {
      setShouldShowContent(true)
      return
    }

    const timer = setTimeout(() => {
      setShouldShowContent(false)
    }, sidebarTransitionTime)
    return () => clearTimeout(timer)
  }, [sidebarIsOpened])



  const commonStyle = {
    padding: 'p-2.5',
    bgColor: 'bg-gray-100',
    hover: 'hover:bg-gray-100',
    borderColor: 'border-gray-200',
    borderRadius: 'rounded-[10px]',
    transition: sidebarTransition
  }

  return (
    <div className='h-full flex flex-col justify-between'>
      <Header commonStyle={commonStyle} shouldShowContent={shouldShowContent} />
      <ChatHistory className={`flex-1 overflow-y-auto`} commonStyle={commonStyle} shouldShowContent={shouldShowContent} />
      <Footer commonStyle={commonStyle} shouldShowContent={shouldShowContent} />
    </div>
  )
}

export default Sidebar