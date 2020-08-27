import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId = '619345934226-h8rsgm5773r1anluvkl8sbflp00ujkg6.apps.googleusercontent.com';

function Login(props) {

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={props.onSuccess}
        onFailure={props.onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;
