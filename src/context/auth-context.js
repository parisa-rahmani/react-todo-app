import React, { useState } from 'react';

export const AuthContext = React.createContext({
  isAuth: false,
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
});

const AuthContextProvider = props => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [tokenId, setTokenId] = useState(null);
  const [idUser, setIdUser] = useState(null);

  const loginHandler = () => {
    setIsAuthed(true);
    setTokenId(localStorage.getItem('token'));
    setIdUser(localStorage.getItem('userId'));
  };
  const logoutHandler = () => {
    setIsAuthed(false);
    setTokenId(null);
    setIdUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expireDate');
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuthed,
        login: loginHandler,
        logout: logoutHandler,
        token: tokenId,
        userId: idUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
