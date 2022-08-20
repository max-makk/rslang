import style from './Header.module.css';

export const Header = () => {
  return <header className={style.header}>
    <a href={'/'} className={style.headerLink + ' ' + style.headerLogo}>RSlang</a>
    <nav className={style.headerNav}>
      <ul className={style.headerList}>
        <CustomLink href={'/'} className={style.headerLink}>Главная</CustomLink>
        <CustomLink href={'/textbook'} className={style.headerLink}>Учебник</CustomLink>
        <CustomLink href={'/games'} className={style.headerLink}>Игры</CustomLink>
        <CustomLink href={'/statistics'} className={style.headerLink}>Статистика</CustomLink>
      </ul>
    </nav>
  </header>
}

const CustomLink = ({href, children, ...props}: { href: string, children: string, className: string }) => {
  const path = window.location.pathname;
  return (
      <li className={path === href ? style.active : ''}>
        <a href={href} {...props}>{children}</a>
      </li>
  )
}
