import React from 'react';

import Login from '../components/Login';
import Logout from '../components/Logout';

const App: React.FunctionComponent = () => {
  return (
    <>
      <div>Before login button</div>
      <Login />
      <div>After login button and before logout button</div>
      <Logout />
      <div>After logout button</div>
    </>
  );
};

export default App;
