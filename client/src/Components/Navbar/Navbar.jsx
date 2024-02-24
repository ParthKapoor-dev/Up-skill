import { Link } from "react-router-dom";
import useUserContext from "../../hooks/useUserContext"

import "./navbar.css"

export default function Navbar() {

  const { user, dispatch } = useUserContext();

  function handleLogout() {
    dispatch({ type: 'logout' })
  }

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b-[0.5px] border-b-slate-300" >
      <div className="flex justify-center items-center">
        <Link to="/explore/courses" className="cursor-pointer text-2xl text-purple-600 font-bold">
          UpSkill
        </Link>
        {user && (
          <input type="text" className='rounded-3xl px-6 py-2 w-[25vw] border-2 border-grey-200 text-lg ml-4' />

        )}
      </div>

      <div className="flex gap-4">

        {user && (
          <>
            {!user?.isStudent ? (
              <Link to="/courses/add-new">
                Upload Course
              </Link>
            ) : (
              <Link to="/my-credits">
                My Credits
              </Link>
            )}
            <Link to="/classroom">
              Classroom
            </Link>
          </>
        )}
        {user?._id ? (
          <>
            <div className="cursor-pointer px-2 py-2 border-2">
              {user.name}
            </div>

            <div className="cursor-pointer px-2 py-2 border-2 " onClick={handleLogout}>
              Logout
            </div>
          </>
        ) : (
          <>
            <Link to="/user/login" className="cursor-pointer px-2 py-2 border-2 border-purple-600 text-purple-600 font-bold hover:bg-slate-200 duration-100">
              Log In
            </Link>
            <Link to="/user/signup" className="cursor-pointer px-2 py-2 border-2 border-purple-600 bg-purple-600 font-bold text-white hover:bg-purple-800 hover:border-purple-800">
              SignUp
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}