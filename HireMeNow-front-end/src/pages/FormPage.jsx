import { useState } from 'react';
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
} from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import job from '../assets/images/job.svg';
import Lottie from 'lottie-react';
import developer from '../assets/animations/developer.json';
import { useForm } from 'react-hook-form';
import { tema, MenuProps } from '../assets/theme';
import { names } from '../assets/technologies';
import Swal from 'sweetalert2';

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function FormPage() {

    const { register, handleSubmit, setValue } = useForm(
        {
            defaultValues: {
                niveleducativo: '',
                experencia: '',
                habilidades: '',
                ubicacion: '',
            }
        }
    )

    const theme = useTheme();
    const [nivelEducativo, setNivelEducativo] = useState('');
    const [experencia, setExperencia] = useState('');
    const [habilidad, setHabilidad] = useState([]);
    const [data, setData] = useState('')

    const processForm = (query_data) => {
        setData(query_data);
        if (!query_data.niveleducativo || !query_data.experencia || habilidad.length === 0 || !query_data.ubicacion) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor completa todos los campos',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        } else {
            // Si todos los campos están completos, puedes continuar con el proceso
            console.log(data);
            
        }
    }

    const handleChangeSkill = (event) => {
        const {
            target: { value },
        } = event;
        setHabilidad(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        setValue('habilidades', value);
    };

    const handleChangeNivelEducativo = (event) => {
        const { value } = event.target;
        setValue('niveleducativo', value);
        setNivelEducativo(value);
    };

    const handleChangeExperiencia = (event) => {
        const { value } = event.target;
        setValue('experencia', value);
        setExperencia(value);
    };

    return (
        <div>
            <ThemeProvider theme={tema}>
                <Stack
                    direction="row"
                    justifyContent="center"
                    sx={{ height: "100vh", width: "100%" }}

                >
                    <Box sx={{ width: "50%", padding: "4%" }}>
                        <Typography
                            sx={{
                                fontWeight: "bold",
                                fontSize: "1.8rem",
                                marginBottom: "10%",
                                color: "#3673AA"
                            }}
                        >COMPLETA LOS SIGUIENTES CAMPOS PARA COMENZAR TU BUSQUEDA</Typography>
                        <form onSubmit={handleSubmit(processForm)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="Nivel educativo">Nivel educativo</InputLabel>
                                        <Select
                                            labelId="Nivel educativo"
                                            id="nivel_educativo"
                                            value={nivelEducativo}
                                            label="Nivel educativo"
                                            onChange={handleChangeNivelEducativo}
                                        >
                                            <MenuItem value="ninguno">Ninguno</MenuItem>
                                            <MenuItem value="bachiller">Bachiller</MenuItem>
                                            <MenuItem value="tecnico">Tecnico</MenuItem>
                                            <MenuItem value="tecnologo">Tecnologo</MenuItem>
                                            <MenuItem value="universitario">Universitario</MenuItem>
                                            <MenuItem value="posgrado">Posgrado</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="Experencia">Experencia</InputLabel>
                                        <Select
                                            labelId="Experencia"
                                            id="experencia"
                                            value={experencia}
                                            label="experencia"
                                            onChange={handleChangeExperiencia}
                                        >
                                            <MenuItem value="1 año">&lt; 1 años</MenuItem>
                                            <MenuItem value="1 a  años">1 - 3 años</MenuItem>
                                            <MenuItem value="mas de 3 años">&gt; 3 años</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl sx={{ width: "100%" }}>
                                        <InputLabel id="demo-multiple-chip-label">Habilidades</InputLabel>
                                        <Select
                                            labelId="demo-multiple-chip-label"
                                            id="demo-multiple-chip"
                                            multiple
                                            value={habilidad}
                                            onChange={handleChangeSkill}
                                            input={<OutlinedInput id="select-multiple-chip" label="Habilidades" />}
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} />
                                                    ))}
                                                </Box>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {names.map((name) => (
                                                <MenuItem
                                                    key={name}
                                                    value={name}
                                                    style={getStyles(name, habilidad, theme)}
                                                >
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="ubicacion"
                                        label="Ubicación"
                                        variant="outlined"
                                        {...register('ubicacion')}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type='submit' variant="contained" sx={{ background: "#3673AA", width: "30%" }}>
                                        BUSCAR
                                    </Button>
                                </Grid>

                            </Grid>
                        </form>
                    </Box>
                    <Box sx={{ background: "#3673AA", width: "50%" }}>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            spacing={3}
                            alignItems="center"
                            sx={{ height: "100%" }}
                        >
                            <Box sx={{ height: "2rem" }}>
                                <img src={job} alt='job-icon' width={50} />
                            </Box>
                            <Typography
                                sx={{
                                    fontWeight: "bold",
                                    color: "#fff",
                                    fontSize: "2.3rem",
                                    textAlign: "center",
                                    maxWidth: "50%"
                                }}>¡BIENVENIDO A HIRE.ME.NOW!</Typography>
                            <Typography
                                sx={{
                                    fontWeight: "light",
                                    color: "#fff",
                                    fontSize: "1.2rem",
                                    maxWidth: "70%",
                                    textAlign: "center"
                                }}>Tu aliado para alcanzar nuevas oportunidades laborales de TI</Typography>
                            <Lottie animationData={developer} style={{ width: "40%" }} />
                        </Stack>
                    </Box>
                </Stack>
            </ThemeProvider>
        </div>
    );
}
