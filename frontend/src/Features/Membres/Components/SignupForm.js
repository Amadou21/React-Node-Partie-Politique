import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Box,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { motion } from "framer-motion";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffICon from "@mui/icons-material/VisibilityOff";
import { create, findLogin } from "../Services/User.service";
import { useSnackbar } from "notistack";

/////////////////////////////////////////////////////////////

let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
  opacity: 1,
  y: 0,
  transition: {
    duration: 0.6,
    ease: easing,
    delay: 0.16,
  },
};

const SignupForm = ({ setAuth }) => {
  // les hooks
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleClickVariant = (message, variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message + " ", { variant });
  };

  const [showPassword, setShowPassword] = useState(false);

  const SignupSchema = Yup.object().shape({
    prenom: Yup.string()
      .min(2, "Trop court!")
      .max(50, "Trop long!")
      .required("Prenom obligatoire")
      .default(""),
    nom: Yup.string()
      .min(2, "Trop court!")
      .max(50, "Trop long!")
      .required("Nom obligatoire")
      .default(""),
    login: Yup.string()
      .email("Donnez un email valide")
      .required("Email obligatoire")
      .default(""),
    motDePass: Yup.string().required("Mot de passe obligatoire").default(""),
  });

  const formik = useFormik({
    initialValues: SignupSchema.getDefaultFromShape(),
    validationSchema: SignupSchema,
    onSubmit: async (user, { resetForm, setSubmitting }) => {
      const le_login = await findLogin(user.login);
      if (le_login.ok) {
        handleClickVariant("Cet email existe déjà", "error");
      } else {
        setTimeout(() => {
          create(user);
          setAuth = true;
          handleClickVariant("Votre compte a été creer avec succès", "success");
          navigate("/membre-actualites");
        }, 2000);
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack
            component={motion.div}
            initial={{ opacity: 0, y: 60 }}
            animate={animate}
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
          >
            <TextField
              fullWidth
              label="Prenom"
              {...getFieldProps("prenom")}
              error={Boolean(touched.prenom && errors.prenom)}
              helperText={touched.prenom && errors.prenom}
            />

            <TextField
              fullWidth
              label="Nom"
              {...getFieldProps("nom")}
              error={Boolean(touched.nom && errors.nom)}
              helperText={touched.nom && errors.nom}
            />
          </Stack>

          <Stack
            spacing={3}
            component={motion.div}
            initial={{ opacity: 0, y: 40 }}
            animate={animate}
          >
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email"
              {...getFieldProps("login")}
              error={Boolean(touched.login && errors.login)}
              helperText={touched.login && errors.login}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Mot de passe"
              {...getFieldProps("motDePass")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
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
              error={Boolean(touched.motDePass && errors.motDePass)}
              helperText={touched.motDePass && errors.motDePass}
            />
          </Stack>

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={animate}
          >
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              S'inscrire
            </LoadingButton>
          </Box>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default SignupForm;
