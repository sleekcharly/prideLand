import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logo2.png';
import { client } from '../client';

const Login = () => {
  // Initialize google login client
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_API_TOKEN,
        scope: '',
      });
    };
    gapi.load('client:auth2', initClient);
  });

  // set anvigation
  const navigate = useNavigate();

  // responseGoogle function
  const responseGoogle = (response) => {
    // store response in localstorage
    localStorage.setItem('user', JSON.stringify(response.profileObj));

    const { name, googleId, imageUrl } = response.profileObj;

    // for creating the sanity user document based on the the google
    // account information
    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    };

    // create document if not exist in sanity database
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="flex px-5 gap-2 my-6 pt-1 items-center">
            <img src={logo} alt="logo" className="w-20" />
            <h1
              className="uppercase font-bold text-3xl lg:text-4xl"
              style={{
                color: 'transparent',
                fontFamily: 'Arial, helvetica, sans-serif',
                WebkitTextStrokeWidth: '2px',
                WebkitTextStrokeColor: 'white',
              }}
            >
              Pride
              <span
                style={{
                  color: 'transparent',
                  fontFamily: 'Arial, helvetica, sans-serif',
                  WebkitTextStrokeWidth: '2px',
                  WebkitTextStrokeColor: 'cyan',
                }}
              >
                Land
              </span>
            </h1>
          </div>

          <div className="shadow-2xl">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
