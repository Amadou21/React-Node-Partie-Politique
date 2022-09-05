import { createContext, useContext, useEffect, useState } from "react";
import { hasAuthenticated } from "../Features/Membres/Services/User.service";

const AuthContext = createContext({
  setAuth: () => {},
  auth: false,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const result = hasAuthenticated();
    if (result.ok) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [auth]);
  const authContext = {
    auth,
    setAuth,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
export default AuthContext;
