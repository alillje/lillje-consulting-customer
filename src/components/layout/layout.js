import './layout.css'
import * as React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from '../sidebar/sidebar'
import AdminSidebar from '../admin-sidebar/admin-sidebar'
import Topbar from '../topbar/topbar'

/**
 * Layout Component.
 * Sets the page layout with CSS grid and inserts the children into the main HTML div element.
 *
 * @param {React.ReactElement} children - The React Element to insert into the component.
 * @returns {React.ReactElement} - Layout Component.
 */
const Layout = ({ children }) => {
  // const { children } = props
  const user = useSelector((state) => state.user)
  const sidemenu = useSelector((state) => state.sidemenu)

  /**
   * Sets the width of the sidebar menu to 100% if mobile device.
   *
   * @returns {string|undefined} - If on mobile device, returns the width of 100%. If on desktop device, return undefined.
   */
  const setSidemenuWidth = () => {
    const width = '100%'
    if (sidemenu.show) {
      return width
    } else {
      return undefined
    }
  }

  return (
    <div className="layoutContainer">
      <div className="layoutHeader">
        <Topbar />
      </div>
      <div className="layoutSidebar">
        {user.admin ? <AdminSidebar /> : <Sidebar />}
      </div>
      {sidemenu.show && (
        <div className="layoutSidebarMobile">
          {user.admin ? (
            <AdminSidebar width={setSidemenuWidth} />
          ) : (
            <Sidebar width={setSidemenuWidth} />
          )}
        </div>
      )}

      <div className="layoutMain">{children}</div>
      <div className="layoutRight"></div>
    </div>
  )
}

export default Layout
