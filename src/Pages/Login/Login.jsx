import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/CreateContext";

const Login = () => {
  const location = useLocation();

  const { loginUser, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleLoginUser = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    loginUser(email, password)
      .then((userCredential) => {
        // console.log(userCredential);
        setError("");
        navigate(location.state || "/");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-credential":
            toast.error("Invalid email or password. Please try again.");
            break;
          case "auth/invalid-email":
            toast.error("Please enter a valid email format.");
            break;
          case "auth/user-disabled":
            toast.error(
              "This account has been disabled. Please contact support."
            );
            break;
          case "auth/too-many-requests":
            toast.error("Too many login attempts. Please try again later.");
            break;
          case "auth/network-request-failed":
            toast.error(
              "Network error. Please check your internet connection."
            );
            break;
          default:
            toast.error(`Login failed: ${error.message}`);
        }
      });
  };

  const googleLoginBtn = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        toast.success("Login Success");
        console.log(user);
        setError("");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="flex justify-center items-center h-[97vh]">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>
        <form onSubmit={handleLoginUser}>
          <label className="label">Email</label>
          <input
            name="email"
            type="email"
            className="input"
            placeholder="Email"
            required
          />

          <label className="label">Password</label>
          <input
            name="password"
            type="password"
            className="input"
            placeholder="Password"
            required
          />

          <button className="w-full btn btn-neutral mt-4">Login</button>
        </form>

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
          don't have an account{" "}
          <Link to={"/register"} className="text-blue-700 underline">
            sign up
          </Link>
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
