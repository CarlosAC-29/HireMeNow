import { useState } from 'react';
import './styles/Empleos.css';
import {
    Box,
    Stack,
    Typography,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Paper,
    InputBase,
    Divider,
    IconButton,
} from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { tema } from '../assets/theme';
import SearchIcon from '@mui/icons-material/Search';

function Empleos() {
    const [aprendizChecked, setAprendizChecked] = useState(false);
    const [juniorChecked, setJuniorChecked] = useState(false);
    const [intermedioChecked, setIntermedioChecked] = useState(false);
    const [seniorChecked, setSeniorChecked] = useState(false);
    const [frontend, setFrontendChecked] = useState(false);
    const [backend, setBackendChecked] = useState(false);
    const [fullstack, setFullstackChecked] = useState(false);
    const [devops, setDevopsChecked] = useState(false);
    const [qa, setQAChecked] = useState(false);
    const [soporte, setSoporteChecked] = useState(false);
    const [buscar, setBuscar] = useState(''); // Add state variables for other checkboxes here

    // Define state variables for other checkboxes

    const handleChangeAprendiz = (event) => {
        setAprendizChecked(event.target.checked);
    };

    const handleChangeJunior = (event) => {
        setJuniorChecked(event.target.checked);
    };

    const handleChangeMid = (event) => {
        setIntermedioChecked(event.target.checked);
    };

    const handleChangeSenior = (event) => {
        setSeniorChecked(event.target.checked);
    };

    const handleChangeFrontend = (event) => {
        setFrontendChecked(event.target.checked);
    }

    const handleChangeBackend = (event) => {
        setBackendChecked(event.target.checked);
    }

    const handleChangeFullstack = (event) => {
        setFullstackChecked(event.target.checked);
    }

    const handleChangeDevops = (event) => {
        setDevopsChecked(event.target.checked);
    }

    const handleChangeQA = (event) => {
        setQAChecked(event.target.checked);
    }

    const handleChangeSoporte = (event) => {
        setSoporteChecked(event.target.checked);
    }

    const handleInputChange = (event) => {
        setBuscar(event.target.value);
    };

    const handleSubmitBuscar = () => {
        // Handle search here
        console.log(buscar);
    }

    const handleSubmitFiltro = () => {
        // Gather checkbox values and handle them here
        console.log("Aprendiz:", aprendizChecked);
        console.log("Junior:", juniorChecked);
        console.log("MId:", intermedioChecked);
        console.log("Senior:", seniorChecked);
        console.log("Frontend:", frontend);
        console.log("Backend:", backend);
        console.log("Fullstack:", fullstack);
        console.log("DevOps:", devops);
        console.log("QA:", qa);
        console.log("Soporte:", soporte);
        // Handle other checkboxes here
    };

    return (
        <ThemeProvider theme={tema}>
            <div className='main-box'>
                <Stack direction="column" spacing={2} sx={{ padding: "1rem", width: "30%" }}>
                    <Box sx={{ background: "#FFFFFF", borderRadius: "0.8rem", height: "100%", padding: "1rem" }}>
                        <Paper
                            component="form"
                            sx={{ display: 'flex', alignItems: 'center', border: "2px solid #3673AA", borderRadius: "0.5rem" }}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Buscar ..."
                                inputProps={{ 'aria-label': 'Buscar ...' }}
                                value={buscar}
                                onChange={handleInputChange}
                            />
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSubmitBuscar}>
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem" }}>
                            <Typography sx={{ fontSize: "1.2rem", color: "#3673AA", fontWeight: "bold" }}>Filtrar</Typography>
                            <Button sx={{ height: "1.8rem", background: "#3673AA" }} size="small" variant='contained' onClick={handleSubmitFiltro}>Aplicar</Button>
                        </Box>
                        <Divider sx={{ background: "#3673AA", height: "1px", marginTop: "0.5rem", marginBottom: "0.5rem" }} />
                        <div className='filtros'>
                            <Box sx={{ marginTop: "1rem" }}>
                                <Typography sx={{ color: "#3673AA", fontSize: "1.1rem" }}>Nivel</Typography>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox checked={aprendizChecked} onChange={handleChangeAprendiz} />} label="Aprendiz" />
                                    <FormControlLabel control={<Checkbox checked={juniorChecked} onChange={handleChangeJunior} />} label="Junior" />
                                    <FormControlLabel control={<Checkbox checked={intermedioChecked} onChange={handleChangeMid} />} label="Mid" />
                                    <FormControlLabel control={<Checkbox checked={seniorChecked} onChange={handleChangeSenior} />} label="Senior" />
                                    {/* Add other checkboxes here */}
                                </FormGroup>
                                <Typography sx={{ color: "#3673AA", fontSize: "1.1rem" }}>Cargo</Typography>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox checked={frontend} onChange={handleChangeFrontend} />} label="Frontend" />
                                    <FormControlLabel control={<Checkbox checked={backend} onChange={handleChangeBackend} />} label="Backend" />
                                    <FormControlLabel control={<Checkbox checked={fullstack} onChange={handleChangeFullstack} />} label="Fullstack" />
                                    <FormControlLabel control={<Checkbox checked={devops} onChange={handleChangeDevops} />} label="DevOps" />
                                    <FormControlLabel control={<Checkbox checked={qa} onChange={handleChangeQA} />} label="QA" />
                                    <FormControlLabel control={<Checkbox checked={soporte} onChange={handleChangeSoporte} />} label="Soporte" />
                                    {/* Add other checkboxes here */}
                                </FormGroup>
                            </Box>
                            {/* Add other checkbox groups here */}
                        </div>
                    </Box>
                </Stack>
                <Stack sx={{ width: "100%", alignItems: "center" }}>
                    <Box sx={{ background: "#FFFFFF", width: "70%", borderRadius: "0.8rem" }}>
                        <Stack direction="column" spacing={2} sx={{ padding: "1rem" }}>
                            <Typography sx={{ fontSize: "1.4rem", color: "#3673AA", fontWeight: "bold" }}>Titulo de empleo</Typography>
                            <Typography sx={{ fontSize: ".9rem" }}>Multinacional española especializada en soluciones Smart City ( Portales, dispositivos hardware en vía pública, comunicaciones, IA, etc...) está en proceso de selección de programadores Angular Full Stack. Los profesionales seleccionados se incorporarán a un equipo internacional...</Typography>
                            <Button variant="contained" sx={{ background: "#3673AA", width: "10%", height: "2rem" }}>Visitar</Button>
                        </Stack>
                    </Box>
                </Stack>
            </div>
        </ThemeProvider>
    )
}

export default Empleos;
