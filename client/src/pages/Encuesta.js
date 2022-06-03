
import _ from 'lodash';

import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from 'react-select';

import { useSnackbar } from 'notistack';

import { useNavigate, Link } from "react-router-dom";

const defaultPollForm = {
    gender: "male",
    rol: "student",
    hadCovid: true,
    sintomas: [],
    durationCovid: 0,
    timesHimCovid: 0,
    numberOfDosis: 0,
    postCovdiEffect: false,
}

const rolOptions = [
    { value: 'student', label: 'Estudiante' },
    { value: 'teacher', label: 'Docente' },
    { value: 'administrative', label: 'Administrativo' },
    { value: 'other', label: 'Otro' },
];

const genderOptions = [
    { value: 'male', label: 'Hombre' },
    { value: 'female', label: 'Mujer' },
];

const booleanOptions = [
    { value: true, label: 'SI' },
    { value: false, label: 'NO' },
];

const sintomasOptions = [
    { value: 'fiebre', label: 'Fiebre' },
    { value: 'tos', label: 'Tos' },
    { value: 'perdida del gusto o del olfato', label: 'Pérdida del gusto o del olfato' },
    { value: 'dolor de garganta', label: 'Dolor de garganta' },
    { value: 'dolor de cabeza', label: 'Dolor de cabeza' },
    { value: 'molestias y dolores', label: 'Molestias y dolores' },
    { value: 'diarrea', label: 'Diarrea' },
    { value: 'Erupción cutánea o pérdida del color de los dedos de las manos o los pies', label: 'Erupción cutánea o pérdida del color de los dedos de las manos o los pies' },
    { value: 'ojos rojos o irritados', label: 'Ojos rojos o irritados' },
    { value: 'dificultad para respirar o disnea', label: 'Dificultad para respirar o disnea' },
    { value: 'perdida de movilidad o del habla o sensación de confusión', label: 'Pérdida de movilidad o del habla o sensación de confusión' },
    { value: 'dolor en el pecho', label: 'Dolor en el pecho' },
    { value: 'asintomatico', label: 'Asintomatico' },
];

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

export default function Encuesta() {
    const classes = useStyles();

    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const [pollForm, setPollForm] = useState(defaultPollForm);

    //Funcion que se  ejecuta cada que el usuario escribe en los input
    const actualizarState = (e) => {
        setPollForm({
            ...pollForm,
            [e.target.name]: parseInt(e.target.value, 10)
        })
    };

    const sendPollForm = async (e) => {
        e.preventDefault();

        const sendEncuesta = Object.assign(pollForm, { 'userDocument': localStorage.getItem('userDocument') })

        const response = await fetch('http://localhost:5000/api/sendEncuesta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendEncuesta),
        })

        const data = await response.json()

        if (data.status === 'ok') {
            enqueueSnackbar('Encuesta enviada satisfatoriamente', {
                variant: 'success',
            });
            navigate('/');
        } else {
            enqueueSnackbar('Ocurrio un error', {
                variant: 'error',
            });
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('userDocument')) {
            enqueueSnackbar('Inicie Sesion para diligenciar la encuesta', {
                variant: 'error',
            });
        }
        navigate('/');
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AssignmentIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Encuesta COVID
                </Typography>
                <form className={classes.form}>
                    <Typography component="p" variant="subtitle1">
                        Selecciona tu rol:
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <Select
                                className="basic-single"
                                classNamePrefix="Selecciona tu rol, por favor"
                                defaultValue={rolOptions[0]}
                                options={rolOptions}
                                name="rol"
                                onChange={({ value }) => {
                                    return setPollForm({
                                        ...pollForm,
                                        rol: value,
                                    });
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Typography component="p" variant="subtitle1">
                        Selecciona tu genero:
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Select
                                className="basic-single"
                                classNamePrefix="¿Cúal es tu genero?"
                                defaultValue={genderOptions[0]}
                                options={genderOptions}
                                name="gender"
                                onChange={({ value }) => {
                                    return setPollForm({
                                        ...pollForm,
                                        gender: value,
                                    });
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Typography component="p" variant="subtitle1">
                        ¿Has tenido COVID?
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Select
                                className="basic-single"
                                classNamePrefix="¿Has tenido COVID?"
                                defaultValue={booleanOptions[0]}
                                options={booleanOptions}
                                name="hadCovid"
                                onChange={({ value }) => {
                                    return setPollForm({
                                        ...pollForm,
                                        hadCovid: value,
                                    });
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Typography component="p" variant="subtitle1">
                        Sintomas:
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Select
                                className="basic-single"
                                classNamePrefix="¿Has tenido COVID?"
                                defaultValue={[]}
                                options={sintomasOptions}
                                isMulti
                                name="sintomas"
                                onChange={((sintomasSelected) => {
                                    const values = sintomasSelected.map(({ value }) => value)
                                    return setPollForm({
                                        ...pollForm,
                                        sintomas: values,
                                    })
                                })}
                            />
                        </Grid>
                    </Grid>
                    <Typography component="p" variant="subtitle1">
                        Duración en días del Covid (solo números):
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="cc-number"
                                name="durationCovid"
                                variant="outlined"
                                required
                                fullWidth
                                id={pollForm.durationCovid}
                                autoFocus
                                onChange={actualizarState}
                            />
                        </Grid>
                    </Grid>
                    <Typography component="p" variant="subtitle1">
                        Veces Covid (solo números):
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="cc-number"
                                name="timesHimCovid"
                                variant="outlined"
                                required
                                fullWidth
                                id={pollForm.timesHimCovid}
                                autoFocus
                                onChange={actualizarState}
                            />
                        </Grid>
                    </Grid>
                    <Typography component="p" variant="subtitle1">
                        Con cuantas dosis cuenta (solo números):
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="cc-number"
                                name="numberOfDosis"
                                variant="outlined"
                                required
                                fullWidth
                                id={pollForm.numberOfDosis}
                                autoFocus
                                onChange={actualizarState}
                            />
                        </Grid>
                    </Grid>
                    <Typography component="p" variant="subtitle1">
                        Presento afectaciones post-covid
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Select
                                className="basic-single"
                                classNamePrefix="Post-Covid"
                                defaultValue={booleanOptions[1]}
                                options={booleanOptions}
                                name="postCovdiEffect"
                                onChange={({ value }) => {
                                    return setPollForm({
                                        ...pollForm,
                                        hadCovid: value,
                                    });
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        onClick={(e) => sendPollForm(e)}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Enviar Encuesta
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/login">
                                ¿Ya tienes cuenta? Inicia Sesion
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container >
    );
}