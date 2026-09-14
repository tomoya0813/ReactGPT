import { useContext } from "react";
import { AppContext } from "./context.jsx";
import Sidebar from "./components/Sidebar/Sidebar"
import MainArea from "./components/MainArea/MainArea"

function App() {
  const { sidebarIsOpened, isMobile } = useContext(AppContext)

  const layoutState = [
    {
      sidebarIsOpened: true,
      sidebarWidth: 250
    },
    {
      sidebarIsOpened: false,
      sidebarWidth: 50
    }
  ];


  const currentLayout = layoutState.find((item) => {
    return item.sidebarIsOpened === sidebarIsOpened
  })


  const sidebarTransitionTime = 75;
  const sidebarTransition = `duration-${sidebarTransitionTime}`;
  // console.log(sidebarTransition)

  return (
    <div className="flex h-screen ">
      <div
        style={{
          width: `${currentLayout.sidebarWidth}px`,
          transitionDuration: `${sidebarTransitionTime}ms`,
          position: isMobile ? 'absolute' : 'static',
          transform: `translateX(${isMobile && !sidebarIsOpened ? '-100%' : '0'})`,
          zIndex: isMobile ? 2 : 0,
          background: isMobile ? 'white' : 'transparent'
        }}
        className={`
        h-screen
        border-r 
        border-[rgba(0,0,0,0.05)] 
         transition-[width,transform]
        `}
      >
        <Sidebar sidebarTransition={sidebarTransition} sidebarTransitionTime={sidebarTransitionTime} />
      </div>
      <div className={`h-screen flex-1 ${isMobile && sidebarIsOpened ? 'blur-xs' : ''}`}>
        <MainArea layoutState={layoutState} />
      </div>
    </div >
  );
};

export default App
