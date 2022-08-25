import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import style from './Form.module.css';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { registerUser, userLogin } from '../../state/thunks';

const schema = yup
  .object({
    username: yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
    //.required('Required')
    password: yup
      .string()
      .min(6, 'Too Short! Use 6 symbols and more.')
      .max(50, 'Too Long!')
      .required('Required'),
    email: yup.string().email('Invalid email').required('Required'),
  })
  .required();

type FormData = {
  username: string;
  password: string;
  email: string;
};

const Registration = ({ onSubmit }: { onSubmit: (data: FormData) => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="Имя"
        {...register('username')}
        className={style.login_form_input}
        type="username"
        id="username"
        name="username"
      />
      <p className={style.red}>{errors.username?.message}</p>

      <input
        placeholder="E-mail"
        {...register('email')}
        className={style.login_form_input}
        type="email"
        id="email"
        name="email"
      />
      <p className={style.red}>{errors.email?.message}</p>

      <input
        placeholder="Пароль"
        type="password"
        {...register('password')}
        className={style.login_form_input}
        id="password"
        name="password"
      />
      <p className={style.red}>{errors.password?.message}</p>

      <input
        type="submit"
        className={style.login_form_input + ' ' + style.login_form_btn}
        value={'Зарегистрироваться'}
      />
    </form>
  );
};

const Login = ({ onSubmit }: { onSubmit: (data: FormData) => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="E-mail"
        {...register('email')}
        className={style.login_form_input}
        type="email"
        id="email"
        name="email"
      />
      <p className={style.red}>{errors.email?.message}</p>

      <input
        placeholder="Пароль"
        type="password"
        {...register('password')}
        className={style.login_form_input}
        id="password"
        name="password"
      />
      <p className={style.red}>{errors.password?.message}</p>

      <input
        type="submit"
        className={style.login_form_input + ' ' + style.login_form_btn}
        value={'Войти'}
      />
    </form>
  );
};

enum FormView {
  USERS,
  LOGIN,
  REGISTE,
}

export const Form = () => {
  const [view, setView] = useState(FormView.LOGIN);
  const { userInfo, userToken, success, loading, error } = useAppSelector(
    (state) => state.user
  );

  console.log(userInfo);

  useEffect(() => {
    if (userInfo) {
      setView(FormView.USERS);
    }
  }, [view, userInfo?.userId, userInfo]);

  const dispatch = useAppDispatch();

  const login = ({ email, password }: FormData) => {
    dispatch(userLogin({ email, password }));
  };

  const register = ({ username, email, password }: FormData) => {
    dispatch(registerUser({ name: username, email, password }));
  };

  const renderSwitchView = (view: FormView) => {
    switch (view) {
      case FormView.USERS:
        return <div>{userInfo?.name}</div>;
      case FormView.LOGIN:
        return <Login onSubmit={login} />;
      case FormView.REGISTE:
        return <Registration onSubmit={register} />;
      default:
        return <div>Hello!!!</div>;
    }
  };

  return (
    <>
      <div className={style.login_form}>
        <div className={style.login_form_header}>
          {userInfo && (
            <p
              onClick={() => setView(FormView.USERS)}
              className={view === FormView.USERS ? style.active : ''}
            >
              Пользователь
            </p>
          )}

          {!userInfo && (
            <>
              <p
                onClick={() => setView(FormView.LOGIN)}
                className={view === FormView.LOGIN ? style.active : ''}
              >
                Вход
              </p>
              <span>|</span>
              <p
                onClick={() => setView(FormView.REGISTE)}
                className={view === FormView.REGISTE ? style.active : ''}
              >
                Регистрация
              </p>
            </>
          )}
        </div>
        {renderSwitchView(view)}
      </div>
    </>
  );
};
