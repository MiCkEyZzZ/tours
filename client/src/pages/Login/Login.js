import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { Label, Button, Alert } from '../../compoentns'
import { fetchAuthLogin } from '../../store/actions/authAction'

import './Login.css'

const Login = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const { error } = useSelector(state => state.auth)

  const validationSchemaLogin = Yup
      .object()
      .shape({
        email: Yup.string()
            .email()
            .required(`${t('errors.emptyField')}`)
            .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Введите правильный email'),
        password: Yup.string()
            .required(`${t('errors.emptyField')}`)
            .min(8, 'Пароль должен быть не менее 6 символов')
  })

  const fromOptions = { resolver: yupResolver(validationSchemaLogin) }

  const { register, handleSubmit, formState: { errors }, reset } = useForm(fromOptions)
  const dispatch = useDispatch()

  const onSubmit = data => {
    dispatch(fetchAuthLogin(data))

    if (error) {
      console.log(error.error.message)
    }

    reset()

    setTimeout(() => {
      history.push('/')
    }, 1000)
  }

  return (
    <main className='login'>
      <div className="login-card">
        <div className="login-body">
          <h5 className="login-body__title">{t('login.title')}</h5>
          <form className='login-form' onSubmit={ handleSubmit(onSubmit) }>
            <fieldset className="login-form__fieldset mb-3">
              <Label
                htmlFor="email-login"
                title={t('login.email')}
              />
              <input
                id='email-login'
                type='email'
                name='email'
                {...register('email')}
                autoComplete='off'
                placeholder='you@example.com'
                className={ `input ${ errors.email ? 'input-invalid' : '' }` }
              />
              <p className="login-form__fieldset-error">
                {errors.email && <Alert message={ errors.email.message } />}
              </p>
            </fieldset>

            <fieldset className="login-form__fieldset mb-3">
              <Label
                htmlFor="password-login"
                title={t('login.password')}
              />
              <input
                id='password-login'
                type="password"
                name='password'
                {...register("password")}
                autoComplete='off'
                placeholder='••••••••'
                className={ `input ${ errors.password ? 'input-invalid' : '' }` }
              />
              <p className="login-form__fieldset-error">
                {errors.password && <Alert message={ errors.password.message } />}
              </p>
            </fieldset>

            <div className="login-form__btn">
              <Button
                type="submit"
                title={t('login.logBtn')}
              />
              <Link
                to="/registration"
                className="login-form__link"
              >{t('login.registration')}</Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Login
