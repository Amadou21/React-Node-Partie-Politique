import React from "react";
import { useAuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useUserById } from "../Services/UserServices/User.store";

const MembreActualite = () => {
  const { auth, idUser } = useAuthContext();
  const { isLoading } = useUserById(+idUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth && !isLoading) {
      navigate("/connexion");
    }
  }, [auth, navigate]);

  if (!auth) {
    return (
      <Box display={"flex"} justifyContent="center" alignContent={"center"}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box>
      {/* {!auth && <CircularProgress />} */}
      {auth && (
        <div>
          <h1>Membre Actu</h1>
        </div>
      )}
    </Box>
  );
};

export default MembreActualite;
