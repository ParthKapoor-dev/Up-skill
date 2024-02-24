import { Route, Routes, useNavigate } from 'react-router-dom'

// Components
import LoginPage from './Pages/AuthPages/LoginPage'
import SignupPage from './Pages/AuthPages/SignupPage'
import CourseListingPage from './Pages/Course Pages/CourseListingPage'
import CreateCoursePage from './Pages/Course Pages/CreateCoursePage'
import Navbar from './Components/Navbar/Navbar'
import useUserContext from './hooks/useUserContext'
import DisplayCoursePage from './Pages/Course Pages/DisplayCoursePage'
import TeacherClassroom from './Pages/Classroom/TeacherClassroom'
import StudentClassroom from './Pages/Classroom/StudentClassroom'
import MyCourse from './Pages/Course Pages/MyCourse'

export default function App() {

  const { user } = useUserContext();
  const Navigate = useNavigate();

  return (
    <div className="app-div">
      <Navbar />
      <Routes>
        {/* <Route path='/' element={!user ? <Navigate to='/user/login' /> : <Navigate to='/explore/courses'/>} /> */}
        <Route path="/user/login" element={user ? <Navigate to='/' /> : <LoginPage />} />
        <Route path='/user/signup' element={user ? <Navigate to='/' /> : <SignupPage />} />
        <Route path='/explore/courses' element={!user ? <Navigate to='/user/login' /> : <CourseListingPage />} />
        <Route path='/courses/add-new' element={!user ? <Navigate to='/user/login' /> : <CreateCoursePage />} />
        <Route path='/course/:id' element={!user ? <Navigate to='/user/login' /> : <DisplayCoursePage />} />
        <Route path='/classroom' element={user ? (user.isStudent ? <StudentClassroom /> : <TeacherClassroom />) : <Navigate to='/user/login' />} />
        <Route path='/my-courses/:id' element={!user?.isStudent ? <MyCourse /> : <Navigate to='/explore/courses' />} />
      </Routes>
    </div>
  )
}