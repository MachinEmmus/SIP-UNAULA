import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useSnackbar } from 'notistack';

import { useNavigate, Link } from "react-router-dom";

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

const defaultLogin = {
    email: "",
    password: "",
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    const classes = useStyles();

    const { enqueueSnackbar } = useSnackbar();

    const navigate = useNavigate();

    const [login, setLogin] = useState(defaultLogin);

    const actualizarState = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value,
        });
    };

    async function loginUser(event) {
        event.preventDefault()

        const { email, password } = login;

        if (email.length === 0 || password.length === 0) {
            enqueueSnackbar('El email y la contraseña no pueden estar vacios', {
                variant: 'error',
            });
        }

        const response = await fetch('https://sip-unaula--server.herokuapp.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            }),
        })

        const data = await response.json()

        if (data.user) {
            const { userToken, userDocument } = data.user;
            console.log(userToken, userDocument);
            localStorage.setItem('token', userToken)
            localStorage.setItem('userEmail', email)
            localStorage.setItem('userDocument', userDocument)
            enqueueSnackbar('Logeo Exitoso', {
                variant: 'success',
            });
            navigate('/');
        } else {
            enqueueSnackbar('Por favor verifique su email y contraseña', {
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
                    Inicio de Sesion
                </Typography>
                <form className={classes.form} noValidate onSubmit={loginUser}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={actualizarState}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={actualizarState}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Recuerdame"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Iniciar
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/login">
                                Olvidaste la contraseña?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/register">
                                No tienes cuenta? Registrate
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}