import React from "react";
import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import {
  ThemeProvider,
  Container,
  Grid,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Menu,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { theme } from "../../Theme";
import { Link as RouterLink } from "react-router-dom";
import { useStyles } from "./theme";
import axios from "axios";

export default function CreateSwap() {
  const classes = useStyles();
  const [moduleCode, setModuleCode] = useState("");
  const [type, setType] = useState("");
  const [currentSlot, setCurrentSlot] = useState("");
  const [desiredSlot, setDesiredSlot] = useState("");
  const [moduleList, setModuleList] = useState([]);
  const [selectedMod, setSelectedMod] = useState("");
  const [modDets, setModDets] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [slotList, setSlotList] = useState([]);

  useEffect(() => {
    if (moduleList.length === 0) {
      console.log(0);
      axios
        .get("https://api.nusmods.com/v2/2020-2021/moduleList.json")
        .then((response) => response.data)
        .then((mods) => mods.map((mod) => mod.moduleCode))
        .then((result) => setModuleList(result));
    }
  });

  useEffect(() => {
    if (selectedMod !== "") {
      axios
        .get(`https://api.nusmods.com/v2/2020-2021/modules/${selectedMod}.json`)
        .then((response) => response.data.semesterData[0].timetable)
        .then((result) => setModDets(result));
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <div>
          <NavBar />
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  options={moduleList}
                  onChange={(event, value) => setSelectedMod(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Module Code"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  options={Array.from(
                    new Set(modDets.map((element) => element.lessonType))
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label="Type" variant="outlined" />
                  )}
                />
              </Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );

  // const handleModuleCode = (event) => {
  //   setModuleCode(event.target.value);
  // };

  // const handleType = (event) => {
  //   setType(event.target.value);
  // };
  // const handleCurrentSlot = (event) => {
  //   setCurrentSlot(event.target.value);
  // };
  // const handleDesiredSlot = (event) => {
  //   setDesiredSlot(event.target.value);
  // };

  // return (
  //   <ThemeProvider theme={theme}>
  //     <Container component="main" maxWidth="xs">
  //       <div>
  //         <NavBar></NavBar>
  //         <form>
  //           <Grid container spacing={2}>
  //             <Grid item xs={12}>
  //               <FormControl
  //                 className={classes.inputs}
  //                 color="primary"
  //                 variant="outlined"
  //                 required
  //               >
  //                 <InputLabel id="labelForModuleCode">Module Code</InputLabel>
  //                 <Select
  //                   labelId="labelForModuleCode"
  //                   label="Module Code"
  //                   value={moduleCode}
  //                   onOpen={initialise}
  //                   onChange={handleModuleCode}
  //                 >
  //                   {moduleList.map((modName) => (
  //                     <MenuItem value={modName}>{modName}</MenuItem>
  //                   ))}
  //                 </Select>
  //               </FormControl>
  //             </Grid>
  //             <Grid item xs={12}>
  //               <FormControl
  //                 className={classes.inputs}
  //                 color="primary"
  //                 variant="outlined"
  //                 required
  //               >
  //                 <InputLabel id="labelForType">Type</InputLabel>
  //                 <Select
  //                   labelId="labelForType"
  //                   label="Type"
  //                   value={type}
  //                   onChange={handleType}
  //                 >
  //                   <MenuItem value={10}>Ten</MenuItem>
  //                   <MenuItem value={20}>Twenty</MenuItem>
  //                   <MenuItem value={30}>Thirty</MenuItem>
  //                 </Select>
  //               </FormControl>
  //             </Grid>
  //             <Grid item xs={12}>
  //               <FormControl
  //                 className={classes.inputs}
  //                 color="primary"
  //                 variant="outlined"
  //                 required
  //               >
  //                 <InputLabel id="labelForCurrentSlot">Current Slot</InputLabel>
  //                 <Select
  //                   labelId="labelForCurrentSlot"
  //                   label="Current Slot"
  //                   value={currentSlot}
  //                   onChange={handleCurrentSlot}
  //                 >
  //                   <MenuItem value={10}>Ten</MenuItem>
  //                   <MenuItem value={20}>Twenty</MenuItem>
  //                   <MenuItem value={30}>Thirty</MenuItem>
  //                 </Select>
  //               </FormControl>
  //             </Grid>
  //             <Grid item xs={12}>
  //               <FormControl
  //                 className={classes.inputs}
  //                 color="primary"
  //                 variant="outlined"
  //                 required
  //               >
  //                 <InputLabel id="labelForDesiredSlot">Desired Slot</InputLabel>
  //                 <Select
  //                   labelId="labelForDesiredSlot"
  //                   label="Desired Slot"
  //                   value={desiredSlot}
  //                   onChange={handleDesiredSlot}
  //                 >
  //                   <MenuItem value={10}>Ten</MenuItem>
  //                   <MenuItem value={20}>Twenty</MenuItem>
  //                   <MenuItem value={30}>Thirty</MenuItem>
  //                 </Select>
  //               </FormControl>
  //             </Grid>
  //           </Grid>

  //           <Button type="submit" fullWidth variant="contained" color="primary">
  //             Create
  //           </Button>
  //         </form>
  //       </div>
  //     </Container>
  //   </ThemeProvider>
  // );
}
