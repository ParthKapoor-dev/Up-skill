import { useState, useEffect } from "react";
import { CurrentMode } from "../../../currentMode"
import useUserContext from "../../hooks/useUserContext";
import { useNavigate } from "react-router";

import SampleSkillImage from "../../../public/Images/sample skill image.jpg"

export default function CourseListingPage() {

  const [courses, setCourses] = useState();
  const [loading, setLoading] = useState(true);
  const { token } = useUserContext();


  useEffect(() => {
    if (token) fetchRelatedCourses(token, setCourses, setLoading);
  })


  if (loading)
    return (
      <div>
        Loading Please Wait;
      </div>
    );


  if (courses?.length == 0)
    return (

      <div>
        We have no Courses to sell , Please come sometime later
      </div>
    )


  return (

    <div className="mx-20 my-10">
      <div className="flex justify-center items-center font-bold text-xl mb-4">
        Explore New Courses here
      </div>
      <div className="flex gap-4">
        {courses.map(item => (
          <Course course={item} key={item._id} />
        ))}
      </div>
    </div>
  )
};


function Course({ course }) {
  const Navigate = useNavigate();

  function handleCourse() {
    Navigate('/course/' + course.name, { state: { course } })
  }

  return (
    <div className="w-[20vw] text-lg border-2 border-slate-200 rounded py-2 px-4 cursor-pointer" onClick={handleCourse}>
      <div>
        <img src={SampleSkillImage} />
      </div>
      <div className="text-lg font-bold ">
        {course.name}
      </div>
      <div className="text-base">
        {course.instructor.name}
      </div>
      <div className="font-semibold">
        ₹ {course.price}
      </div>
      <div className="text-sm bg-purple-400 rounded text-white w-fit px-2 py-[4px] ">
        {course.topics}
      </div>
    </div>
  )
}


async function fetchRelatedCourses(token, setCourses, setLoading) {

  const serverUrl = CurrentMode.url + '/courses/list-course';

  console.log(token);

  const response = await fetch(serverUrl, {
    method: "GET",
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  const json = await response.json();

  if (response.ok) {
    console.log(json);
    setCourses(json);
    setLoading(false);

  }
  else {
    console.error(json);
  }
}