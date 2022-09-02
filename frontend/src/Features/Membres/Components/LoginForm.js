import React, { useState, useRef, useEffect, useContext } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import AuthContext from "../../../Context/Connexion.context";
import * as Yup from "yup";
import { Box, Checkbox, FormControlLabel, IconButton, InputAdornment, Link, Stack, TextField, Button, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffICon from '@mui/icons-material/VisibilityOff';
import { useUserByLogin } from "../Services/User.store";
import SweetAlert2 from 'sweetalert2';
import { find } from "../Services/User.service";

let easing = [0.6, -0.05, 0.01, 0.99];
const animate = { opacity: 1, y: 0, transition: { duration: 0.6, ease: easing, delay: 0.16, }, };

const LoginForm = ({ handleClickOpen }) => {
    const { setAuth } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [showPassword, setShowPassword] = useState(false);
    // const { find, status, ...others } = useUserByLogin();
    const [swalProps, setSwalProps] = useState({});

    const setCookieFunction = (value) => {
        localStorage.setLogin('login', value)
    }

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
                console.log('la reponse est a ok :', response.ok);
                navigate("/membre-actualites")
                //faire une redirection
            } else {
                console.log('la reponse nest pas ok :', response.ok);
                handleClickOpen();
            }
            console.log('data :', response);
            console.log('data3 :');

            /*if (status === 'refuse') {    
                handleClickOpen();
            }
            else { navigate('/membre-recherche') }*/
        }
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Box component={motion.div} animate={{ transition: { staggerChildren: 0.55, }, }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, }} component={motion.div} initial={{ opacity: 0, y: 40 }} animate={animate} >
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
                    <Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={animate} >
                        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} >
                            <FormControlLabel
                                control={
                                    <Checkbox {...getFieldProps("remember")} checked={values.remember} />
                                }
                                label="Se souvenir de moi"
                            />
                            <Link component={RouterLink} variant="subtitle2" to="#" underline="hover" >
                                Mot de passe oublié
                            </Link>
                        </Stack>
                        <Button fullWidth size="large" type="submit" variant="contained"
                        >
                            {isSubmitting ? (<CircularProgress sx={{ color: 'white' }} />) : "Connexion"}
                        </Button>
                    </Box>
                </Box>
            </Form>
        </FormikProvider>
    );
};

export default LoginForm;
