import React from 'react';
import AuthForm from './AuthForm';

function LandingPage() {
  return (
    <div style={{
      position: 'relative',
      height: '100vh',
      backgroundImage: `url("https://assets.nflxext.com/ffe/siteui/vlv3/f841d3c7-bad0-4afb-999e-a8ba765cd9b4/web/ET-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg")`,
      backgroundSize: 'cover',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
        alt="Netflix" 
        style={{ position: 'absolute', top: '20px', left: '40px', width: '150px' }}
      />
      <AuthForm isLoginModeInit={true} />
    </div>
  );
}

export default LandingPage;