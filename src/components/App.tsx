import React from 'react';
import axios from 'axios';
import { refreshTokenSetup } from '../utils/refreshToken';
import Login from '../components/Login';
import Logout from '../components/Logout';

const App: React.FunctionComponent = () => {

  const onSuccess = (res) => {
    console.log('[Login Success] currentUser:', res.profileObj);
    refreshTokenSetup(res);
    const params = {
      myDataKey: 'myDataValue'
    };
    axios.post('/', params);
  };

  const onFailure = (res) => {
    console.log('[Login failed] res:', res);
  };

  return (
    <>
      <div>Before login button</div>
      <Login onSuccess={onSuccess} onFailure={onFailure} />
      <div>After login button and before logout button</div>
      <Logout />
      <div>After logout button</div>
    </>
  );
};

export default App;
