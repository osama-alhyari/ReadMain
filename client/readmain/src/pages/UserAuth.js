import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function UserAuth() {
  const [loginOrSignup, setLoginOrSignup] = useState("container top-24");

  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });

  const [signupState, setSignupState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [signupErrors, setSignupErrors] = useState({});

  const signupUser = async (name, email, password) => {
    const response = await axios.post(`${process.env.REACT_APP_API}/users`, {
      name,
      email,
      password,
    });
    console.log(response.data);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.id);
      window.location = "http://localhost:3000/viewbooks";
      // redirect("http://localhost:3000/viewbooks");
    }
    if (response.data.message) {
      toast.error(`${signupState.email} is already in use`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const loginUser = async (credentials) => {
    const response = await axios.post(`${process.env.REACT_APP_API}/users/login`, {
      email: credentials.email,
      password: credentials.password,
    });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.id);
      if (response.data.isAdmin) {
        window.location = "http://localhost:3000/addbooks"; /// change path to user home
      } else {
        window.location = "http://localhost:3000/viewbooks"; /// change path to admin home
      }
    }
    if (response.data.message) {
      toast.error(`No account with the email :${signupState.email} `, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (response.data.wrongCredentials) {
      toast.error(`Incorrect password`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    const signupValidationErrors = {};
    if (!signupState.name)
      signupValidationErrors.name = "Please insert your name";
    if (!signupState.email.match(/^[a-zA-Z0-9_]+@[a-zA-Z0-9-]+[.]+com*$/))
      signupValidationErrors.email = "Please provide a valid email";
    if (!signupState.password) {
      signupValidationErrors.password = "Please provide a password";
    } else if (!(signupState.password === signupState.confirmPassword))
      signupValidationErrors.confirmPassword = "Passwords do not match";
    // const emailCheck = await axios.get(
    //   `http://localhost:8000/api/users/${signupState.email}`
    // );
    // if (emailCheck.data.emailExists)
    //   signupValidationErrors.email = "Email already in use";

    setSignupErrors(signupValidationErrors);
    if (Object.keys(signupValidationErrors).length === 0) {
      signupUser(signupState.name, signupState.email, signupState.password);
    }
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    loginUser(loginState);
  };

  return (
    <div className={loginOrSignup} id="container">
      <div className="form-container sign-up-container">
        <form className="formauth" action="/viewbooks">
          <h1 className="h1auth">Create Account</h1>
          {signupErrors.name && <span>{signupErrors.name}</span>}
          <input
            className="inputauth"
            type="text"
            placeholder="Name"
            value={signupState.name}
            onChange={(e) =>
              setSignupState({
                ...signupState,
                name: e.target.value,
              })
            }
          />
          {signupErrors.email && <span>{signupErrors.email}</span>}
          <input
            className="inputauth"
            type="email"
            placeholder="Email"
            value={signupState.email}
            onChange={(e) =>
              setSignupState({
                ...signupState,
                email: e.target.value,
              })
            }
          />
          {signupErrors.password && <span>{signupErrors.password}</span>}
          <input
            className="inputauth"
            type="password"
            placeholder="Password"
            value={signupState.password}
            onChange={(e) =>
              setSignupState({
                ...signupState,
                password: e.target.value,
              })
            }
          />
          {signupErrors.confirmPassword && (
            <span>{signupErrors.confirmPassword}</span>
          )}
          <input
            className="inputauth"
            type="password"
            placeholder="Confirm Password"
            value={signupState.confirmPassword}
            onChange={(e) =>
              setSignupState({
                ...signupState,
                confirmPassword: e.target.value,
              })
            }
          />

          <button className="buttonauth" onClick={handleSignup}>
            Sign Up
          </button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form className="formauth" action="/viewbooks">
          <h1 className="h1auth">Sign in</h1>
          <input
            className="inputauth"
            type="email"
            placeholder="Email"
            value={loginState.email}
            onChange={(e) => {
              setLoginState({
                ...loginState,
                email: e.target.value,
              });
              console.log(loginState);
            }}
          />
          <input
            className="inputauth"
            type="password"
            placeholder="Password"
            value={loginState.password}
            onChange={(e) => {
              setLoginState({
                ...loginState,
                password: e.target.value,
              });
            }}
          />
          <a className="aauth" href="/">
            Forgot your password?
          </a>
          <button onClick={handleLogin} className="buttonauth">
            Sign In
          </button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1 className="h1auth">Welcome Back!</h1>
            <p className="pauth">
              To keep connected with us please login with your personal info
            </p>
            <button
              onClick={() => {
                setLoginOrSignup("container  top-24");
              }}
              className="buttonauth"
              id="signIn"
            >
              Sign In
            </button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1 className="h1auth">Hello, Friend!</h1>
            <p className="pauth">
              Enter your personal details and start journey with us
            </p>
            <button
              onClick={() => {
                setLoginOrSignup(loginOrSignup + " right-panel-active");
              }}
              className="buttonauth"
              id="signUp"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
