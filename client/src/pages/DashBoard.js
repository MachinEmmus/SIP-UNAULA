import React, { useEffect, useState } from 'react';

import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";

import { useSnackbar } from 'notistack';

export default function DashBoard() {

    const { enqueueSnackbar } = useSnackbar();

    const [datosEncuesta, setDatosEncuesta] = useState([])

    const roles = ['student', 'teacher', 'administrative', 'other'];

    const dataPie = {};
    const dataRolCount = {};
    const arrayDataSet = []

    datosEncuesta.forEach(({ rol, durationCovid }) => {
        dataPie[rol] = !dataPie[rol] ? durationCovid : dataPie[rol] += durationCovid;
        dataRolCount[rol] = !dataRolCount[rol] ? 1 : dataRolCount[rol] += 1;
    })

    
    const sumData = () => {
        for (let i = 0; i < 4; i+= 1){
        arrayDataSet.push(dataPie[roles[i]] / dataRolCount[roles[i]])
    }}

    sumData();

    const config = {
        labels: ["ESTUDIANTE", "DOCENTE", "ADMINISTRATIVO", "OTROS"],
        datasets: [
          {
            label: "Dias en Promedio con Covid",
            data: arrayDataSet,
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      }

    const getDataEncuesta = async () => {
        const response = await fetch('http://localhost:5000/api/getEncuestas', {
            method: 'GET'
            })

        const data = await response.json()

        if (data.status === 'ok') {
            enqueueSnackbar('Datos Obtenidos Exitosamente', {
                variant: 'success',
            });

            setDatosEncuesta(data.data);
        } else {
            enqueueSnackbar('Ocurrio un error, obteniendo los datos de la encuesta', {
                variant: 'error',
            });
        }
    }

    useEffect(() => {
        getDataEncuesta()
    }, [])
    return (
        <>
            <div style={{ width: 700 }}>
                <BarChart chartData={config} />
            </div>
            <div style={{ width: 700 }}>
                <LineChart chartData={config} />
    </div>
            <div style={{ width: 700 }}>
                <PieChart chartData={config} />
            </div>
        </>
    );
}