import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { Label, Button, Alert } from '../../compoentns'
import { fetchAuthRegistration } from '../../store/actions/authAction'

import './Registration.css'

const Registration = () => {
  const { t } = useTranslation()
  const history = useHistory()

  const validationSchemaReg = Yup.object().shape({
    name: Yup.string()
      .required(`${t('errors.emptyField')}`)
      .min(2, 'Поле должно содержать минимум 2 символа')
      .max(20, 'Поле должно содержать не более 20 символов')
      .matches(/^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u, 'Имя должно содержать только буквы.'),
    email: Yup.string()
      .required(`${t('errors.emptyField')}`)
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Укажите полный адрес электронной почты'),
    password: Yup.string()
      .required(`${t('errors.emptyField')}`)
      .min(8, `${t('errors.password')}`)
      .matches(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*[А-Я])(?=.*[а-я])[0-9a-zA-Z!@#$%^&*]{6,}/g, 'Пароль должен содержать следующие символы 1,@!$,Ad,Фп'),
    passwordConfirm: Yup.string()
      .required(`${t('errors.confirm')}`)
      .oneOf([Yup.ref('password')], `${t('errors.emptyField')}`)
  })

  const fromOptions = { resolver: yupResolver(validationSchemaReg) }

  const { register, handleSubmit, formState: { errors }, reset } = useForm(fromOptions)

  const dispatch = useDispatch()

  const onSubmit = data => {
    dispatch(fetchAuthRegistration(data))

    reset()

    setTimeout(() => {
      history.push('/login')
    }, 1000)
  }

  return (
    <main className='registration'>
      <div className="registration-card">
        <div className="registration-body">
          <h5 className="registration-title">{t('signup.title')}</h5>
          <form className="registration-form" onSubmit={ handleSubmit(onSubmit) }>
            <fieldset className="registration-form__fieldset mb-3">
              <Label
                htmlFor="req-name"
                title={t('signup.name')}
              />
              <input
                id='req-name'
                type='name'
                name='name'
                {...register('name')}
                autoComplete='off'
                className={ `input ${ errors.name ? 'input-invalid' : '' }` }
              />
              <p className="registration-form__fieldset-error">
                {errors.name && <Alert message={ errors.name.message } />}
              </p>
            </fieldset>

            <fieldset className="registration-form__fieldset mb-3">
              <Label
                htmlFor="reg-email"
                title={t('signup.email')}
              />
              <input
                id='reg-email'
                type='email'
                name='email'
                {...register('email')}
                autoComplete='off'
                placeholder='you@example.com'
                className={ `input ${ errors.email ? 'input-invalid' : '' }` }
              />
              <p className="registration-form__fieldset-error">
                {errors.email && <Alert message={ errors.email.message } />}
              </p>
            </fieldset>

            <fieldset className="registration-form__fieldset mb-3">
              <Label
                htmlFor="reg-password"
                title={t('signup.password')}
              />
              <input
                id='reg-password'
                type="password"
                name='password'
                {...register("password")}
                autoComplete='off'
                placeholder='••••••••'
                className={ `input ${ errors.password ? 'input-invalid' : '' }` }
              />
              <p className="registration-form__fieldset-error">
                {errors.password && <Alert message={ errors.password.message } />}
              </p>
            </fieldset>

            <fieldset className="registration-form__fieldset mb-3">
              <Label
                htmlFor="confirm-password"
                title={t('signup.confirm')}
              />
              <input
                id='confirm-password'
                type="password"
                name='passwordConfirm'
                { ...register('passwordConfirm')}
                autoComplete='off'
                placeholder='••••••••'
                className={ `input ${ errors.passwordConfirm ? 'input-invalid' : '' }` }
              />
              <p className="registration-form__fieldset-error">
                {errors.passwordConfirm && <Alert message={ errors.passwordConfirm.message } />}
              </p>
            </fieldset>

            <div className="registration-form__btn">
              <Button
                type="submit"
                title={t('signup.logBtn')}
              />
              <Link
                to="/login"
                className="registration-form__link"
              >{t('signup.login')}</Link>
            </div>
          </form>
          <div className='registration-legals'>
              {t('legals.text')}&nbsp;&nbsp;
              <Link className="registration-legals-link" to="/">{t('legals.condition')}</Link>
              &nbsp;&nbsp;{t('legals.and')}&nbsp;&nbsp;
              <Link className="registration-legals-link" to="/">{t('legals.privacy')}</Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Registration
