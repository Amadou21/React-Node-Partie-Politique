import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Button,
  Box,
  Avatar,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//----------------------------------------------------------------
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { LoadingButton } from "@mui/lab";
import { motion } from "framer-motion";
import {
  update,
  findLogin,
} from "../Membres/Services/UserServices/User.service";
import { useSnackbar } from "notistack";
import { useUserById } from "../Membres/Services/UserServices/User.store"; //---------------------------
import { useAuthContext } from "../../Context/AuthContext";
// import { sleep } from "react-query/types/core/utils";

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

const UserDetailSchema = Yup.object().shape({
  idUser: Yup.number().default(0),
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
  photoUser: Yup.mixed()
    .test("file", "You need to provide a file", (value) => {
      if (value) return true;
      return false;
    })
    .nullable()
    .default(""),
  motDePass: Yup.string().default(""),
});

const toBase64 = (arr) => {
  arr = new Uint8Array(arr); // if it's an ArrayBuffer
  return btoa(arr.reduce((data, byte) => data + String.fromCharCode(byte), ""));
};

const UserDetail = () => {
  // les hooks (useState, useNavigate etc...)
  const [file, setFile] = useState(null);

  const navigate = useNavigate();
  //les variables
  const { idUser } = useAuthContext();
  // const { idUser } = useAuthContext();
  const { user, isLoading } = useUserById(+idUser);

  const lastLogin = user?.login;
  const { enqueueSnackbar } = useSnackbar();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClickVariant = (message, variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message + " ", { variant });
  };

  const initialValues = UserDetailSchema.getDefaultFromShape();
  console.log({ initialValues });

  const formik = useFormik({
    initialValues: UserDetailSchema.getDefaultFromShape(),
    validationSchema: UserDetailSchema,
    onSubmit: async (user) => {
      console.log("userPhoto", user.photoUser);
      if (file != null) {
        user.photoUser = file;
      }
      console.log("userIdUser", user.idUser);
      const le_login = await findLogin(user.login);
      if (le_login.ok && user.login !== lastLogin) {
        handleClickVariant("Cet email existe déjà", "error");
      } else {
        setTimeout(() => {
          update(user);
          handleClickVariant(
            "Votre compte a été modifier avec succès",
            "success"
          );
          navigate("/membre-actualites");
          // location.reload(true);
        }, 2000);
      }
    },
  });

  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    setValues,
    // setFieldValue,
  } = formik;

  useEffect(() => {
    if (user) {
      setValues(user);
    }
  }, [user]);

  if (isLoading) {
    return (
      <Box display={"flex"} justifyContent="center" alignContent={"center"}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    // <AppLayout>
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        {!isLoading && (
          <Card>
            <CardHeader
              title="Detail du user"
              sx={{ justifyContent: "center" }}
            />
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
                src={`data:image/png;base64,${toBase64(user?.photoUser?.data)}`}
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
                  name="photoUser"
                  accept="image/png, image/gif, image/jpeg, image/webp, image/jpg, image/heivc"
                  // ref={myUserPhoto}
                  onChange={handleFile}
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
                    // value={user?.prenom}
                    error={Boolean(touched.prenom && errors.prenom)}
                    helperText={touched.prenom && errors.prenom}
                  />
                  <TextField
                    fullWidth
                    label="Nom"
                    // defaultValue={user?.nom}
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
                    // defaultValue={user?.login}
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
        )}
      </Form>
    </FormikProvider>
    // </AppLayout>
  );
};

export default UserDetail;
