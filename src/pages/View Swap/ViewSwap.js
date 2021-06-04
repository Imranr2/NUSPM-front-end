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
import axios from "axios";

function ViewSwap() {
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
            <Grid item container direction="row" spacing={2}>
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
            </Grid>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default ViewSwap;
