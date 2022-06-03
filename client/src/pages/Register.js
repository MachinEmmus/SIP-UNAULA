import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { useSnackbar } from 'notistack';

import { useNavigate, Link } from "react-router-dom";

const errorsMapped = {
    11000: "El documento o email ya se encuentran registrados",
};

const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const defaultRegisterForm = {
    documentType: "",
    document: "",
    firstName: "",
    secondName: "",
    firstLastName: "",
    secondLastName: "",
    dateBirth: new Date(),
    email: "",
    password: "",
    confirmPassword: "",
}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link to="https://www.unaula.edu.co/" color="inherit">
                UNAULA Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Register() {
    const classes = useStyles();

    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const [registerForm, setRegisterForm] = useState(defaultRegisterForm);

    //Funcion que se  ejecuta cada que el usuario escribe en los input
    const actualizarState = (e) => {
        setRegisterForm({
            ...registerForm,
            [e.target.name]: e.target.value,
        });
    };

    const sendRegisterForm = async (e) => {
        e.preventDefault();

        const verifyPassword = registerForm.password === registerForm.confirmPassword;
        const verifyPasswordLength = registerForm.password.length < 3;
        const verifyEmail = regex.test(registerForm.email);

        if (!verifyPassword) {
            enqueueSnackbar('Las contraseñas no coinciden por favor corrijalas', {
                variant: 'error',
            });
        }

        if (!verifyEmail) {
            enqueueSnackbar('El email no es valido', {
                variant: 'error',
            });
        }

        if (!verifyPasswordLength) {
            enqueueSnackbar('La contraseña debe ser de al menos 4 caracteres', {
                variant: 'error',
            });
        }

        const response = await fetch('https://sip-unaula--server.herokuapp.com/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerForm),
        })

        const data = await response.json()

        if (data.status === 'ok') {
            enqueueSnackbar('Usuario registrado con exito', {
                variant: 'success',
            });
            navigate('/login');
        } else {
            const { code } = data.error;
            const message = errorsMapped[code]
            enqueueSnackbar(message || 'Revise los campos obligatorios', {
                variant: 'error',
            });
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Registro
                </Typography>
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id={registerForm.firstName}
                                label="Primer Nombre"
                                autoFocus
                                onChange={actualizarState}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="secondName"
                                variant="outlined"
                                fullWidth
                                id={registerForm.secondName}
                                label="Segundo Nombre"
                                autoFocus
                                onChange={actualizarState}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id={registerForm.firstLastName}
                                label="Primer Apellido"
                                name="firstLastName"
                                autoComplete="lname"
                                onChange={actualizarState}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id={registerForm.secondLastName}
                                label="Segundo Apellido"
                                name="secondLastName"
                                autoComplete="lname"
                                onChange={actualizarState}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id={registerForm.documentType}
                                label="Tipo Documento"
                                name="documentType"
                                onChange={actualizarState}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id={registerForm.document}
                                label="Documento"
                                name="document"
                                autoComplete="email"
                                onChange={actualizarState}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    openTo="year"
                                    views={['year', 'month', 'day']}
                                    value={registerForm.dateBirth}
                                    onChange={(value) => setRegisterForm({
                                        ...registerForm,
                                        dateBirth: value,
                                    })}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id={registerForm.email}
                                label="Email"
                                name="email"
                                autoComplete="email"
                                onChange={actualizarState}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id={registerForm.password}
                                autoComplete="current-password"
                                onChange={actualizarState}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirmar Contraseña"
                                type="password"
                                id={registerForm.confirmPassword}
                                autoComplete="current-password"
                                onChange={actualizarState}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        onClick={(e) => sendRegisterForm(e)}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Registrarse
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/login">
                                Ya tienes cuenta? Inicia Sesion
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}