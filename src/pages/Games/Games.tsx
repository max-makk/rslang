import { Outlet, Link } from "react-router-dom"
import { AudioGame } from "../AudioGame/AudioGame"
import { Sprint } from "../Sprint/Sprint"

export const Games = () => {

  return (
    <div>
      <div>
        <Link to="/games/audiogame">Аудиовызов</Link>
        <Link to="/games/sprint">Спринт</Link>
        <Outlet />
      </div>
    </div>
  )
}