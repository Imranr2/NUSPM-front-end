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
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { theme } from "../../Theme";
import { useStyles } from "./theme";
import useSwap from "../../hooks/useSwap";
import Alert from "@material-ui/lab/Alert";

function CreateSwap({ success, error, errorMsg, loading }) {
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

  const [moduleCode, setModuleCode] = useState([]);
  const [slotType, setSlotType] = useState([]);
  const [currentSlot, setCurrentSlot] = useState([]);
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

  let slotTypeOptions = Array.from(
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

  let newDesiredSlots = desiredSlots.filter((x) => x !== currentSlot);

  // destructive filter
  Array.prototype.removeIf = function (callback) {
    var i = 0;
    while (i < this.length) {
      if (callback(this[i], i)) {
        this.splice(i, 1);
      } else {
        ++i;
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        disableGutters={true}
        className={classes.main}
        maxWidth="false"
      >
        <NavBar arr={[false, true, false]} />
        <Container className={classes.form} component="main" maxWidth="xs">
          <div>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h4" color="primary">
                    Create Swap Request
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    value={moduleCode}
                    classes={{ paper: classes.paper }}
                    options={moduleList}
                    onChange={(event, value) => {
                      setModuleCode(value);
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
                    disabled={
                      slotTypeOptions.length === 0 || moduleCode === null
                    }
                    classes={{ paper: classes.paper }}
                    options={slotTypeOptions}
                    onChange={(event, value) => {
                      setSlotType(value);
                      setCurrentSlot([]);
                      setDesiredSlots([]);
                    }}
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
                    disabled={
                      slotType === null ||
                      moduleCode === null ||
                      slotType.length === 0
                    }
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
                    value={
                      desiredSlots.removeIf((slot) => slot === currentSlot) ||
                      desiredSlots
                    }
                    disabled={
                      slotType === null ||
                      moduleCode === null ||
                      slotType.length === 0
                    }
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
                disabled={loading}
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
      </Container>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    success: state.swap.createSuccess,
    error: state.swap.createError,
    errorMsg: state.swap.errorMsg,
    loading: state.swap.createLoading,
  };
};
export default connect(mapStateToProps)(CreateSwap);
