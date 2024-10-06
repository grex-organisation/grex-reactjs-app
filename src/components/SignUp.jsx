import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assests/grex.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faUserSecret, faCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function SignUp() {

  const [globalError, setGlobalError] = useState("");
  const [userNameErrorMessage, setUserNameErrorMessage] = useState('');
  const [userEmailErrorMessage, setUserEmailErrorMessage] = useState('');
  const [userPasswordErrorMessage, setUserPasswordErrorMessage] = useState('');

  const [isGlobalError, setIsGlobalError] = useState(false);
  const [isValidUserName, setIsValidUserName] = useState(false);
  const [isValidUserEmail, setIsValidUserEmail] = useState(false);
  const [isValidUserPassword, setIsValidUserPassword] = useState(false);

  const [formData, setFormData] = useState({ userName: "", email: "", password: "" });

  const navigate = useNavigate();

  const onChangeFieldValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const commonGlobalError = (error) => {
    setIsGlobalError(true);
    setGlobalError(error.response?.data?.data?.error || "Something went wrong. Please try again.");
  }

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://sambha.in/api/grex/auth/signup', formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.data.code === 200) {
        navigate('/login');
      }
    } catch (error) {
      commonGlobalError(error);
    }
  }

  const validateUsername = () => {
    const username = formData.userName.trim();
    const regex = /^[0-9a-zA-Z_]+$/;
    if (username && username.length >= 8 && username.length <= 20 && regex.test(username)) {
      setIsValidUserName(true);
      setUserNameErrorMessage("");
    } else {
      setIsValidUserName(false);
      setUserNameErrorMessage("Username must be 8-20 characters long and can only contain letters, numbers, and underscores.");
    }
  }

  const validateEmail = () => {
    const email = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && email.length >= 8 && email.length <= 40 && emailRegex.test(email)) {
      setIsValidUserEmail(true);
      setUserEmailErrorMessage("");
    } else {
      setIsValidUserEmail(false);
      setUserEmailErrorMessage("Invalid email format.");
    }
  }

  const validatePassword = () => {
    const password = formData.password.trim();
    const passwordRegex = /^(?=.*[A-Z])[A-Za-z0-9_@]+$/;
    if (password && password.length >= 8 && password.length <= 20 && passwordRegex.test(password)) {
      setIsValidUserPassword(true);
      setUserPasswordErrorMessage("");
    } else {
      setIsValidUserPassword(false);
      setUserPasswordErrorMessage("Password must be 8-20 characters long and include at least one uppercase letter.");
    }
  }

  return (
    <div className="container">
      <div className="columns my-6 is-centered">
        <div className="column is-one-third has-text-centered">
          <figure className="image is-128x128 is-inline-block">
            <img src={logo} alt="Logo" />
          </figure>
        </div>
      </div>

      <div className="columns my-6 is-centered">
        <div className="column is-one-third">
          <form className="box" onSubmit={onFormSubmit}>
            {isGlobalError && <p className="is-size-6 has-text-weight-bold has-text-centered help is-bold is-danger">{globalError}</p>}

            <div className="field">
              <label className="label">Username</label>
              <div className="control has-icons-left has-icons-right">
                <input className={`input ${isValidUserName ? 'is-success' : isValidUserName === false ? 'is-danger' : ''}`}
                  type="text" name="userName" onChange={onChangeFieldValue} onBlur={validateUsername} placeholder="tim_david007" />
                <span className="icon is-small is-left has-text-black">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                {isValidUserName && <span className="icon is-small is-right has-text-success"><FontAwesomeIcon icon={faCheck} /></span>}
              </div>
              {!isValidUserName && <p className="help is-danger">{userNameErrorMessage}</p>}
            </div>

            <div className="field">
              <label className="label">Email</label>
              <div className="control has-icons-left has-icons-right">
                <input className={`input ${isValidUserEmail ? 'is-success' : isValidUserEmail === false ? 'is-danger' : ''}`}
                  type="email" name="email" onChange={onChangeFieldValue} onBlur={validateEmail} placeholder="tim.david@domain.com" />
                <span className="icon is-small is-left has-text-black">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                {isValidUserEmail && <span className="icon is-small is-right has-text-success"><FontAwesomeIcon icon={faCheck} /></span>}
              </div>
              {!isValidUserEmail && <p className="help is-danger">{userEmailErrorMessage}</p>}
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control has-icons-left has-icons-right">
                <input className={`input ${isValidUserPassword ? 'is-success' : isValidUserPassword === false ? 'is-danger' : ''}`}
                  type="password" name="password" onChange={onChangeFieldValue} onBlur={validatePassword} placeholder="********" />
                <span className="icon is-small is-left has-text-black">
                  <FontAwesomeIcon icon={faUserSecret} />
                </span>
                {isValidUserPassword && <span className="icon is-small is-right has-text-success"><FontAwesomeIcon icon={faCheck} /></span>}
              </div>
              {!isValidUserPassword && <p className="help is-danger">{userPasswordErrorMessage}</p>}
            </div>

            <div className="field">
              <div className="control">
                <button type="submit" className={`button is-fullwidth ${isValidUserName && isValidUserEmail && isValidUserPassword ? 'is-warning' : 'is-static'}`} disabled={!(isValidUserName && isValidUserEmail && isValidUserPassword)}>
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
