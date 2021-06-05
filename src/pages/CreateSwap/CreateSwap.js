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
import { useStyles } from "./theme";
import useSwap from "../../hooks/useSwap";

export default function CreateSwap() {
  const classes = useStyles();
  const { moduleList, modDets, getAllModules, getModuleDetails, createSwap } =
    useSwap();

  const [moduleCode, setModuleCode] = useState("");
  const [slotType, setSlotType] = useState("");
  const [currentSlot, setCurrentSlot] = useState("");
  const [desiredSlots, setDesiredSlots] = useState([]);

  useEffect(() => getAllModules());
  useEffect(() => getModuleDetails(moduleCode));

  function handleSubmit(e) {
    e.preventDefault();
    createSwap(moduleCode, slotType, currentSlot, desiredSlots, false, false);
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
                  onChange={(event, value) => setModuleCode(value)}
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
                    new Set(
                      modDets
                        .map((element) => element.lessonType)
                        .filter((lessonType) => lessonType !== "Lecture")
                    )
                  )}
                  onChange={(event, value) => setSlotType(value)}
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
                    .filter((element) => element.lessonType === slotType)
                    .map((lesson) => lesson.classNo)
                    .sort()}
                  onChange={(event, value) => setCurrentSlot(value)}
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
                  value={desiredSlots}
                  options={modDets
                    .filter((element) => element.lessonType === slotType)
                    .map((lesson) => lesson.classNo)
                    .filter((classNo) => classNo != currentSlot)
                    .sort()}
                  onChange={(event, value) => {
                    setDesiredSlots(value);
                    console.log(desiredSlots);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      inputProps={{
                        ...params.inputProps,
                        required: desiredSlots.length === 0,
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
