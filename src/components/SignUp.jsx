import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assests/grex.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faUserSecret, faCheck, faKey } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function SignUp() {
  const [globalError, setGlobalError] = useState("");
  const [userNameErrorMessage, setUserNameErrorMessage] = useState('');
  const [userEmailErrorMessage, setUserEmailErrorMessage] = useState('');
  const [userPasswordErrorMessage, setUserPasswordErrorMessage] = useState('');
  const [otpErrorMessage, setOtpErrorMessage] = useState('');
  const [isGlobalError, setIsGlobalError] = useState(false);
  const [isValidUserName, setIsValidUserName] = useState(false);
  const [isValidUserEmail, setIsValidUserEmail] = useState(false);
  const [isValidUserPassword, setIsValidUserPassword] = useState(false);
  const [isValidOtp, setIsValidOtp] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [formData, setFormData] = useState({ userName: "", email: "", password: "", otp: "" });
  const navigate = useNavigate();

  const onChangeFieldValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const commonGlobalError = (error) => {
    setIsGlobalError(true);
    const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
    
    // Check if the error is related to OTP already being sent
    if (errorMessage.includes("OTP already sent on email")) {
      setGlobalError("OTP already sent. Please check your email.");
    } else {
      setGlobalError(errorMessage);
    }
  }

  // Handle form submission and send OTP
  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isOtpSent) {
        // Send signup data (username, email, password) to backend
        const response = await axios.post('https://sambha.in/api/grex/auth/signup', formData, {
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.data.code === 200) {
          setIsOtpSent(true);
          setGlobalError("");
        }
      } else {
        // Verify the OTP entered by the user
        const otpResponse = await axios.post('https://sambha.in/api/grex/auth/otp', { email: formData.email, otp: formData.otp }, {
          headers: { 'Content-Type': 'application/json' }
        });

        if (otpResponse.data.code === 200) {
          navigate('/login');
        }
      }
    } catch (error) {
      commonGlobalError(error);
    }
  }

  // Validate inputs
  const validateField = (field) => {
    switch (field) {
      case 'username':
        const username = formData.userName.trim();
        const usernameRegex = /^[0-9a-zA-Z_]+$/;
        if (username && username.length >= 8 && username.length <= 20 && usernameRegex.test(username)) {
          setIsValidUserName(true);
          setUserNameErrorMessage("");
        } else {
          setIsValidUserName(false);
          setUserNameErrorMessage("Username must be 8-20 characters long and can only contain letters, numbers, and underscores.");
        }
        break;
      case 'email':
        const email = formData.email.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && email.length >= 8 && email.length <= 40 && emailRegex.test(email)) {
          setIsValidUserEmail(true);
          setUserEmailErrorMessage("");
        } else {
          setIsValidUserEmail(false);
          setUserEmailErrorMessage("Invalid email format.");
        }
        break;
      case 'password':
        const password = formData.password.trim();
        const passwordRegex = /^(?=.*[A-Z])[A-Za-z0-9_@]+$/;
        if (password && password.length >= 8 && password.length <= 20 && passwordRegex.test(password)) {
          setIsValidUserPassword(true);
          setUserPasswordErrorMessage("");
        } else {
          setIsValidUserPassword(false);
          setUserPasswordErrorMessage("Password must be 8-20 characters long and include at least one uppercase letter.");
        }
        break;
      case 'otp':
        const otp = formData.otp.trim();
        if (otp.length === 8) {
          setIsValidOtp(true);
          setOtpErrorMessage("");
        } else {
          setIsValidOtp(false);
          setOtpErrorMessage("OTP must be 8 digits.");
        }
        break;
      default:
        break;
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
                  type="text" name="userName" onChange={onChangeFieldValue} onBlur={() => validateField('username')} placeholder="tim_david007" />
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
                  type="email" name="email" onChange={onChangeFieldValue} onBlur={() => validateField('email')} placeholder="tim.david007@grex.co.in" />
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
                  type="password" name="password" onChange={onChangeFieldValue} onBlur={() => validateField('password')} placeholder="******" />
                <span className="icon is-small is-left has-text-black">
                  <FontAwesomeIcon icon={faKey} />
                </span>
                {isValidUserPassword && <span className="icon is-small is-right has-text-success"><FontAwesomeIcon icon={faCheck} /></span>}
              </div>
              {!isValidUserPassword && <p className="help is-danger">{userPasswordErrorMessage}</p>}
            </div>

            {/* Show OTP input only if OTP is sent */}
            {isOtpSent && (
              <div className="field">
                <label className="label">OTP</label>
                <div className="control has-icons-left has-icons-right">
                  <input className={`input ${isValidOtp ? 'is-success' : isValidOtp === false ? 'is-danger' : ''}`}
                    type="text" name="otp" onChange={onChangeFieldValue} onBlur={() => validateField('otp')} placeholder="Enter your OTP" />
                  <span className="icon is-small is-left has-text-black">
                    <FontAwesomeIcon icon={faUserSecret} />
                  </span>
                  {isValidOtp && <span className="icon is-small is-right has-text-success"><FontAwesomeIcon icon={faCheck} /></span>}
                </div>
                {!isValidOtp && <p className="help is-danger">{otpErrorMessage}</p>}
              </div>
            )}

            <div className="field mt-5">
              <div className="control">
                <button type="submit" className="button is-primary is-fullwidth"
                  disabled={isOtpSent ? !isValidOtp : !(isValidUserName && isValidUserEmail && isValidUserPassword)}>
                  {isOtpSent ? "Verify OTP" : "Send OTP"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
