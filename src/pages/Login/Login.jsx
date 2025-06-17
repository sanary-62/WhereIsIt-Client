import React, { useContext } from "react";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import loginLottie from "../../assets/Lotties/Login.json";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loginUser, loginWithGoogle } = useContext(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    loginUser(email, password)
      .then(async (result) => {
        const user = result.user;

        const token = await user.getIdToken();

        localStorage.setItem("access-token", token);

        console.log("User token:", token);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then(async (result) => {
        const user = result.user;
        const token = await user.getIdToken();

        localStorage.setItem("access-token", token);

        console.log("Logged in with Google, token:", token);
        navigate("/");
      })
      .catch((error) => {
        console.error("Google Login Error:", error);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen px-4">
      <div className="hero-content flex flex-col lg:flex-row-reverse items-center gap-6">
        <div
          style={{
            width: "100%",
            maxWidth: "650px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Lottie
            style={{
              width: "100%",
              maxWidth: "650px",
              height: "auto",
            }}
            animationData={loginLottie}
            loop={true}
          />
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-3xl lg:text-5xl font-bold text-blue-800 text-center lg:text-left">
              Login now!
            </h1>
            <form onSubmit={handleLogin}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input w-full"
                  placeholder="Email"
                  required
                />

                <label className="label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="input w-full"
                  placeholder="Password"
                  required
                />
                <div>
                  <Link
                    to="/register"
                    className="link link-hover text-blue-700 text-sm"
                  >
                    Do not have an account? Register
                  </Link>
                </div>
                <button className="btn btn-neutral mt-4 bg-blue-900 text-white w-full">
                  Login
                </button>
              </fieldset>
            </form>
            <div className="flex items-center gap-4 my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="text-gray-500 text-sm">OR</span>
              <hr className="flex-grow border-gray-300" />
            </div>
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="btn mt-2 bg-blue-100 w-full flex items-center justify-center gap-2 text-gray-500"
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
