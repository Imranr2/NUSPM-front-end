import React from "react";
import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import {
  ThemeProvider,
  Container,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { theme } from "../../Theme";
import { Link as RouterLink } from "react-router-dom";
import { useStyles } from "./theme";
import axios from "axios";

export default function CreateSwap() {
  const classes = useStyles();
  const [moduleList, setModuleList] = useState([]);
  const [modDets, setModDets] = useState([]);
  const [selectedMod, setSelectedMod] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCurrent, setSelectedCurrent] = useState("");
  const [selectedDesired, setSelectedDesired] = useState([]);

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

  function handleSubmit() {
    console.log("submitted");
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <div>
          <NavBar arr={[false, true, false]} />
          <form onSubmit={handleSubmit}>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  options={moduleList}
                  onChange={(event, value) => setSelectedMod(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
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
                  onChange={(event, value) => setSelectedType(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Type"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  options={modDets
                    .filter((element) => element.lessonType === selectedType)
                    .map((lesson) => lesson.classNo)
                    .sort()}
                  onChange={(event, value) => setSelectedCurrent(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Current Slot"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  value={selectedDesired}
                  options={modDets
                    .filter((element) => element.lessonType === selectedType)
                    .map((lesson) => lesson.classNo)
                    .sort()}
                  onChange={(event, value) => setSelectedDesired(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      inputProps={{
                        ...params.inputProps,
                        required: selectedDesired.length === 0,
                      }}
                      label="Desired Slots"
                      variant="outlined"
                    />
                  )}
                  multiple
                />
              </Grid>
            </Grid>
            <Button
              className={classes.button}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Create
            </Button>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
}
