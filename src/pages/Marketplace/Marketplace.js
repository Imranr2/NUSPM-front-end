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
import { Alert, Autocomplete } from "@material-ui/lab";
import { theme } from "./theme";
import { useStyles } from "./theme";
import useSwap from "../../hooks/useSwap";
import { connect } from "react-redux";
import SwapList from "../../components/SwapList/SwapList";

function Marketplace({ success, error, errorMsg }) {
  const classes = useStyles();
  const {
    moduleList,
    modDets,
    potentialSwaps,
    getAllModules,
    getModuleDetails,
    searchSwap,
  } = useSwap();

  const [moduleCode, setModuleCode] = useState("");
  const [slotType, setSlotType] = useState("");
  const [currentSlot, setCurrentSlot] = useState("");
  const [localSuccess, setLocalSuccess] = useState(false);

  useEffect(() => getAllModules(), []);

  useEffect(() => getModuleDetails(moduleCode), [moduleCode]);

  useEffect(() => {
    if (success) {
      setLocalSuccess(true);
    }
  }, [success]);

  function handleSubmit(e) {
    e.preventDefault();
    searchSwap(moduleCode, slotType, currentSlot);
  }
  return (
    <ThemeProvider theme={theme}>
      <NavBar arr={[false, true, false]} />
      <Container className={classes.main} disableGutters={true}>
        <div>
          <form onSubmit={handleSubmit}>
            <Grid className={classes.search} container spacing={2}>
              <Grid item>
                <Autocomplete
                  classes={{
                    root: classes.fields,
                    paper: classes.paper,
                  }}
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
                  required
                />
              </Grid>
              <Grid item>
                <Autocomplete
                  classes={{
                    root: classes.fields,
                    paper: classes.paper,
                  }}
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
                  required
                />
              </Grid>
              <Grid item>
                <Autocomplete
                  classes={{
                    root: classes.fields,
                    paper: classes.paper,
                  }}
                  options={modDets
                    .filter((element) => element.lessonType === slotType)
                    .map((lesson) => lesson.classNo)
                    .sort()}
                  onChange={(event, value) => setCurrentSlot(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Your Current Slot"
                      variant="outlined"
                    />
                  )}
                  required
                />
              </Grid>
              <Grid item>
                <Button
                  className={classes.button}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </form>
          <SwapList arr={potentialSwaps} />
          {/* {localSuccess && <SwapList arr={potentialSwaps}></SwapList>} */}
          {/* display some other thing, not alert */}
          {/* {potentialSwaps.length === 0 && (
            <Alert severity="error">No swaps found!</Alert>
          )} */}
          {/* {error} */}
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
export default connect(mapStateToProps)(Marketplace);
