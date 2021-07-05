import React from "react";
import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import {
  ThemeProvider,
  Container,
  Grid,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert, Autocomplete } from "@material-ui/lab";
import { theme } from "./theme";
import { useStyles } from "./theme";
import useSwap from "../../hooks/useSwap";
import { connect } from "react-redux";
import PotentialSwaps from "../../components/PotentialSwaps/PotentialSwaps";
import { PulseLoader } from "react-spinners";
import { Ghost } from "react-kawaii";
import NotFound from "../../assets/not-found.png";

function Marketplace({
  createSuccess,
  searchSuccess,
  error,
  errorMsg,
  user,
  loading,
}) {
  const classes = useStyles();
  const {
    moduleList,
    modDets,
    potentialSwaps,
    getAllModules,
    getModuleDetails,
    slotDets,
    getSlotDetails,
    searchSwap,
    viewSwaps,
    userSwaps,
  } = useSwap();

  const [moduleCode, setModuleCode] = useState("");
  const [slotType, setSlotType] = useState("");
  const [currentSlot, setCurrentSlot] = useState("");
  const [search, setSearch] = useState(false);

  useEffect(() => getAllModules(), []);

  useEffect(() => getModuleDetails(moduleCode), [moduleCode]);

  useEffect(
    () => getSlotDetails(currentSlot, slotType),
    [currentSlot, slotType]
  );

  useEffect(() => {
    if (createSuccess) {
      viewSwaps();
    }
  }, [createSuccess]);

  function handleSubmit(e) {
    e.preventDefault();
    searchSwap(moduleCode, slotType, currentSlot);
    setSearch(true);
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
                  value={moduleCode}
                  classes={{
                    root: classes.fields,
                    paper: classes.paper,
                  }}
                  options={moduleList}
                  onChange={(event, value) => {
                    setModuleCode(value);
                    setSlotType([]);
                    setCurrentSlot([]);
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
                  value={slotType}
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
                  onChange={(event, value) => {
                    setSlotType(value);
                    setCurrentSlot([]);
                  }}
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
                  value={currentSlot}
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
                  size="large"
                  disabled={loading}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </form>
          <Container className={classes.container}>
            <Alert severity="info" className={classes.alert}>
              Click on the listing to initiate a swap!
            </Alert>
          </Container>
          <br />
          {loading && <PulseLoader color="#0D169F" />}

          {searchSuccess &&
            potentialSwaps.filter((swap) => swap.user_id !== user.id).length >
              0 && (
              <PotentialSwaps
                creatorSwaps={potentialSwaps.filter(
                  (swap) => swap.user_id !== user.id
                )}
                initiatorSwaps={userSwaps}
                initiatorSlot={currentSlot}
                slotDets={slotDets}
              />
            )}
          {/* {searchSuccess &&
            potentialSwaps.filter((swap) => swap.user_id !== user.id).length ===
              0 && <Alert severity="warning">No swap found.</Alert>} */}
          {searchSuccess &&
            potentialSwaps.filter((swap) => swap.user_id !== user.id).length ===
              0 && (
              <>
                <img src={NotFound} width="500" alt="Not-Found" />
              </>
            )}
          {error && (
            <>
              <Alert severity="warning">{errorMsg}</Alert>
            </>
          )}
        </div>
      </Container>
    </ThemeProvider>
  );
}
const mapStateToProps = (state) => {
  return {
    error: state.swap.searchError,
    errorMsg: state.swap.errorMsg,
    user: state.auth.user,
    loading: state.swap.searchLoading,
    searchSuccess: state.swap.searchSuccess,
    createSuccess: state.swap.createSuccess,
  };
};
export default connect(mapStateToProps)(Marketplace);
