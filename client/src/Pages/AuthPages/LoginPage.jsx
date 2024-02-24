import { useRef, useState } from "react";
import { CurrentMode } from "../../../currentMode";
import { Link, useNavigate } from "react-router-dom";
import useUserContext from "../../hooks/useUserContext";

export default function LoginPage() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const Navigate = useNavigate();
  const [error, setError] = useState(null);
  const { dispatch } = useUserContext();

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    const serverUrl = CurrentMode.url + '/auth/login'
    const response = await fetch(serverUrl, {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)

    });

    const json = await response.json();

    if (response.ok) {
      console.log('Successful Registraion , User : ')
      console.log(json);
      dispatch({ type: 'login', payload: json });
      Navigate('/explore/courses');
    } else {

      console.error('Unsuccessful Registration')
      console.log(json);
      setError(json.message);
    }

  }


  return (
    <div className="mx-20 my-4 flex flex-col items-center justify-center gap-4">
      <div className="text-2xl font-bold">
        Log In to Existing Account
      </div>

      <form className="input-styles flex flex-col gap-[4px] justify-center text-lg" onSubmit={handleSubmit}>


        <label htmlFor="signupPage-emial">Email</label>
        <input type="text" id="signupPage-emial" ref={emailRef} required="true" />

        <label htmlFor="signupPage-password">Password</label>
        <input type="password" id="signupPage-password" ref={passwordRef} required="true" />

        <button type="submit" className="bg-purple-600 hover:bg-purple-800 py-2 text-white duration-100 font-bold">Login</button>

        <Link to="/user/signup" className="flex justify-center items-center mt-2 hover:">
          Don't have an Account? <span className="text-purple-600"> Register Now</span>
        </Link>

        {error && (
          <div className="flex justify-center items-center border-2 border-red-500 text-red-500 py-2">
            {error}
          </div>
        )}
      </form>
    </div>
  )
}