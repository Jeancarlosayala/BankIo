import { useState } from "react";
import { createUserAuth, createUserEmail, signWithEmail } from "../utils/firebase";

import '../styles/auth.scss'
import { Navigate } from "react-router-dom";

const defaultFormFieldsRegister = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

export const Auth = () => {
  const [formField, setFormField] = useState(defaultFormFieldsRegister);
  const { email, password, displayName, confirmPassword } = formField;
  const islogged = localStorage.getItem('islogged');

  const handleChange = (e) => {
    const { value, name } = e.target;

    setFormField({ ...formField, [name]: value });
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    if (confirmPassword === password) {
      try {
        const { user } = await createUserEmail(email, password);

        await createUserAuth(user, { displayName });
        window.location.replace('/')
        localStorage.setItem('islogged', true)
      } catch (error) {
        switch (error.code) {
          case 'auth/weak-password':
            alert('Tu contraseña es muy debil');
            break;
          case 'auth/email-already-in-use':
            alert('este usuario ya existe');
            break;
          default:
            console.log(error);
            break;
        }
      }
    } else {
      alert('Las contraseñas no coinciden')
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      await signWithEmail(email, password)
      window.location.replace('/')
      localStorage.setItem('islogged', true)
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Contraseña incorrecta')
          break;
        case 'auth/user-not-found':
          alert('Este usuario no existe')
          break;
        default:
          console.log(error.code);
          break;
      }
    }
  }

  const changeAuth = () => {
    const container = document.querySelector('.auth-container');
    container.classList.toggle('login')
  }

  const changeForm = () =>{
    const registerForm = document.querySelector('.register-form');
    const loginForm = document.querySelector('.login-form')

    registerForm.classList.toggle('display--desk')
    loginForm.classList.toggle('display--desk')
  }

  if (islogged) return <Navigate to='/' />

  return (
    <div className="body-auth">
      <div className="auth-container">
        <section className="auth-container__form">
          <form className="register-form" onSubmit={handleLogin}>
            <span className="text--bold text--lg text--center text--black">Inicia Sesión</span>
            <input
              className="auth-container__form__input text--normal text--sm"
              onChange={handleChange}
              type='email'
              name='email'
              placeholder="Correo"
              required />
            <input
              className="auth-container__form__input text--normal text--sm"
              onChange={handleChange}
              type='password'
              name='password'
              placeholder="Contraseña"
              required />
            <button onClick={changeForm} className="account-link text--bold text--xs display--mobile"
              type="submit">No tengo una cuenta</button>

            <button className="form-button text--white margin__top--15 text--bold text--sm"
              type="submit">Iniciar sesion</button>
          </form>

          <form className="login-form display--desk" onSubmit={handleRegister}>
            <span className="text--bold text--lg text--center text--black">Registrate</span>
            <input
              className="auth-container__form__input text--sm"
              onChange={handleChange}
              type='email'
              name='email'
              placeholder="Correo"
              required />
            <input
              className="auth-container__form__input text--sm"
              onChange={handleChange}
              type='password'
              name='password'
              placeholder="Contraseña"
              required />
            <input
              className="auth-container__form__input text--sm"
              onChange={handleChange}
              type='password'
              name='confirmPassword'
              placeholder="Confirmar contraseña"
              required />

            <button onClick={changeForm} className="account-link text--bold text--xs display--mobile"
              type="submit">Ya tengo una cuenta</button>

            <button className="form-button text--white margin__top--15 text--bold text--sm"
              type="submit">Registrame</button>
          </form>
        </section>

        <section className="auth-container__panel-container">
          <div className="auth-container__panel-container__panel auth-container__panel-container--left">
            <span className="text--bold text--lg text--white">Ya tienes una cuenta BankIo</span>
            <span className="text--white text--normal margin__top--10">Inicia sesion para poder obtener todos
              nuestros beneficios</span>
            <button onClick={changeAuth} className="change-auth-button margin__top--15 text--bold text--sm"
              type="button">Iniciar sesion</button>
          </div>
          <div className="auth-container__panel-container__panel auth-container__panel-container--right display--desk">
            <span className="text--bold text--lg text--white">Registrate en BankIo</span>
            <span className="text--white text--normal margin__top--10">Al registrate por primera vez obten hasta $1000 pesos para tus compras y/o
              servicios</span>
            <button onClick={changeAuth} className="change-auth-button margin__top--15 text--bold text--sm display--desk"
              type="button">Registrame</button>
          </div>
        </section>
      </div>
    </div>
  )
}