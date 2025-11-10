import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router";
import { AuthContext } from "../../Context/CreateContext";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const { registerUser, setLoading, updateUser, googleLogin } =
    useContext(AuthContext);
  const [error, setError] = useState("");
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
    registerUser(email, password)
      .then((userCredential) => {
        console.log(userCredential);
        updateUser(name, photoURL)
          .then(() => {
            setError("");
            setLoading(false);
            toast.success("User Register Success");
          })
          .catch((error) => {
            switch (error.code) {
              case "auth/email-already-in-use":
                toast.error("This email is already registered.");
                setError("This email is already registered.");
                break;
              case "auth/invalid-email":
                toast.error("Please enter a valid email address.");
                setError("Please enter a valid email address.");
                break;
              case "auth/weak-password":
                toast.error("Password is too weak (min. 6 characters).");
                setError("Password is too weak (min. 6 characters).");
                break;
              case "auth/network-request-failed":
                toast.error("Network error. Please check your connection.");
                setError("Network error. Please check your connection.");
                break;
              default:
                toast.error(error.message);
                setError(error.message);
            }
          });
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            toast.error("This email is already registered.");
            setError("This email is already registered.");
            break;
          case "auth/invalid-email":
            toast.error("Please enter a valid email address.");
            setError("Please enter a valid email address.");
            break;
          case "auth/weak-password":
            toast.error("Password is too weak (min. 6 characters).");
            setError("Password is too weak (min. 6 characters).");
            break;
          case "auth/network-request-failed":
            toast.error("Network error. Please check your connection.");
            setError("Network error. Please check your connection.");
            break;
          default:
            toast.error(error.message);
            setError(error.message);
        }
      });
  };

  const googleLoginBtn = () => {
      googleLogin()
        .then((result) => {
          const user = result.user;
          toast.success(`Login Success use ${user.displayName}`);
          // console.log(user);
          setError("");
          navigate("/");
        })
        .catch((error) => {
          toast.error(error.message);
        });
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
    <div
      
      className="flex justify-center items-center h-[97vh]"
    >
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Register</legend>
        <form onSubmit={handleRegister}>

        <label className="label">Name</label>
        <input
          required
          name="name"
          type="text"
          className="input"
          placeholder="Name"
        />

        <label className="label">Email</label>
        <input
          name="email"
          type="email"
          className="input"
          placeholder="Email"
          required
        />

        <label className="label">Photo URL</label>
        <input
          required
          name="photoURL"
          type="text"
          className="input"
          placeholder="Photo URL"
        />

        <label className="label">Password</label>
        <div className=" relative">
          <input
            required
            onChange={passVerify}
            name="password"
            type={hidePass ? "password" : "text"}
            className="input"
            placeholder="Password"
          />
          <span
            className="z-50 absolute left-65 top-4"
            type="button"
            onClick={() => setHidePass(!hidePass)}
          >
            {hidePass ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
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

        <button className="btn-primary w-full mt-3">Sign Up</button>

        </form>

        {/* {error && <p className="text-red-500">{error}</p>} */}
      


      <div className="divider">OR</div>

      <button
            onClick={googleLoginBtn}
            className="btn bg-amber-100 text-black border-[#e5e5e5]"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>


        <p>
          already have an account{" "}
          <Link to={"/login"} className="text-blue-700 underline">
            sign in
          </Link>
        </p>
        </fieldset>
    </div>

  );
};

export default Register;
