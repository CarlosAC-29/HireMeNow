import React from 'react'
import './styles/Empleos.css'
import {
    Box,
    Stack,
    Typography,
    TextField,
    Grid,
    Button,
    FormControl,
    MenuItem,
    InputLabel,
    Select,
    OutlinedInput,
    Chip,
    createTheme
} from '@mui/material';

function Empleos() {
    return (
        <div className='main-box'>
            <Stack sx={{ width: "100%", alignItems: "center" }}>
                <Box sx={{ background: "#FFFFFF", width: "50%", borderRadius: "0.8rem" }}>
                    <Stack direction="column" spacing={2} sx={{ padding: "1rem" }}>
                        <Typography sx={{ fontSize: "1rem", color: "#3673AA" }}>Titulo de empleo</Typography>
                        <Typography sx={{ fontSize: "0.8rem" }}>Multinacional española especializada en soluciones Smart City ( Portales, dispositivos hardware en vía pública, comunicaciones, IA, etc...) está en proceso de selección de programadores Angular Full Stack. Los profesionales seleccionados se incorporarán a un equipo internacional...</Typography>
                        <Button variant="contained" sx={{ background: "#3673AA", width: "10%", height: "2rem" }}>Visitar</Button>

                    </Stack>
                </Box>
            </Stack>
        </div>
    )
}

export default Empleos
