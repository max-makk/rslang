import style from './Team.module.css';

export const Team = () => {
  return (
    <div className={style.team_wrapper}>
      <p className={style.team_string}> Команда разработчиков:</p>
      <div className={style.team_string}>
        <a href="https://github.com/max-makk" target="_blank" rel="noreferrer">
          <div className={style.team_ava + ' ' + style.team_ava1}></div>
        </a>
        <article className={style.team_text}>
        <a href="https://github.com/max-makk" target="_blank" rel="noreferrer"> max-makk </a> - Team Lead, Frontend developer. Координация работы комды. Разработка архитектуры приложения. Настройка сервера и работы с ним. Разработка игры "Спринт"</article>
      </div>
      <div className={style.team_string}>
        <a href="https://github.com/KateHubar" target="_blank" rel="noreferrer">
          <div className={style.team_ava + ' ' + style.team_ava2}></div>
        </a>
        <article className={style.team_text}>
        <a href="https://github.com/KateHubar" target="_blank" rel="noreferrer"> KateHubar </a> - Frontend developer. Разработка главной страницы и формы авторизации. Разработка игры "Аудиовызов"</article>
      </div>
      <div className={style.team_string}>
        <a href="https://github.com/tankost" target="_blank" rel="noreferrer">
          <div className={style.team_ava + ' ' + style.team_ava3}></div>
        </a>
        <article className={style.team_text}>
        <a href="https://github.com/tankost" target="_blank" rel="noreferrer"> tankost </a> - Frontend developer. Разработка хедера и меню. Разработка учебника и словаря. </article>
      </div>
    </div>
  );
};
