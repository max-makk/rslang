import { Form } from '../../components/Form/Form';
import { Team } from '../../components/Team/Team';
import { Description } from '../../components/Description/Description';
import { Footer } from '../../components/Footer/Footer';
import style from './Home.module.css';

export const Home = () => {
  return <>
    <div className={style.home_wrapper}><Form/>
    <Description/>
    </div>
    <Team/>
    <Footer/>
  </>;
}
