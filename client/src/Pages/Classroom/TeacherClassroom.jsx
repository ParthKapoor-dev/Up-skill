import { useState, useEffect } from "react";
import { CurrentMode } from "../../../currentMode";
import useUserContext from "../../hooks/useUserContext"

import SampleSkillImage from "../../../public/Images/sample skill image.jpg"
import { useNavigate } from "react-router";


export default function TeacherClassroom() {

  const { user, token } = useUserContext();
  const [courses, setCourses] = useState();

  useEffect(() => {
    if (token) fetchMyCourses(token, user, setCourses);
  }, []);

  if (!courses?.length)
    return "No Uploaded Courses"

  return (
    <div>
      <div className="bg-zinc-800 text-white h-[20vh] px-60 py-10 font-bold text-4xl">
        My Courses
      </div>
      <div className="flex flex-col px-60 py-10 gap-4">
        {courses.map(item => (
          <Course course={item} key={item._id} />
        ))}
      </div>
    </div>
  )
};


function Course({ course }) {

  const Navigate = useNavigate();

  function handleCoursePage() {
    Navigate('/my-courses/' + course.name, { state: { course } })
  }

  return (
    <div className="flex gap-4 items-center cursor-pointer">
      <div>
        <img src={SampleSkillImage} className="h-[14vh] w-[10vw] object-contain" />
      </div>
      <div onClick={handleCoursePage} className="font-semibold text-2xl w-[30vw]">
        {course.name}
        <div className="font-normal text-base">
          {course.instructor.name}
        </div>
      </div>

    </div>
  )
}


async function fetchMyCourses(token, user, setCourses) {

  const serverUrl = CurrentMode.url + '/courses/my-courses';
  const response = await fetch(serverUrl, {
    method: "GET",
    'headers': {
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  const json = await response.json();

  if (response.ok) {
    console.log(json);
    setCourses(json)
  } else {
    console.error(json);
  }
}