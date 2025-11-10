import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router";

const Register = () => {
  const [passState, setPassState] = useState(false);
  const [UppercaseState, setUppercaseState] = useState(false);
  const [LowercaseState, setLowercaseState] = useState(false);
  const [LengthState, setLengthState] = useState(false);
  const [hidePass, setHidePass] = useState(true);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    const password = e.target.password.value;
    console.log(name, email, photoURL, password);
  };

  const passVerify = (e) => {
    const passValue = e.target.value;
    const Uppercase = /^(?=.*[A-Z]).+$/;
    const Lowercase = /^(?=.*[a-z]).+$/;
    const Length = /^.{6,}$/;
    console.log(passValue);

    if (passValue) {
      setPassState(true);
      if (Uppercase.test(passValue)) setUppercaseState(true);
      else setUppercaseState(false);
      if (Lowercase.test(passValue)) setLowercaseState(true);
      else setLowercaseState(false);
      if (Length.test(passValue)) setLengthState(true);
      else setLengthState(false);
    } else setPassState(false);
  };
  return (
    <form
      onSubmit={handleRegister}
      className="flex justify-center items-center h-[97vh]"
    >
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Register</legend>

        <label className="label">Name</label>
        <input name="name" type="text" className="input" placeholder="Name" />

        <label className="label">Email</label>
        <input
          name="email"
          type="email"
          className="input"
          placeholder="Email"
        />

        <label className="label">Photo URL</label>
        <input
          name="photoURL"
          type="text"
          className="input"
          placeholder="Photo URL"
        />

        <label className="label">Password</label>
        <input
          onChange={passVerify}
          name="password"
          type={hidePass ? "password" : "text"}
          className="input"
          placeholder="Password"
        />
        <spam
          className="z-50 absolute left-75 top-4"
          type="button"
          onClick={() => setHidePass(!hidePass)}
        >
          {hidePass ? <FaEye /> : <FaEyeSlash />}
        </spam>
        {passState && (
          <>
            <p className={UppercaseState ? "text-green-500" : "text-red-500"}>
              Must have an Uppercase letter in the password
            </p>
            <p className={LowercaseState ? "text-green-500" : "text-red-500"}>
              Must have a Lowercase letter in the password
            </p>
            <p className={LengthState ? "text-green-500" : "text-red-500"}>
              Length must be at least 6 character
            </p>
          </>
        )}

        <button className="btn btn-neutral mt-4">Sign Up</button>
        <p>
          already have an account{" "}
          <Link to={"/login"} className="text-blue-700 underline">
            sign in
          </Link>
        </p>
      </fieldset>
    </form>
  );
};

export default Register;
