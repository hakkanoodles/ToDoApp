import { useContext, useState } from "react"
import { Context } from "../Context/IsAuthContext"
import { LensBlurTwoTone, Menu, Close } from "@mui/icons-material"
import { SvgIcon } from "@mui/material"
import axios from "axios"
import { server } from "../main"
import { toast } from "react-hot-toast"
import { NavLink } from "react-router-dom"
import AddTask from '../components/AddTask'
import AllTask from '../components/AllTask'

const Home = () => {
  const { isAuth, setIsAuth, setLoading, loading } = useContext(Context)
  const [menuToggle, setMenuToggle] = useState(false)

  const handleMenuToggle = () => {
    setMenuToggle(!menuToggle)
  }

  const handleLogout = async () => {
    setLoading(true)
    try {
      await axios.get(`${server}/user/logout`, {
        withCredentials: true
      })
      toast.success('Logout Successfully')
      setIsAuth(!isAuth)
      setLoading(false)
    }
    catch (error) {
      toast.error(error.response.data.message)
      setLoading(false)
    }
  }

  return (
    <main className="homePage">

      {isAuth ?
        <div >
          <div className="logo-side">
            <LensBlurTwoTone
              sx={{ color: "white", fontSize: 30 }}
            />
            <h5>To-Do App</h5>
          </div>
          <div className="toggleMenu">
          <SvgIcon
            className="menuIcon"
            sx={{ color: '#fff' }}
            component={menuToggle ? Close : Menu}
            onClick={handleMenuToggle}
          />
            {menuToggle ?
              <div className="menu-items">
                <NavLink to={'/profile'} className="navLink" >
                  <button >
                    Profile
                  </button>
                </NavLink>
                <button className="link" disabled={loading} onClick={handleLogout}> Log out </button>
              </div> :
              ''
            }

          </div>
          <div className="tasks">
            <AddTask />
            <AllTask />
          </div>
        </div>
        : <div className="loggedOut">
          <div className="brand">
            <LensBlurTwoTone
              sx={{ color: "white", fontSize: 300 }}
            />
            <h2 className="brand-name">To-Do App</h2>
          </div>
          <div className="getInto">
            <NavLink to={'/signup'} className='link'>
              <span>
                Signup
              </span>
            </NavLink>
            or
            <NavLink to={'/login'} className='link'>
              <span>
                Login
              </span>
            </NavLink>
          </div>
        </div>}
    </main>
  )
}

export default Home
