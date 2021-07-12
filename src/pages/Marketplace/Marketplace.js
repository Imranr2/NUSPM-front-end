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
  Drawer,
  ClickAwayListener,
} from "@material-ui/core";
import { Alert, Autocomplete } from "@material-ui/lab";
import { theme } from "./theme";
import { useStyles } from "./theme";
import useSwap from "../../hooks/useSwap";
import { connect } from "react-redux";
import PotentialSwaps from "../../components/PotentialSwaps/PotentialSwaps";
import { PulseLoader } from "react-spinners";
import NoSwaps from "../../assets/noSwaps.svg";
import { useMediaQuery } from "react-responsive";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { resetSwap } from "../../redux/actions/swapActions";
import { useDispatch } from "react-redux";
// import ClickAwayListener from "@material-ui/core/ClickAwayListener";

function Marketplace({
  createSuccess,
  searchSuccess,
  offerSuccess,
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

  const isSmallScreen = useMediaQuery({ query: "(max-width:900px)" });

  const [moduleCode, setModuleCode] = useState("");
  const [slotType, setSlotType] = useState("");
  const [currentSlot, setCurrentSlot] = useState("");
  // const [search, setSearch] = useState(false);
  const [drawer, setDrawer] = useState(true);

  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(resetSwap());
  }, []);

  useEffect(() => {
    if (offerSuccess) {
      searchSwap(moduleCode, slotType, currentSlot);
    }
  }, [offerSuccess]);

  function handleSubmit(e) {
    e.preventDefault();
    searchSwap(moduleCode, slotType, currentSlot);
    viewSwaps();
    // setSearch(true);
    toggleDrawer();
  }

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

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

  const SearchBar = (
    <Container className={classes.content} disableGutters={true}>
      <div>
        <form onSubmit={handleSubmit}>
          <Grid
            className={isSmallScreen ? classes.verticalSearch : classes.search}
            container
            spacing={2}
          >
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
                disabled={slotTypeOptions.length === 0 || moduleCode === null}
                classes={{
                  root: classes.fields,
                  paper: classes.paper,
                }}
                options={slotTypeOptions}
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
                disabled={
                  slotType === null ||
                  moduleCode === null ||
                  slotType.length === 0
                }
                classes={{
                  root: classes.fields,
                  paper: classes.paper,
                }}
                options={slotOptions}
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
      </div>
    </Container>
  );

  return (
    <ThemeProvider theme={theme}>
      <Container
        disableGutters={true}
        className={classes.main}
        maxWidth="false"
      >
        <NavBar arr={[false, true, false]} />
        {isSmallScreen && (
          <>
            <Button onClick={toggleDrawer}>{<ExpandMoreIcon />}</Button>
            <Drawer anchor="top" open={drawer} onBackdropClick={toggleDrawer}>
              {SearchBar}
              <Button onClick={toggleDrawer}>{<ExpandLessIcon />}</Button>
            </Drawer>
          </>
        )}
        {!isSmallScreen && SearchBar}
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
              <Container className={classes.notFound}>
                <img src={NoSwaps} alt="Not-Found" />
              </Container>
            </>
          )}
        {error && (
          <>
            <Alert severity="warning">{errorMsg}</Alert>
          </>
        )}
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
    offerSuccess: state.offer.createSuccess,
  };
};
export default connect(mapStateToProps)(Marketplace);
