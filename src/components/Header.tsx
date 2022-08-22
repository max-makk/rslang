import style from './Header.module.css';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export const Header = () => {
  return <header className={style.header}>
    <Link to={'/'} className={style.headerLink + ' ' + style.headerLogo}>RSlang</Link>
    <nav className={style.headerNav}>
      <ul className={style.headerList}>
        <CustomLink to={'/'} className={style.headerLink}>Главная</CustomLink>
        <CustomLink to={'/textbook'} className={style.headerLink}>Учебник</CustomLink>
        <CustomLink to={'/games'} className={style.headerLink}>Игры</CustomLink>
        <CustomLink to={'/statistics'} className={style.headerLink}>Статистика</CustomLink>
      </ul>
    </nav>
  </header>
}

const CustomLink = ({to, children, ...props}: { to: string, children: string, className: string }) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch( {path: resolvedPath.pathname, end: true} )
  return (
      <li className={isActive ? style.active : ''}>
        <Link to={to} {...props}>{children}</Link>
      </li>
  )
}
