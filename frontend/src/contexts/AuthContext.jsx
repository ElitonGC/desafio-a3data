import React, { createContext, useContext, useState } from 'react';
import api, { setApiToken } from '../api';

const AuthContext = createContext();


export function AuthProvider({ children }) {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const login = async (email, password) => {
      setLoading(true);
      setError(null);
      try {
         const response = await api.post('/auth/login', { email, password });
         const userData = { ...response.data.user, token: response.data.access_token };
         setUser(userData);
         setApiToken(response.data.access_token);
         localStorage.setItem('token', response.data.access_token);
         setLoading(false);
         return true;
      } catch (err) {
         setError(err.response?.data?.message || 'Erro ao fazer login');
         setLoading(false);
         return false;
      }
   };

   const signup = async (data) => {
      setLoading(true);
      setError(null);
      try {
         const response = await api.post('/auth/signup', data);
         const userData = { ...response.data.user, token: response.data.access_token };
         setUser(userData);
         setApiToken(response.data.access_token);
         localStorage.setItem('token', response.data.access_token);
         setLoading(false);
         return true;
      } catch (err) {
         setError(err.response?.data?.message || 'Erro ao cadastrar');
         setLoading(false);
         return false;
      }
   };

   const logout = () => {
      setUser(null);
      setApiToken(null);
      localStorage.removeItem('token');
   };

   // Carregar token do localStorage ao iniciar
   React.useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
         setApiToken(token);
         setUser((u) => u || { token });
      }
   }, []);

   return (
      <AuthContext.Provider value={{ user, loading, error, login, signup, logout }}>
         {children}
      </AuthContext.Provider>
   );
}

export function useAuth() {
   return useContext(AuthContext);
}
