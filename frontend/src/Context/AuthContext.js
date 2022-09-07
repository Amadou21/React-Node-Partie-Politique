import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { hasAuthenticated } from "../Features/Membres/Services/User.service";

export const AuthContext = createContext({
  token: "",
  idUser: null,
  handleAuth: () => {},
  auth: false,
  handleLogOut: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  var storageToken = localStorage.getItem("token");
  const storageidUser = localStorage.getItem("idUser");
  const [token, setToken] = useState(storageToken);
  const [idUser, setIdUser] = useState(storageidUser);
  const [auth, setAuth] = useState(false);

  const handleAuth = (token, idUser) => {
    setToken(token);
    setIdUser(idUser);
    setAuth(true);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("idUser");
    setToken(null);
    setIdUser(null);
    setAuth(false);
  };

  useEffect(() => {
    if (token.length > 0) {
      (async () => {
        const result = await hasAuthenticated(token);
        console.log(" result ", result);
        if (result.ok) {
          console.log(" result.ok ", result.ok);
          setAuth(true);
        } else setAuth(false);
      })();
    } else setAuth(false);
  }, [token]);

  const authContext = {
    token,
    idUser,
    handleAuth,
    auth,
    handleLogOut,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
