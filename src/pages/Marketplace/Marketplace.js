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

function Marketplace({ success, error, errorMsg, user }) {
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
  const [localSuccess, setLocalSuccess] = useState(false);
  const [search, setSearch] = useState(false);

  useEffect(() => getAllModules(), []);

  useEffect(() => getModuleDetails(moduleCode), [moduleCode]);

  useEffect(
    () => getSlotDetails(currentSlot, slotType),
    [currentSlot, slotType]
  );

  useEffect(() => {
    if (success) {
      setLocalSuccess(true);
    }
  }, [success]);

  useEffect(() => {
    viewSwaps();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    searchSwap(moduleCode, slotType, currentSlot);
    setSearch(true);
    console.log(userSwaps);
    console.log(slotDets);
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
          {search &&
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
          {search &&
            potentialSwaps.filter((swap) => swap.user_id !== user.id).length ===
              0 && <Alert severity="warning">No swap found.</Alert>}

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
    user: state.auth.user,
  };
};
export default connect(mapStateToProps)(Marketplace);

/*
//Marketplace get potetialSwaps, userSwapss
  //potentialSwaps, new SwapList(PotentialSwaps), map into new Swap component(<PotentialSwap swap={swap} />)
    //PotentialSwap => ButtonBase, onclick=open dialog, setState for creatorSwap 
      Dialog
        Step 1:
        DialogContent
        userSwapss.map into layout and individual swap (not a separate component)
          Each swap => ButtonBase, onClick = setState for initiatorSwap
        DialogActions
        Next Button onClick={compare 2 swaps to match modcode etc...if dont match, render error else value == 3}
        Create Button onclick{value == 2}
        Step 2(optional): 
        AutoCompletes for creation of swap
        Submit onClick={useEffect [success], if true, set value === 3,create swap, setState of initiatorSwap}
        Step 3:
        initiatorSwap >>> creatorSwap
        confirm button onclick={create offer using the 2 swap details}


*/

/*
Button to open
Dialog
  value == 1 && 
  userSwapss

  value == 2 &&
  step 2

  value = 3 &&

Dialog
*/
