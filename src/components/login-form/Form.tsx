import style from './Form.module.css';

export const Form = () => {
  return (
    <form className={style.login_form}>
      {/*       <p className={style.login_form_user}>Пользователь:</p>
       <p>
        <input className={style.login_form_input} type="username" id="username" name="username" placeholder='Имя' />
      </p> */}
      <p>
        <input className={style.login_form_input} type="email" id="email" name="email" placeholder='E-mail' />
      </p>
      <p>
        <input className={style.login_form_input} type="password" id="password" name="password" placeholder='Пароль' />
      </p>
      <input className={style.login_form_input + ' ' + style.login_form_btn + ' ' + style.login_form_btn_show} type="submit" value={'Войти'} />
      <input className={style.login_form_input + ' ' + style.login_form_btn + ' ' + style.login_form_btn_show} type="submit" value={'Зарегистрироваться'} />
    </form>
  );
};
