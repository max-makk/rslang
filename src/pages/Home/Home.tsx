import style from './Home.module.css';

export const Home = () => {
  return (
    <div className={style.team_wrapper}>
      <div className={style.team_string}>
        <a href="https://github.com/max-makk" target="_blank" rel="noreferrer">
          <div className={style.team_ava + ' ' + style.team_ava1}></div>
        </a>
        <article className={style.team_text}>Team Lead, Frontend developer. Координация работы комды. Разработка архитектуры приложения. Настройка сервера и работы с ним.</article>
      </div>
      <div className={style.team_string}>
        <a href="https://github.com/KateHubar" target="_blank" rel="noreferrer">
          <div className={style.team_ava + ' ' + style.team_ava2}></div>
        </a>
        <article className={style.team_text}>Frontend developer. Разработка главной страницы и формы авторизации.</article>
      </div>
      <div className={style.team_string}>
        <a href="https://github.com/tankost" target="_blank" rel="noreferrer">
          <div className={style.team_ava + ' ' + style.team_ava3}></div>
        </a>
        <article className={style.team_text}>Frontend developer. Разработка хедера и меню. Разработка словаря. </article>
      </div>
    </div>
  );
};
