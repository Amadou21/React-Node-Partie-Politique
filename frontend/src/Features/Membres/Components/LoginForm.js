import React, { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { Box, Checkbox, FormControlLabel, IconButton, InputAdornment, Link, Stack, TextField, Button } from "@mui/material";
import { motion } from "framer-motion";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffICon from '@mui/icons-material/VisibilityOff';

let easing = [0.6, -0.05, 0.01, 0.99];
const animate = { opacity: 1, y: 0, transition: { duration: 0.6, ease: easing, delay: 0.16, }, };

const LoginForm = ({ setAuth }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [showPassword, setShowPassword] = useState(false);

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
        onSubmit: () => {
            console.log("submitting...");
            setTimeout(() => {
                console.log("submited!!");
                setAuth(true);
                navigate(from, { replace: true });
            }, 2000);
        },
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
        formik;

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
                        <Button fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}
                        >
                            {isSubmitting ? "Un instant..." : "Connexion"}
                        </Button>
                    </Box>
                </Box>
            </Form>
        </FormikProvider>
    );
};

export default LoginForm;