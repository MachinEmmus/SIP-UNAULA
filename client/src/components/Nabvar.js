import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';

import { useNavigate, Link } from "react-router-dom";

export default function Nabvar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: "none", color: '#ff8000' }}>
                SIP UNAULA
              </Link>
            </Typography>
            {localStorage.getItem('token')
              ? <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/")
                  }}
                >
                  Cerrar Sesion
                </Button>
              </>
              :
              <>
                <Tooltip title="Para diligenciar la encuesta inicia sesion" placement="bottom" arrow>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/login")}
                  >
                    Inicio de Sesion
                  </Button>
                </Tooltip>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/register")}
                >
                  Registrarse
                </Button>
              </>
            }
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/encuesta")}
              disabled={localStorage.getItem('token') ? false : true}
            >
              Encuesta
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box >
  );
}
