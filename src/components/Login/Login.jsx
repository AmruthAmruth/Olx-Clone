import React from 'react';
import './Login.css'; // Importing the CSS file for styling
import close from '../../assets/close.svg';
import googleImg from '../../assets/google.png';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase/firebase';
import { useNavigate } from "react-router-dom";
import { useUser } from '../../context/UserContext';
const Login = ({ setLoginPop }) => {

const {login}=useUser()

const navigate= useNavigate()
  

let isSigningIn = false;

const googleSignIn = async () => {
  if (isSigningIn) return;
  isSigningIn = true;

  try {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
    alert(`Welcome ${result.user.displayName}`);
    login(result.user.displayName);
    localStorage.setItem('username', result.user.displayName);
    navigate('/');
  } catch (error) {
    console.error("Login failed:", error);

    if (error.code === 'auth/cancelled-popup-request') {
      alert('Login cancelled. Please try again.');
    } else {
      alert('Login failed. Please check your internet or try again later.');
    }
  } finally {
    isSigningIn = false;
  }
};

  return (
    <div className="login-popup">
      <div className="login-container">
        
        <img
          src={close}
          alt="Close"
          className="close-button"
          onClick={() => setLoginPop(false)}
        />

        <div className="login-header">
          <h2 className="logo-text">OLX</h2>
        </div>

        <div className="login-options">
          <div className="login-option phone-login">
            <svg width="22" height="22" viewBox="0 0 1024 1024" className="phone-icon">
              <path d="M743.68 85.333l66.987 67.84v701.227l-63.573 84.267h-471.253l-62.507-85.333v-700.373l67.627-67.627h462.72zM708.053 170.667h-391.893l-17.493 17.707v637.653l20.053 27.307h385.92l21.333-27.52v-637.653l-17.92-17.493zM512 682.667c23.564 0 42.667 19.103 42.667 42.667s-19.103 42.667-42.667 42.667c-23.564 0-42.667-19.103-42.667-42.667s19.103-42.667 42.667-42.667z"></path>
            </svg>
            <span className="option-text">Continue with phone</span>
          </div>

          <div onClick={googleSignIn} className="login-option google-login">
            <img src={googleImg} alt="Google" className="google-icon" />
            <span className="option-text">Continue with Google</span>
          </div>

          <h1 className="or-text">OR</h1>
          <h1 className="email-login-text">Login with Email</h1>
        </div>

        <div className="footer-text">
          <p className="privacy-text">
            All your personal details are safe with us.
          </p>
          <p className="terms-text">
            If you continue, you are accepting{' '}
            <span className="terms-link">OLX Terms and Conditions and Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;