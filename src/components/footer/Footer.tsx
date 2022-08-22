import style from './Footer.module.css';

export const Footer = () => {
  return (
    <div className={style.footer}>
      <p>&copy; 2022</p>
      <ul className={style.footer_list}>
        <li>
          <a href="https://github.com/max-makk" target="_blank"> @max-makk </a>
        </li>
        <li>
          <a href="https://github.com/KateHubar" target="_blank"> @KateHubar </a>
        </li>
        <li>
          <a href="https://github.com/tankost" target="_blank"> @tankost </a>
        </li>
      </ul>
      <a className={style.footer_rss} target="_blank" href="https://rs.school/js/"></a>
    </div>
  );
};
