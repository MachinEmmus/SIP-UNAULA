import React, { Fragment, useState } from 'react';
import Swal from "sweetalert2";

import { enviarEncuesta } from '../utils/enviarEncuesta';

const defaultForm = {
    cedula: "",
    nombre: "",
    apellido: "",
    fecha: "",
    hora: "",
    sintomas: "",
}

const Encuesta = () => {
    //Crear state de citas
    const [formEncuestaCovid, initForm] = useState(defaultForm);

    //Funcion que se  ejecuta cada que el usuario escribe en los input
    const actualizarState = (e) => {
        initForm({
            ...formEncuestaCovid,
            [e.target.name]: e.target.value,
        });
    };

    //Extraer los valores Destructuring
    const {
        cedula, nombre, apellido, fecha, hora, sintomas
    } = formEncuestaCovid;

    //Cuando el usuario envía el formulario
    const submitEncuesta = (e) => {
        e.preventDefault();

        //Validar
        if (
            nombre.trim() === "" ||
            apellido.trim() === "" ||
            fecha.trim() === "" ||
            hora.trim() === "" ||
            sintomas.trim() === ""
        ) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Todos los campos son obligatorios!",
            });
            return;
        }

        Swal.fire("Hecho!", "La información se registro con exito.", "success");
        //Asignar ID

        //Crear la cita
        enviarEncuesta(formEncuestaCovid);

        //Reiniciar el form
        initForm(defaultForm);
    };

    return (
        <Fragment>
            <h2>Encuesta Covid UNAULA</h2>

            <form onSubmit={submitEncuesta}>
                <label>Cedula</label>
                <input
                    type="text"
                    name="cedula"
                    className="u-full-width"
                    placeholder="Cedula"
                    onChange={actualizarState}
                    value={cedula}
                />
                <br />
                <label>Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    className="u-full-width"
                    placeholder="Nombres"
                    onChange={actualizarState}
                    value={nombre}
                />
                <br />
                <label>Apellido</label>
                <input
                    type="text"
                    name="apellido"
                    className="u-full-width"
                    placeholder="Apellidos"
                    onChange={actualizarState}
                    value={apellido}
                />
                <br />
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <br />
                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                <br />
                <label>Síntomas</label>
                <textarea
                    name="sintomas"
                    cols="30"
                    rows="10"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>

                <button type="submit" className="u-full-width button-primary">
                    Enviar
                </button>
            </form>
        </Fragment>
    );
};

export default Encuesta;
