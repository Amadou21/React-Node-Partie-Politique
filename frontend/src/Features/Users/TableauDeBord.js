// import { Typography } from "@mui/material";
// import { Box } from "@mui/system";
// import React from "react";
// import AppLayout from "../Layout/AppLayout";

// const TableauDeBord = () => {
//   return (
//     <AppLayout>
//       <Box>
//         <Typography variant="h1">Ici tu es dans Tableau de bord</Typography>
//       </Box>
//     </AppLayout>
//   );
// };

// export default TableauDeBord;

import { Card, CardHeader, Stack, Button, Avatar, Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; //useParams
import AppLayout from "../Layout/AppLayout";
//----------------------------------------------------------------
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { LoadingButton } from "@mui/lab";
import { motion } from "framer-motion";
import {
  updatePhoto,
  findLogin,
} from "../Membres/Services/UserServices/User.service";
import { useSnackbar } from "notistack";
// import { useAuthContext } from "../../Context/AuthContext";

import { useUserById } from "../Membres/Services/UserServices/User.store"; //---------------------------
import { useAuthContext } from "../../Context/AuthContext";

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

const TableauDeBord = () => {
  // les hooks (useState, useNavigate etc...)
  const [file, setFile] = useState(null);
  const myUserPhoto = useRef(null);
  const navigate = useNavigate();
  //les variables
  // const { id } = useParams("id");
  const { auth, idUser } = useAuthContext();
  console.log("id de user", idUser);
  // const { idUser } = useAuthContext();
  const { user, isLoading } = useUserById(Number(idUser));
  // const [ userLoad, setUserLoad ] = useState(user);
  useEffect(() => {
    if (!isLoading) {
      const photo = myUserPhoto.current.value;
      console.log("myUserPhoto", photo);
      // setUserLoad(user);
    }
  }, [isLoading]);

  const lastLogin = user.login;
  const { enqueueSnackbar } = useSnackbar();

  const toBase64 = (arr) => {
    arr = new Uint8Array(arr); // if it's an ArrayBuffer
    return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClickVariant = (message, variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message + " ", { variant });
  };
  // (() => delay(500))();
  const UserDetailSchema = Yup.object().shape({
    idUser: Yup.number().default(idUser),
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

    photoUser: Yup.mixed()
      .test("file", "You need to provide a file", (value) => {
        if (value) return true;
        return false;
      })
      .nullable()
      .default(user?.photoUser?.data),
    motDePass: Yup.string().default(user?.motDePass),
  });

  const formik = useFormik({
    initialValues: UserDetailSchema.getDefaultFromShape(),
    validationSchema: UserDetailSchema,
    onSubmit: async (user) => {
      console.log("userPhoto", user.photoUser);
      if (file != null) {
        user.photoUser = file;
        console.log("userPhoto dans if", user.photoUser);
      }
      console.log("userIdUser", user.idUser);
      const le_login = await findLogin(user.login);
      if (le_login.ok && user.login !== lastLogin) {
        handleClickVariant("Cet email existe déjà", "error");
      } else {
        setTimeout(() => {
          updatePhoto(user);
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

  const { handleSubmit, isSubmitting } = formik;

  return (
    <AppLayout>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          {!isLoading && (
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
                  src={`data:image/png;base64,${toBase64(
                    user?.photoUser.data
                  )}`}
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
                    ref={myUserPhoto}
                    // {...getFieldProps("photoUser")}
                    // error={Boolean(touched.photoUser && errors.photoUser)}
                    // helperText={touched.photoUser && errors.photoUser}
                    // onChange={(e) => {
                    //   Form.setFieldValue(field.name, e.target.files[0]);
                    // }}
                    onChange={handleFile}
                    // {...getFieldProps("photoUser")}
                  />
                </Button>
              </Stack>
              <Stack spacing={5}>
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
            </Card>
          )}
        </Form>
      </FormikProvider>
    </AppLayout>
  );
};

export default TableauDeBord;
