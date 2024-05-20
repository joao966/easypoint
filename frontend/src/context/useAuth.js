import React, { useState, createContext, useEffect } from 'react';
import { login as requestLogin, changePassword as reqChangePassword } from 'services/auth.service';
import { findUserByCPF, findUserById } from 'services/usuarios.service';
import axios from 'utils/axios.backend';

const authContext = createContext();

function useAuth() {
  function saveInfo(access_token) {
    sessionStorage.setItem('token', JSON.stringify(access_token));
    setToken(access_token);
    const userData = getJWTData(access_token);
    setRole(userData['role']);
    findUserByCPF(userData['cpf'])
      .then((data) => {
        sessionStorage.setItem('user', JSON.stringify(data));
        setUser(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getToken() {
    const stringToken = sessionStorage.getItem('token');
    const access_token = stringToken != 'undefined' ? JSON.parse(stringToken) : '';

    if (!access_token) {
      return;
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    return access_token;
  }

  function getUser() {
    const stringUser = sessionStorage.getItem('user');
    const user = stringUser != 'undefined' ? JSON.parse(stringUser) : '';

    if (!user) {
      return;
    }

    return user;
  }

  function getRole() {
    const stringToken = sessionStorage.getItem('token');
    const access_token = stringToken != 'undefined' ? JSON.parse(stringToken) : '';

    if (!access_token) {
      return;
    }

    const userData = getJWTData(access_token);

    return userData['role'];
  }

  function getJWTData(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );

    return JSON.parse(jsonPayload);
  }

  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());
  const [role, setRole] = useState(getRole());

  return {
    token,
    user,
    role,
    login(cpf, password) {
      return new Promise((res, rej) => {
        try {
          requestLogin(cpf, password)
            .then(({ access_token }) => {
              axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

              findUserByCPF(cpf)
                .then((user) => {
                  saveInfo(access_token);
                  res(user);
                })
                .catch((err) => {
                  sessionStorage.removeItem('token');
                  sessionStorage.removeItem('user');
                  rej(err);
                });
            })
            .catch((err) => {
              sessionStorage.removeItem('token');
              sessionStorage.removeItem('users');
              rej(err);
            });
        } catch (err) {
          rej(err);
        }
      });
    },
    logout() {
      return new Promise((res) => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');

        setToken(null);
        setUser(null);
        res();
      });
    },
    changePassword(newPassword, confirmPassword) {
      return new Promise((res, rej) => {
        try {
          reqChangePassword(user.id, newPassword, confirmPassword).then((data) => {
            findUserById(user.id)
              .then((user) => {
                setUser(user);
                sessionStorage.setItem('user', JSON.stringify(data));
                res();
              })
              .catch((err) => {
                axios.defaults.headers.common['Authorization'] = ``;
                rej(err);
              });
          });
        } catch (err) {
          rej(err);
        }
      });
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  useEffect(() => {
    if (auth.token) {
      const decodedJwt = parseJwt(auth.token);
      if (decodedJwt.exp * 1000 < Date.now()) {
        auth.logout();
      }
    }
  }, []);

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}
