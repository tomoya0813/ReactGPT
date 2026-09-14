import { FaGithub } from "react-icons/fa";
import { useContext } from "react";
import { AppContext } from "../../context";

const Footer = ({ commonStyle, shouldShowContent }) => {

  const { sidebarIsOpened } = useContext(AppContext)

  return (
    <div className={`${commonStyle.padding} border-t ${commonStyle.borderColor}`} >
      <a href='https://github.com/tomoya0813' target="_blank"
        className={`flex items-center gap-2 ${commonStyle.hover}  ${commonStyle.borderRadius}`}>
        <FaGithub size={27} className="shrink-0" />

        {shouldShowContent && (<p className={`
          text-blue-500 text-xl
            underline
          hover:text-blue-700
            transition-opacity ${commonStyle.transition}
            shrink-0
            whitespace-nowrap
          ${sidebarIsOpened ? 'opacity-100' : 'opacity-0'}
          `}>GitHub</p>)}

      </a>
    </div >
  )
}

export default Footer