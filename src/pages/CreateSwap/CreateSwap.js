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
  const {
    moduleList,
    modDets,
    getAllModules,
    getModuleDetails,
    getSlotDetails,
    createSwap,
    slotDets,
  } = useSwap();

  const [moduleCode, setModuleCode] = useState("");
  const [slotType, setSlotType] = useState("");
  const [currentSlot, setCurrentSlot] = useState("");
  const [desiredSlots, setDesiredSlots] = useState([]);

  useEffect(() => getAllModules(), []);

  useEffect(
    () => getSlotDetails(currentSlot, slotType),
    [currentSlot, slotType, desiredSlots]
  );

  useEffect(() => getModuleDetails(moduleCode), [moduleCode]);

  function handleSubmit(e) {
    e.preventDefault();
    createSwap(moduleCode, slotType, currentSlot, desiredSlots, false, false);
    setModuleCode([]);
    setSlotType([]);
    setCurrentSlot([]);
    setDesiredSlots([]);
  }

  const slotTypeOptions = Array.from(
    new Set(
      modDets
        .map((element) => element.lessonType)
        .filter((lessonType) => lessonType !== "Lecture")
    )
  );

  const slotOptions = modDets
    .filter((element) => element.lessonType === slotType)
    .map((lesson) => lesson.classNo)
    .sort();

  const desiredSlotOptions = slotOptions.filter(
    (classNo) => classNo !== currentSlot
  );

  return (
    <ThemeProvider theme={theme}>
      <NavBar arr={[false, true, false]} />
      <Container className={classes.main} component="main" maxWidth="xs">
        <div>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  value={moduleCode}
                  classes={{ paper: classes.paper }}
                  options={moduleList}
                  onChange={(event, value) => {
                    setModuleCode(value);
                    // getModuleDetails(value);
                    setSlotType([]);
                    setCurrentSlot([]);
                    setDesiredSlots([]);
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
                  value={slotType}
                  classes={{ paper: classes.paper }}
                  options={slotTypeOptions}
                  onChange={(event, value) => setSlotType(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      value={slotType}
                      required
                      label="Type"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  value={currentSlot}
                  classes={{ paper: classes.paper }}
                  options={slotOptions}
                  onChange={(event, value) => {
                    setCurrentSlot(value);
                  }}
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
                  options={desiredSlotOptions}
                  onChange={(event, value) => {
                    setDesiredSlots(value);
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
