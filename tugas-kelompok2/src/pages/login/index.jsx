import { useEffect, useState } from "react";
import "./login.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    id: 0,
    username: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();

  // handle password visibility
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (sessionStorage.getItem("akun")) {
      return navigate("/");
    }
    const inputs = document.querySelectorAll(".input");

    function focusFunc() {
      let parent = this.parentNode.parentNode;
      parent.classList.add("focus");
    }

    function blurFunc() {
      let parent = this.parentNode.parentNode;
      if (this.value == "") {
        parent.classList.remove("focus");
      }
    }

    inputs.forEach((input) => {
      input.addEventListener("focus", focusFunc);
      input.addEventListener("blur", blurFunc);
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5240/api/Akun", form)
      .then((response) => {
        if (response.data.data.length < 1) {
          alert("Username Dan password yang anda masukan salah");
        } else if (response.data.data.length > 1) {
          alert("Sistem Error");
        } else {
          setForm(response.data.data[0]);
          sessionStorage.setItem("akun", JSON.stringify(form));
          return navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="body">
      <div className="container login">
        <div className="login-container">
          <div className="form">
            <form onSubmit={handleSubmit}>
              <img src="../src/img/avatar.svg" alt="" className="avatar" />
              <h2>Login</h2>
              <div className="input-div one">
                <div className="icon">
                  <i className="bi bi-envelope-at-fill"></i>
                </div>
                <div>
                  <h5>username</h5>
                  <input
                    className="input"
                    name="username"
                    onChange={handleChange}
                    value={form.username}
                  />
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
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                  />
                  <i
                    className={`password-icon ${
                      showPassword ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"
                    }`}
                    onClick={handlePasswordVisibility}
                  ></i>
                </div>
              </div>
              <button type="submit" className="button">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
