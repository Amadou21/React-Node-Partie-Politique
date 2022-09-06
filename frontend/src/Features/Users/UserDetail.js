import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Button,
  // Link as MuiLink,
  Box,
  Avatar,
} from "@mui/material";
// import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom"; //useParams
import AppLayout from "../Layout/AppLayout";
//----------------------------------------------------------------
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { LoadingButton } from "@mui/lab";
import { motion } from "framer-motion";
import { create, findLogin } from "../Membres/Services/User.service";
import { useSnackbar } from "notistack";

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

const UserDetail = () => {
  // les hooks (useState, useNavigate etc...)
  const navigate = useNavigate();
  //les variables
  const users = [
    {
      id: 1,
      nom: "Doe",
      prenom: "Jane",
      login: "alydiarra1@gmail.com",
    },
    {
      id: 2,
      nom: "DIARRA",
      prenom: "Aly",
      login: "alydiarra2@gmail.com",
    },
    {
      id: 3,
      nom: "Maiga",
      prenom: "Abba",
      login: "alydiarra3@gmail.com",
    },
    {
      id: 4,
      nom: "Sissoko",
      prenom: "Modibo",
      login: "alydiarra@4gmail.com",
    },
  ];
  const user = users.find((user) => user.id === 2);

  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (message, variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message + " ", { variant });
  };

  const UserDetailSchema = Yup.object().shape({
    prenom: Yup.string()
      .min(2, "Trop court!")
      .max(50, "Trop long!")
      .required("Prenom obligatoire")
      .default(user.prenom),
    nom: Yup.string()
      .min(2, "Trop court!")
      .max(50, "Trop long!")
      .required("Nom obligatoire")
      .default(user.nom),
    login: Yup.string()
      .email("Donnez un email valide")
      .required("Email obligatoire")
      .default(user.login),
    // motDePass: Yup.string().required("Mot de passe obligatoire").default(""),
  });

  const formik = useFormik({
    initialValues: UserDetailSchema.getDefaultFromShape(),
    validationSchema: UserDetailSchema,
    onSubmit: async (user) => {
      const le_login = await findLogin(user.login);
      if (le_login.ok) {
        handleClickVariant("Cet email existe déjà", "error");
      } else {
        setTimeout(() => {
          create(user);
          // setAuth = true;
          handleClickVariant("Votre compte a été creer avec succès", "success");
          navigate("/membre-actualites");
        }, 2000);
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <AppLayout>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Card>
            <CardHeader title="Detail du user" />
            <Stack
              marginBottom={3}
              alignItems="center"
              component={motion.div}
              initial={{ opacity: 0, y: 150 }}
              animate={animate}
              direction={{ xs: "column", sm: "column" }}
              spacing={2}
            >
              <Avatar
                src={"https://i.pravatar.cc/300"}
                sx={{
                  height: "25%",
                  width: "25%",
                  alignSelf: "center",
                  mb: 3,
                }}
              />
              <Button
                variant="contained"
                component="label"
                sx={{ width: "30%" }}
              >
                Changer la photo
                <input
                  type="file"
                  hidden
                  accept="image/png, image/gif, image/jpeg, image/webp, image/jpg, image/heivc"
                />
              </Button>
            </Stack>
            <CardContent>
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

                  {/* <TextField
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
                  /> */}
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
                    Modifier
                  </LoadingButton>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Form>
      </FormikProvider>
    </AppLayout>
  );
};

export default UserDetail;
