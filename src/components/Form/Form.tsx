import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { useEffect, useState } from 'react';
import userService from '../../services/user';
import loginService from '../../services/login';
import registerService from '../../services/register';
import { loginUser, logoutUser } from '../../state/reducers/user';
import style from './Form.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const regSchema = yup
  .object({
    username: yup
      .string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    password: yup
      .string()
      .min(8, 'Too Short! Use 8 symbols and more.')
      .max(50, 'Too Long!')
      .required('Required'),
    email: yup.string().email('Invalid email').required('Required'),
  })
  .required();

const loginSchema = yup
  .object({
    password: yup
      .string()
      .min(8, 'Too Short! Use 8 symbols and more.')
      .max(50, 'Too Long!')
      .required('Required'),
    email: yup.string().email('Invalid email').required('Required'),
  })
  .required();

type LoginFormData = {
  password: string;
  email: string;
};

type RegistrationFormData = LoginFormData & {
  username: string;
};

export const Form = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const [loginVisible, setLoginVisible] = useState(false);
  const hideWhenVisible = { display: loginVisible ? 'none' : '' };
  const showWhenVisible = { display: loginVisible ? '' : 'none' };

  useEffect(() => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      dispatch(loginUser(userFromStorage))
    }
  }, []);

  const logout = () => {
    userService.clearUser();
    dispatch(logoutUser(null));
  };

  if (user === null) {
    return (
      <div className={style.login_form}>
        <div className={style.login_form_header}>
          <button
            onClick={() => setLoginVisible(true)}
            className={style.login_form_header_p}
          >
            Регистрация
          </button>
          <span>|</span>
          <button
            onClick={() => setLoginVisible(false)}
            className={style.login_form_header_p}
          >
            Вход
          </button>
        </div>
        <div style={hideWhenVisible}>
          <Login />
        </div>
        <div style={showWhenVisible}>
          <Registration displayLogin={setLoginVisible} />
        </div>
      </div>
    );
  }
  return (
    <div className={style.login_form + ' ' + style.login_form_greeting}>
      Привет, {(user as {name: string}).name}!
      <button onClick={logout} className={style.login_form_input + ' ' + style.login_form_btn}>Выйти</button>
    </div>
  );
};

const Login = () => {

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const login = ({ email, password }: LoginFormData) => {
    loginService
      .login({
        email: email,
        password: password,
      })
      .then((user) => {
        userService.setUser(user);

        dispatch(loginUser(user));
        alert(`${user.name}, вы вошли в приложение!`)
      })
      .catch(() => {
         alert('Неверное имя и/или пароль')
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit((data) => login(data))}>
        <div>
          <input
            className={style.login_form_input}
            placeholder="E-mail"
            {...register('email')}
          />
          <p className={style.red}>{errors.email?.message}</p>
        </div>
        <div>
          <input
            className={style.login_form_input}
            type="password"
            placeholder="Пароль"
            {...register('password')}
          />
          <p className={style.red}>{errors.password?.message}</p>
        </div>
        <button
          type="submit"
          className={style.login_form_input + ' ' + style.login_form_btn}
        >
          Войти
        </button>
      </form>
    </div>
  );
};

type showLogin = {
  displayLogin: (value: boolean) => void;
};

const Registration = ({ displayLogin }: showLogin) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(regSchema),
  });

  const createUser = ({username, email, password}: RegistrationFormData) => {
    registerService
      .createUser({
        name: username,
        email: email,
        password: password,
      })
      .then(() => displayLogin(false))
      .then(() => alert('Регистрация прошла успешно! Войдите в приложение.'))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit((data) => createUser(data))}>
        <div>
          <input
            className={style.login_form_input}
            placeholder="Имя"
            {...register('username')}
          />
          <p className={style.red}>{errors.username?.message}</p>
        </div>
        <div>
          <input
            className={style.login_form_input}
            placeholder="E-mail"
            {...register('email')}
          />
          <p className={style.red}>{errors.email?.message}</p>
        </div>
        <div>
          <input
            className={style.login_form_input}
            type="password"
            placeholder="Пароль"
            {...register('password')}
          />
          <p className={style.red}>{errors.password?.message}</p>
        </div>
        <button
          type="submit"
          className={style.login_form_input + ' ' + style.login_form_btn}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

