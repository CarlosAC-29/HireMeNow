import { useState, useContext } from 'react';
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
import { JobContext } from '../context/JobContext';
import notFound from '../assets/animations/404.json'
import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';

function Empleos() {

    const { jobs } = useContext(JobContext);
    const job_option = jobs.ofertas;
    console.log(job_option);
    const navigate = useNavigate();

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
    const [buscar, setBuscar] = useState('');
    const [filteredJobs, setFilteredJobs] = useState(job_option);

    const filterJobs = () => {
        const filtered = job_option.filter(job => {
            // Filtramos por nivel, cargo y también por título de trabajo
            if ((aprendizChecked && job.nivel === "aprendiz") ||
                (juniorChecked && job.nivel === "junior") ||
                (intermedioChecked && job.nivel === "mid") ||
                (seniorChecked && job.nivel === "senior") ||
                (frontend && job.tecnologia === "frontend") ||
                (backend && job.tecnologia === "backend") ||
                (fullstack && job.tecnologia === "fullstack") ||
                (devops && job.tecnologia === "devops") ||
                (qa && job.tecnologia === "qa") ||
                (soporte && job.tecnologia === "soporte")) {
                return true;
            }
            return false;
        });
        setFilteredJobs(filtered);
    }

    const filterJobsInput = () => {
        const filtered = job_option.filter(job => {
            // Filtramos por título de trabajo
            if ((job.job_title.includes(buscar))) {
                return true;
            }
            return false;
        });
        setFilteredJobs(filtered);
    }

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

    const handleSubmitFiltro = () => {
        filterJobs();
    };

    const handleSubmitFiltroInput = () => {
        filterJobsInput();
    };

    return (
        <ThemeProvider theme={tema}>

            <div className='main-box'>
                {job_option.length === 0 ?
                    <Box sx={{ background: "#FFFFFF", width: "40%", height:"80%", borderRadius: "0.8rem", margin: "1rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{ padding: "1rem" }}>
                            <Typography sx={{ fontSize: "1.8rem", color: "#3673AA", fontWeight: "bold" }}>
                                No se encontraron resultados... :c
                            </Typography>
                            <Lottie animationData={notFound} style={{ width: "40%" }} />
                            <Button variant='contained' onClick={() => navigate('/')}> Volver</Button>
                        </Stack>
                    </Box>
                    :
                    <><Stack direction="column" spacing={2} sx={{ width: "45%" }}>
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
                                    onChange={handleInputChange} />
                                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSubmitFiltroInput}>
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
                    </Stack><div className={filteredJobs.length === 0 ? '' : 'jobs-list'}>
                            {filteredJobs.length === 0 ? (
                                <Box sx={{ background: "#FFFFFF", width: "100%", borderRadius: "0.8rem", margin: "1rem" }}>
                                    <Stack direction="column" spacing={2} sx={{ padding: "1rem" }}>
                                        <Typography sx={{ fontSize: "1.4rem", color: "#3673AA", fontWeight: "bold" }}>
                                            No se encontraron resultados... :c
                                        </Typography>
                                    </Stack>
                                </Box>
                            ) : (
                                <Stack direction="column" spacing={5} sx={{ width: "100%", alignItems: "center" }}>
                                    {filteredJobs.map((job, index) => (
                                        <Box key={index} sx={{ background: "#FFFFFF", width: "60%", borderRadius: "0.8rem" }}>
                                            <Stack direction="column" spacing={2} sx={{ padding: "1rem" }}>
                                                <Typography sx={{ fontSize: "1.4rem", color: "#3673AA", fontWeight: "bold" }}>
                                                    {job.job_title}
                                                </Typography>
                                                <Typography sx={{ fontSize: ".9rem" }}>
                                                    {job.job_description_info && job.job_description_info.length > 400 ? `${job.job_description_info.substring(0, 400)}...` : job.job_description_info}
                                                </Typography>
                                                <Button href={job.enlace} target="_blank" rel="noopener noreferrer" variant="contained" sx={{ background: "#3673AA", width: "10%", height: "2rem" }}>
                                                    Visitar
                                                </Button>
                                            </Stack>
                                        </Box>
                                    ))}
                                </Stack>
                            )}
                        </div></>
                }
            </div>
        </ThemeProvider>
    )
}

export default Empleos;
