import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import { useAuthContext } from "../../../Context/AuthContext";
import * as Yup from "yup";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { motion } from "framer-motion";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffICon from "@mui/icons-material/VisibilityOff";
import { find } from "../Services/User.service";
import { useSnackbar } from "notistack";

let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
  opacity: 1,
  y: 0,
  transition: { duration: 0.6, ease: easing, delay: 0.16 },
};

const LoginForm = ({ handleClickOpen }) => {
  const { setAuth } = useAuthContext();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (message, variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message + " ", { variant });
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Donner un email valide")
      .required("Email obligatoire"),
    password: Yup.string().required("Le mot de passe est obligatoire"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async (user) => {
      const response = await find(user);
      if (response.ok) {
        console.log("la reponse est a ok :", response.ok);
        setAuth(true);
        handleClickVariant("Vous etes connecté(e) avec succès", "success");
        navigate("/membre-actualites");
      } else {
        console.log("la reponse nest pas ok :", response.ok);
        handleClickOpen();
      }
      console.log("data :", response);
      console.log("data3 :");
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box
          component={motion.div}
          animate={{ transition: { staggerChildren: 0.55 } }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            component={motion.div}
            initial={{ opacity: 0, y: 40 }}
            animate={animate}
          >
            <TextField
              variant="filled"
              fullWidth
              autoComplete="username"
              type="email"
              label="Email"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              variant="filled"
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Mot de passe"
              {...getFieldProps("password")}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <VisibilityOffICon />
                      ) : (
                        <RemoveRedEyeIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={animate}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    {...getFieldProps("remember")}
                    checked={values.remember}
                  />
                }
                label="Se souvenir de moi"
              />
              <Link
                component={RouterLink}
                variant="subtitle2"
                to="#"
                underline="hover"
              >
                Mot de passe oublié
              </Link>
            </Stack>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Connexion
            </LoadingButton>
          </Box>
        </Box>
      </Form>
    </FormikProvider>
  );
};

export default LoginForm;
