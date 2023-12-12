import { useEffect, useState } from 'react';
import './login.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  // handle password visibility
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const inputs = document.querySelectorAll('.input');

    function focusFunc() {
      let parent = this.parentNode.parentNode;
      parent.classList.add('focus');
    }

    function blurFunc() {
      let parent = this.parentNode.parentNode;
      if (this.value == '') {
        parent.classList.remove('focus');
      }
    }

    inputs.forEach((input) => {
      input.addEventListener('focus', focusFunc);
      input.addEventListener('blur', blurFunc);
    });
  }, []);

  return (
    <div className="body">
      <div className="container login">
        <div className="login-container">
          <div className="form">
            <img
              src="../src/img/avatar.svg"
              alt=""
              className="avatar"
            />
            <h2>Login</h2>
            <div className="input-div one">
              <div className="icon">
                <i className="bi bi-envelope-at-fill"></i>
              </div>
              <div>
                <h5>Email</h5>
                <input className="input" />
              </div>
            </div>
            <div className="input-div two">
              <div className="icon">
                <i className="bi bi-key-fill"></i>
              </div>
              <div>
                <h5>Password</h5>

                <input
                  className="input"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                />
                <i
                  className={`password-icon ${showPassword ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'}`}
                  onClick={handlePasswordVisibility}
                ></i>
              </div>
            </div>
            <a className="link">Forgot Password?</a>
            <button
              type="submit"
              className="button"
            >
              Login
            </button>
            <p className="social-text">Or Sign in with social platform</p>
            <div className="social-media">
              <a
                href="#"
                className="social-icon"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="#"
                className="social-icon"
              >
                <i className="bi bi-twitter-x"></i>
              </a>
              <a
                href="#"
                className="social-icon"
              >
                <i className="bi bi-google"></i>
              </a>
              <a
                href="#"
                className="social-icon"
              >
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
            <p className="account-text">
              Dont have an account?
              <a
                href="#"
                id="sign-up-btn2"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
