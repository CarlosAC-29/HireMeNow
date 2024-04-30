import React, { useState } from 'react';
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
    Chip
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import job from '../assets/images/job-icon.png';
import Lottie from 'lottie-react';
import developer from '../assets/animations/developer.json';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
    'JAVA',
    'PYTHON',
    'C++',
    'C#',
    'JAVASCRIPT',
    'HTML',
    'CSS',
    'REACT',
    'ANGULAR',
    'Otros',
  ];
  
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

function FormPage() {

    const [nivelEducativo, setNivelEducativo] = useState('');
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
  
    const handleChangeSkill = (event) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    const handleChangeNivelEducativo = (event) => {
        setAge(event.target.value);
    };

    return (
        <div>
            <Stack
                direction="row"
                justifyContent="center"
                sx={{ height: "100vh", width: "100%" }}

            >
                <Box sx={{ width: "50%", padding: "2%" }}>
                    <Typography
                        sx={{
                            fontWeight: "bold",
                            fontSize: "1.8rem",
                            marginBottom: "10%",
                            color: "#3673AA"
                        }}
                    >COMPLETA LOS SIGUIENTES CAMPOS PARA COMENZAR TU BUSQUEDA</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="Nivel educativo">Nivel educativo</InputLabel>
                                <Select
                                    labelId="Nivel educativo"
                                    id="demo-simple-select"
                                    value={nivelEducativo}
                                    label="Age"
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
                            <TextField
                                fullWidth
                                label="Experiencia"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl sx={{width: "100%" }}>
                                <InputLabel id="demo-multiple-chip-label">Habilidades</InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={personName}
                                    onChange={handleChangeSkill}
                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
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
                                            style={getStyles(name, personName, theme)}
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
                                label="Ubicación"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" sx={{ background: "#3673AA", width: "30%" }}>
                                BUSCAR
                            </Button>
                        </Grid>

                    </Grid>
                </Box>
                <Box sx={{ background: "#3673AA", width: "50%" }}>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        spacing={3}
                        alignItems="center"
                        sx={{ height: "100vh" }}
                    >
                        <img src={job} alt='job-icon' />
                        <Typography
                            sx={{
                                fontWeight: "bold",
                                color: "#fff",
                                fontSize: "2rem",
                                textAlign: "center"
                            }}>¡BIENVENIDO A HIRE.ME.NOW!</Typography>
                        <Typography
                            sx={{
                                fontWeight: "lighter",
                                color: "#fff",
                                fontSize: "1.2rem",
                                maxWidth: "50%",
                                textAlign: "center"
                            }}>Tu aliado para alcanzar nuevas oportunidades laborales de TI</Typography>
                        <Lottie animationData={developer} style={{ width: "40%" }} />
                    </Stack>
                </Box>
            </Stack>
        </div>
    );
}

export default FormPage;