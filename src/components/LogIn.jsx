import React, { useState } from 'react';
import logo from '../assests/grex.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setToken } from '../services/JWTService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUserSecret, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function LogIn() {
  const [globalError, setGlobalError] = useState('');
  const [userEmailErrorMessage, setUserEmailErrorMessage] = useState('');
  const [userPasswordErrorMessage, setUserPasswordErrorMessage] = useState('');

  const [isGlobalError, setIsGlobalError] = useState(false);
  const [isValidUserEmail, setIsValidUserEmail] = useState(false);
  const [isValidUserPassword, setIsValidUserPassword] = useState(false);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  function onChangeFieldValue(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleGlobalError(error) {
    setIsGlobalError(true);
    setGlobalError(error.response?.data?.data?.error || 'An unexpected error occurred');
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post('https://sambha.in/api/grex/auth/login', formData);
      if (response.data.code === 200) {
        setToken(response.data.data.token);
        navigate('/dashboard');
      }
    } catch (error) {
      handleGlobalError(error);
    }
  }

  function validateEmail() {
    const email = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && emailRegex.test(email)) {
      setIsValidUserEmail(true);
      setUserEmailErrorMessage('');
    } else {
      setIsValidUserEmail(false);
      setUserEmailErrorMessage('Invalid email format');
    }
  }

  function validatePassword() {
    const password = formData.password.trim();
    const passwordRegex = /^(?=.*[A-Z])[A-Za-z0-9_@]+$/;

    if (password && passwordRegex.test(password)) {
      setIsValidUserPassword(true);
      setUserPasswordErrorMessage('');
    } else {
      setIsValidUserPassword(false);
      setUserPasswordErrorMessage('Password must be 8-20 characters with at least one uppercase letter');
    }
  }

  return (
    <div className="container mt-6">
      <div className="columns is-centered">
        <div className="column is-one-third">
          <figure className="image is-256x256 mx-auto mb-5"> {/* Increased image size */}
            <img src={logo} alt="Logo" />
          </figure>
        </div>
      </div>

      <div className="columns is-centered">
        <div className="column is-one-third">
          <form className="box" onSubmit={onFormSubmit}>
            {isGlobalError && (
              <div className="notification is-danger is-light has-text-centered">
                {globalError}
              </div>
            )}

            <div className="field">
              <label className="label">Email</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className={`input ${isValidUserEmail ? 'is-success' : 'is-danger'}`}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onChangeFieldValue}
                  onBlur={validateEmail}
                  placeholder="tim.david@domain.com"
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                {isValidUserEmail && (
                  <span className="icon is-small is-right has-text-success">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                )}
              </div>
              {!isValidUserEmail && userEmailErrorMessage && (
                <p className="help is-danger">{userEmailErrorMessage}</p>
              )}
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className={`input ${isValidUserPassword ? 'is-success' : 'is-danger'}`}
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={onChangeFieldValue}
                  onBlur={validatePassword}
                  placeholder="********"
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faUserSecret} />
                </span>
                {isValidUserPassword && (
                  <span className="icon is-small is-right has-text-success">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                )}
              </div>
              {!isValidUserPassword && userPasswordErrorMessage && (
                <p className="help is-danger">{userPasswordErrorMessage}</p>
              )}
            </div>

            <div className="field">
              <div className="control">
                <button className="button is-warning is-fullwidth mt-4">Log in</button>
              </div>
            </div>

            <div className="has-text-centered mt-4">
              <Link to="/signup" className="button is-link is-fullwidth"> {/* Styled as button */}
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
