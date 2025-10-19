/* eslint-disable no-unused-vars */
import { useState } from 'react';
import './App.css';
import AppRoutes from './routes/route';
import { UserContext } from './contexts/Contexts';
// import ErrorModal from './components/errorModal';

function App() {
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={{user, setUser}}>
      {/* <ErrorModal title='Registration problem' message='User could not be registered. Please try again.' /> */}
      <AppRoutes />
    </UserContext.Provider>
  )
}

export default App;
