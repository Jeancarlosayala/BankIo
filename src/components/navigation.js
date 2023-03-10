import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { UserContext } from '../context/user'

import '../styles/navigation.scss'

import logo from '../images/Banamex.webp'
import { BiBuildings, BiLogIn, BiMessageDetail, BiUser } from 'react-icons/bi'
import { signOutUser } from '../utils/firebase'

export const Navigation = () => {

  const { currentUser, userInfo } = useContext(UserContext);

  const toggleMenu = (e) => {
    const menu = document.getElementById('menuMobile');
    menu.classList.toggle('display-menu--yes')
    menu.classList.toggle('display-menu--no')

    e.target.classList.toggle('navigation__container__button--fixed');
  }

  const signOut = () => {
    signOutUser()
    window.location.replace('/')
  }

  return (
    <>
      <div className='navigation'>
        <div className='navigation__container'>
          <div className='navigation__container__logo'>
            <img src={logo} alt='logo' />
          </div>

          <div id='menuMobile' className='navigation__container__links display-menu--no'>
            <div className='navigation__container__links--center'>
              <Link to='/' className='navigation__container__links__link'>
                <BiUser className='display--mobile icon-item--sm margin__right--10' />
                Inicio
              </Link>
              <Link to='/panel' className='navigation__container__links__link'>
                Panel
              </Link>
              <Link to='/about' className='navigation__container__links__link'>
                <BiBuildings className='display--mobile icon-item--sm margin__right--10' />
                Nosotros
              </Link>
              <Link to='/contact' className='navigation__container__links__link'>
                <BiMessageDetail className='display--mobile icon-item--sm margin__right--10' />
                Contacto
              </Link>
              {
                currentUser ? (
                  <Link onClick={signOut} className='navigation__container__links__link navigation__container__links__link__auth'>
                    <BiLogIn className='display--mobile icon-item--sm margin__right--10' />
                    Cerrar sesi??n
                  </Link>
                ) :
                  (<Link to='/auth' className='navigation__container__links__link navigation__container__links__link__auth'>
                    <BiLogIn className='display--mobile icon-item--sm margin__right--10' />
                    Crear cuenta
                  </Link>)
              }

              <span>{userInfo.displayName}</span>
            </div>

          </div>
          <button className='navigation__container__button text--normal display--mobile' onClick={toggleMenu}>X</button>
        </div>
      </div>

      <Outlet />
    </>
  )
}