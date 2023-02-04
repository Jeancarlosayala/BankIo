import { BiChevronRight, BiFile, BiUser } from "react-icons/bi"
import { IoMdNotificationsOutline } from 'react-icons/io'
import { CgLogOut } from 'react-icons/cg'
import { Link, Outlet } from "react-router-dom"
import logo from '../images/banamex-logo.png'
import logoImage from '../images/banamex.png'
import '../styles/sidebar.scss'
import { signOutUser } from "../utils/firebase"
import { useContext } from "react"
import { UserContext } from "../context/user"

export const PanelNavigation = () => {

  const { userInfo } = useContext(UserContext)

  const toggleSideBar = () => {
    const sideBar = document.querySelector('.sidebar'),
      logoName = document.querySelector('.logo-name'),
      logoImage = document.querySelector('.logo-image');

    sideBar.classList.toggle('sidebar--close');
    logoName.classList.toggle('display--none');
    logoImage.classList.toggle('display--none');
  }

  const signOut = () => {
    signOutUser();

    window.location.replace('/auth')
    localStorage.removeItem('islogged')
  }

  return (
    <>
      <nav className="sidebar sidebar--close">
        <header className="sidebar__header">
          <div className="sidebar__header__image-text flex--center">
            <span id="logo-container" className="sidebar__header__image-text__image">
              <img className="logo-name display--none" src={logo} alt='logo' />
              <img className="logo-image" src={logoImage} alt='logo' />
            </span>
          </div>

          <BiChevronRight onClick={toggleSideBar} className="sidebar__header__icon" />
        </header>

        <div className="sidebar__menu-bar">
          <div className="sidebar__menu-bar__menu">
            <ul className="sidebar__menu-bar__menu__links">
              <li className="sidebar__menu-bar__menu__links__nav-link">
                <Link to='/' className="sidebar__menu-bar__menu__links__nav-link__link">
                  <BiUser className="sidebar__menu-bar__menu__links__nav-link__link__icon text--md" />
                  <span className="text--normal text--sm text-opacity link_mobile">{userInfo.displayName}</span>
                </Link>
              </li>
              <li className="sidebar__menu-bar__menu__links__nav-link">
                <Link className="sidebar__menu-bar__menu__links__nav-link__link">
                  <BiFile className="sidebar__menu-bar__menu__links__nav-link__link__icon text--md" />
                  <span className="text--normal text--sm text-opacity link_mobile">Recibos</span>
                </Link>
              </li>
              <li className="sidebar__menu-bar__menu__links__nav-link">
                <Link className="sidebar__menu-bar__menu__links__nav-link__link">
                  <IoMdNotificationsOutline className="sidebar__menu-bar__menu__links__nav-link__link__icon text--md" />
                  <span className="text--normal text--sm text-opacity link_mobile">Notificaciones</span>
                </Link>
              </li>
              <li className="sidebar__menu-bar__menu__links__nav-link display_mobile">
              <Link onClick={signOut} className="sidebar__menu-bar__menu__links__nav-link__link">
                <CgLogOut className="sidebar__menu-bar__menu__links__nav-link__link__icon text--md" />
              </Link>
              </li>
            </ul>
          </div>

          <div className="sidebar__menu-bar__bottom-content">
            <li className="sidebar__menu-bar__menu__links__nav-link">
              <Link onClick={signOut} className="sidebar__menu-bar__menu__links__nav-link__link">
                <CgLogOut className="sidebar__menu-bar__menu__links__nav-link__link__icon text--md" />
                <span className="text--normal text--sm text-opacity">Cerrar sesion</span>
              </Link>
            </li>
          </div>
        </div>
      </nav>

      <div className="panel-content">
        <Outlet />
      </div>
    </>
  )
}