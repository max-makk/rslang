import style from './Header.module.css';

export const Header = () => {
  return <header className={style.header}>
    <a href={'/'} className={style.headerLink + ' ' + style.headerLogo}>RSlang</a>
    <nav className={style.headerNav}>
      <ul className={style.headerList}>
        <li>
          <a href={'/'} className={style.headerLink}>Главная</a>
        </li>
        <li>
          <a href={'/textbook'} className={style.headerLink}>Учебник</a>
        </li>
        <li>
          <a href={'/games'} className={style.headerLink}>Игры</a>
        </li>
        <li>
          <a href={'/statistics'} className={style.headerLink}>Статистика</a>
        </li>
      </ul>
    </nav>
  </header>
}
