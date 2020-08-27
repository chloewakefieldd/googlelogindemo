import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = '619345934226-h8rsgm5773r1anluvkl8sbflp00ujkg6.apps.googleusercontent.com';

function Logout() {
  const onSuccess = () => {
    alert('Logout made successfully!');
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;
