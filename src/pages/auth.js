import { useState } from "react";
import { createUserAuth, createUserEmail, signWithEmail } from "../utils/firebase";

import '../styles/auth.scss'

const defaultFormFieldsRegister = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

export const Auth = () => {

  const [formField, setFormField] = useState(defaultFormFieldsRegister);
  const { email, password, displayName, confirmPassword } = formField;

  const handleChange = (e) => {
    const { value, name } = e.target;

    setFormField({ ...formField, [name]: value });
  }

  const resetFormField = () => {
    setFormField(formField);
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      const { user } = await createUserEmail(email, password);

      await createUserAuth(user, { displayName });

      resetFormField()
    } catch (error) {
      switch (error.code) {
        case 'auth/weak-password':
          console.log('Tu contraseña es muy debil');
        default:
          console.log(error);
          break;
      }
    }
  }

  const handleLogin = async(e) => {
    e.preventDefault()

    try {
      await signWithEmail(email, password)

      resetFormField()
    } catch (error) {
      console.log(error.code);
    }
  }



  return (
    <div className="auth-container">
      <section className="wrapper">
        <div className="wrapper__register">
          <header className="text--bold text--lg text--center text--black">Registrate</header>
          <form className="wrapper__register__form margin__top--40" onSubmit={handleRegister}>
          <input
              className="wrapper__register__form__input text--normal text--sm"
              onChange={handleChange}
              type='text'
              name='displayName'
              placeholder="Usuario"
              required />
            <input
              className="wrapper__register__form__input text--normal text--sm"
              onChange={handleChange}
              type='email'
              name='email'
              placeholder="Correo"
              required />
            <input
              className="wrapper__register__form__input text--normal text--sm"
              onChange={handleChange}
              type='password'
              name='password'
              placeholder="Contraseña"
              required />

            <button className="wrapper__register__form__button margin__top--15 text--bold text--sm"
              type="submit">Registrame</button>
          </form>
        </div>

        <div className="wrapper__login">
          <header className="text--bold text--lg text--center text--black">Inicia Sesión</header>
          <form className="wrapper__login__form margin__top--40" onSubmit={handleLogin}>
            <input
              className="wrapper__login__form__input text--normal text--sm"
              onChange={handleChange}
              type='email'
              name='email'
              placeholder="Correo"
              required />
            <input
              className="wrapper__login__form__input text--normal text--sm"
              onChange={handleChange}
              type='password'
              name='password'
              placeholder="Contraseña"
              required />

            <button className="wrapper__login__form__button margin__top--15 text--bold text--sm"
              type="submit">Registrame</button>
          </form>
        </div>
      </section>
    </div>
  )
}