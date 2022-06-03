import React, { useEffect, useState } from 'react';

import { useSnackbar } from 'notistack';

export default function DashBoard() {

    const { enqueueSnackbar } = useSnackbar();

    const [datosEncuesta, setDatosEncuesta] = useState([])

    const getDataEncuesta = async () => {
        const response = await fetch('http://localhost:5000/api/getEncuestas', {
            method: 'GET'
            })

        const data = await response.json()

        if (data.status === 'ok') {
            enqueueSnackbar('Datos Obtenidos Exitosamente', {
                variant: 'success',
            });

            console.log(data.data);

            setDatosEncuesta(data.data);
        } else {
            enqueueSnackbar('Ocurrio un error, obteniendo los datos de la encuesta', {
                variant: 'error',
            });
        }
    }

    useEffect(() => {
        getDataEncuesta()
        console.log(datosEncuesta);
    }, [])
    return (
        <>
            <p> GRACIAS CHICOS :) SOLO ME FALTA PROGRAMAR PONER GRAFIQUITAS Y TERMINAMOS</p>
            <p> SE QUE A NIVEL VISUAL NO ES LO MEJOR PERO BUENO PERDON Y GRACIAS</p>
        </>
    );
}