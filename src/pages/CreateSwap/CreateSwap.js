import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import NavBar from "../../components/NavBar";
import {
  ThemeProvider,
  Container,
  Grid,
  Button,
  TextField,
  Link,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { theme } from "../../Theme";
import { useStyles } from "./theme";
import useSwap from "../../hooks/useSwap";
import Alert from "@material-ui/lab/Alert";

function CreateSwap({ success, error, errorMsg }) {
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
      <NavBar arr={[false, true, false]} />
      <Container className={classes.form} component="main" maxWidth="xs">
        <div>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  classes={{ paper: classes.paper }}
                  options={moduleList}
                  onChange={(event, value) => {
                    setModuleCode(value);
                  }}
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
                  classes={{ paper: classes.paper }}
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
                  classes={{ paper: classes.paper }}
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
                  classes={{ paper: classes.paper }}
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
            {success && (
              <Alert severity="success">
                Swap created successfully!{" "}
                <Link component={RouterLink} to="/marketplace">
                  Click here to find swaps!
                </Link>
              </Alert>
            )}
            {error && (
              <Alert severity="error">
                Swap creation failed!{` ${errorMsg}`}
              </Alert>
            )}
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    success: state.swap.success,
    error: state.swap.error,
    errorMsg: state.swap.errorMsg,
  };
};
export default connect(mapStateToProps)(CreateSwap);
