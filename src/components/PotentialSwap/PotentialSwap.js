import {
  Button,
  ButtonBase,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useState, useEffect } from "react";
import useSwap from "../../hooks/useSwap";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { connect } from "react-redux";
import { HighlightButton } from "./theme";
import { useStyles } from "./theme";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
function PotentialSwap(props) {
  const classes = useStyles();
  // const [initiatorSwap, setInitiatorSwap] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentDialog, setCurrentDialog] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const filteredUserSwaps = props.initiatorSwaps.filter(
    (userSwap) =>
      userSwap.module_code === props.creatorSwap.module_code &&
      userSwap.slot_type === props.creatorSwap.slot_type
  );

  const {
    userSwaps,
    createSwap,
    initiatorSwap,
    slotDets,
    setInitiatorSwap,
    setSlotDets,
  } = useSwap();

  const handleDialogClickOpen = () => {
    // console.log(userSwaps);
    // console.log(filteredUserSwaps);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setCurrentDialog(0);
    setDisabled(true);
  };

  const handleInitiatorSwapClick = (params) => {
    setInitiatorSwap(params);
    setDisabled(!disabled);
  };

  const handleNext = () => {
    setCurrentDialog(2);
  };

  const handleCreate = () => {
    setCurrentDialog(1);
  };

  const handleCreateSwap = () => {
    console.log(props.slotDets);
    createSwap(
      props.creatorSwap.module_code,
      props.creatorSwap.slot_type,
      props.initiatorSlot,
      [props.creatorSwap.current_slot],
      false,
      true
    );
    setCurrentDialog(2);
  };

  useEffect(() => setSlotDets(props.slotDets));

  return (
    <Grid key={props} item xs={12} sm={6} md={4} justify="center">
      <Card className={classes.card}>
        <CardActionArea
          className={classes.actionArea}
          onClick={handleDialogClickOpen}
        >
          <CardContent>
            <Typography variant="h6">
              {props.creatorSwap.module_code}
              <br />
              {props.creatorSwap.slot_type} [{props.creatorSwap.current_slot}]
              <br />
              {props.creatorSwap.day}
              <br />
              {props.creatorSwap.venue}
              <br />
              {`${props.creatorSwap.startTime} - ${props.creatorSwap.endTime}`}
              <br />
              {props.creatorSwap.desired_slots}
            </Typography>
          </CardContent>
        </CardActionArea>

        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>
            {currentDialog === 0 && <Typography>Choose Your Swap</Typography>}
            {currentDialog === 1 && <Typography>Create Swap</Typography>}
            {currentDialog === 2 && <Typography>Initiate Swap</Typography>}
          </DialogTitle>
          <DialogContent>
            {/* conditionally render content */}
            {/*Step 1*/}
            {filteredUserSwaps.length > 0 && currentDialog === 0 && (
              <Container>
                <Grid container spacing={4}>
                  <Grid item>
                    <Card>
                      <ButtonBase
                        onClick={() =>
                          handleInitiatorSwapClick(filteredUserSwaps[0])
                        }
                      >
                        <CardContent>
                          <Typography>
                            {filteredUserSwaps[0].module_code}
                            <br />
                            {filteredUserSwaps[0].slot_type} [
                            {filteredUserSwaps[0].current_slot}]
                            <br />
                            {filteredUserSwaps[0].day}
                            <br />
                            {filteredUserSwaps[0].venue}
                            <br />
                            {`${filteredUserSwaps[0].startTime} - ${filteredUserSwaps[0].endTime}`}
                            <br />
                            {filteredUserSwaps[0].desired_slots}
                          </Typography>
                        </CardContent>
                      </ButtonBase>
                    </Card>
                  </Grid>
                </Grid>
              </Container>
            )}
            {/*Step 2*/}
            {currentDialog === 1 && (
              <Container>
                <TextField
                  className={classes.field}
                  value={props.creatorSwap.module_code}
                  label="Module"
                  variant="outlined"
                  disabled={true}
                ></TextField>
                <br />
                <br />
                <TextField
                  className={classes.field}
                  value={props.creatorSwap.slot_type}
                  label="Slot Type"
                  variant="outlined"
                  disabled={true}
                ></TextField>
                <br />
                <br />
                <TextField
                  className={classes.field}
                  value={props.initiatorSlot}
                  label="Current Slot"
                  variant="outlined"
                  disabled={true}
                ></TextField>
                <br />
                <br />
                <TextField
                  className={classes.field}
                  value={props.creatorSwap.current_slot}
                  label="Desired Slot"
                  variant="outlined"
                  disabled={true}
                ></TextField>
              </Container>
            )}
            {/*Step 3*/}
            {currentDialog === 2 && (
              <Container className={classes.comparison}>
                <Card>
                  <Typography variant="h6" align="center">
                    {initiatorSwap.module_code}
                    <br />
                    {initiatorSwap.slot_type}
                    <br />
                    {initiatorSwap.current_slot}
                    <br />
                    {initiatorSwap.day}
                    <br />
                    {initiatorSwap.venue}
                    <br />
                    {`${initiatorSwap.startTime} - ${initiatorSwap.endTime}`}
                    <br />
                  </Typography>
                </Card>
                <ArrowRightIcon></ArrowRightIcon>
                <ArrowRightIcon></ArrowRightIcon>
                <ArrowRightIcon></ArrowRightIcon>
                <Card>
                  <Typography variant="h6" align="center">
                    {props.creatorSwap.module_code}
                    <br />
                    {props.creatorSwap.slot_type}
                    <br />
                    {props.creatorSwap.current_slot}
                    <br />
                    {props.creatorSwap.day}
                    <br />
                    {props.creatorSwap.venue}
                    <br />
                    {`${props.creatorSwap.startTime} - ${props.creatorSwap.endTime}`}
                  </Typography>
                </Card>
              </Container>
            )}
          </DialogContent>
          <DialogActions>
            {currentDialog === 0 && (
              <Container>
                <Button onClick={handleCreate}>Create Swap</Button>
                <Button disabled={disabled} onClick={handleNext}>
                  Next
                </Button>
              </Container>
            )}
            {currentDialog === 1 && (
              <Container>
                <Button onClick={handleCreateSwap}>Confirm</Button>
                <Button onClick={handleDialogClose}>Cancel</Button>
              </Container>
            )}
            {currentDialog === 2 && (
              <Container>
                <Button>Initiate</Button>
                <Button onClick={handleDialogClose}>Cancel</Button>
              </Container>
            )}
          </DialogActions>
        </Dialog>
      </Card>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    success: state.swap.success,
    loading: state.swap.isLoading,
  };
};

export default connect(mapStateToProps)(PotentialSwap);

/*
//Marketplace get potetialSwaps, userSwapss
  //potentialSwaps, new SwapList(PotentialSwaps), map into new Swap component(<PotentialSwap swap={swap} />)
    //PotentialSwap => ButtonBase, onclick=open dialog, setState for creatorSwap 
      Dialog
        Step 1:
        DialogContent
        userSwaps.map into layout and individual swap (not a separate component)
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
