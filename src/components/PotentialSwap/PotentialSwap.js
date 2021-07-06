import {
  Button,
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
import { resetSwap, resetCreate } from "../../redux/actions/swapActions";
import { useDispatch } from "react-redux";
import { Alert } from "@material-ui/lab";
import { useState, useEffect } from "react";
import useSwap from "../../hooks/useSwap";
import useOffer from "../../hooks/useOffer";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { connect } from "react-redux";
import { useStyles } from "./theme";

function PotentialSwap(props) {
  const classes = useStyles();
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
    deleteSwap,
    initiatorSwap,
    slotDets,
    setInitiatorSwap,
    setSlotDets,
  } = useSwap();
  const dispatch = useDispatch();

  const { createOffer } = useOffer();

  const handleDialogClickOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    resetCreateRedux();
    setDialogOpen(false);
    setCurrentDialog(0);
    setDisabled(true);
  };

  const handleInitiatorSwapClick = (params) => {
    setInitiatorSwap(params);
    console.log(initiatorSwap);
    setDisabled(!disabled);
  };

  const handleNext = () => {
    console.log(initiatorSwap);
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
      false
    );
    setCurrentDialog(2);
    console.log(initiatorSwap);
  };

  const resetCreateRedux = () => {
    dispatch(resetCreate());
  };

  const handleInitiateSwap = () => {
    //create offer
    createOffer(
      initiatorSwap.user_id,
      props.creatorSwap.user_id,
      initiatorSwap.id,
      props.creatorSwap.id,
      false,
      true
    );
    handleDialogClose();
    console.log(initiatorSwap);
    //update swaps
  };

  useEffect(() => setSlotDets(props.slotDets));
  return (
    <Grid key={props} item xs={12} sm={6} md={4}>
      <Card>
        <CardActionArea onClick={handleDialogClickOpen}>
          <CardContent>
            <Typography variant="h6">
              {props.creatorSwap.module_code}
              <br />
              {props.creatorSwap.slot_type}
              <br />
              {props.creatorSwap.day}
              <br />
              {props.creatorSwap.venue}
              <br />
              {`${props.creatorSwap.startTime} - ${props.creatorSwap.endTime}`}
              <br />
              Have: [{props.creatorSwap.current_slot}]
              <br />
              Want: [{props.creatorSwap.desired_slots.toString()}]
            </Typography>
          </CardContent>
        </CardActionArea>

        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          onBackdropClick={resetCreateRedux}
        >
          <DialogTitle>
            {currentDialog === 0 && (
              <Typography variant="h5" align="center">
                Choose Your Swap
              </Typography>
            )}
            {currentDialog === 1 && (
              <Typography variant="h5" align="center">
                Create Swap
              </Typography>
            )}
            {currentDialog === 2 && (
              <Typography variant="h5" align="center">
                Initiate Swap
              </Typography>
            )}
          </DialogTitle>
          <DialogContent>
            {filteredUserSwaps.length > 0 && currentDialog === 0 && (
              <Container>
                <Grid container spacing={4}>
                  <Grid item>
                    <Card>
                      <CardActionArea
                        className={classes.actionArea}
                        onClick={() =>
                          handleInitiatorSwapClick(filteredUserSwaps[0])
                        }
                      >
                        <CardContent>
                          <Typography align="center">
                            {filteredUserSwaps[0].module_code}
                            <br />
                            {filteredUserSwaps[0].slot_type}
                            <br />
                            {filteredUserSwaps[0].day}
                            <br />
                            {filteredUserSwaps[0].venue}
                            <br />
                            {`${filteredUserSwaps[0].startTime} - ${filteredUserSwaps[0].endTime}`}
                            <br />
                            Have: [{filteredUserSwaps[0].current_slot}]
                            <br />
                            Want: [
                            {filteredUserSwaps[0].desired_slots
                              .sort()
                              .toString()}
                            ]
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                </Grid>
              </Container>
            )}
            {filteredUserSwaps.length === 0 && currentDialog === 0 && (
              <Alert severity="info">
                No available swap present.
                <br />
                Select the 'Create Swap' option below
              </Alert>
            )}
            {currentDialog === 1 && (
              <>
                <Container className={classes.container}>
                  <TextField
                    className={classes.field}
                    value={props.creatorSwap.module_code}
                    label="Module"
                    variant="outlined"
                    disabled={true}
                  ></TextField>
                  <br />
                  <TextField
                    className={classes.field}
                    value={props.creatorSwap.slot_type}
                    label="Slot Type"
                    variant="outlined"
                    disabled={true}
                  ></TextField>
                  <br />
                  <TextField
                    className={classes.field}
                    value={props.initiatorSlot}
                    label="Current Slot"
                    variant="outlined"
                    disabled={true}
                  ></TextField>
                  <br />
                  <TextField
                    className={classes.field}
                    value={props.creatorSwap.current_slot}
                    label="Desired Slot"
                    variant="outlined"
                    disabled={true}
                  ></TextField>
                </Container>
                <br />
                <Alert severity="info">
                  Clicking confirm will create a swap for
                  <br />
                  you even if you do not initiate the swap!
                </Alert>
              </>
            )}
            {currentDialog === 2 && (
              <>
                <Container className={classes.comparison}>
                  <Container
                    className={classes.cardLabel}
                    disableGutters="true"
                  >
                    <Card className={classes.card}>
                      <Typography variant="h6" align="center">
                        {initiatorSwap.module_code}
                        <br />
                        {initiatorSwap.slot_type}
                        <br />
                        {initiatorSwap.day}
                        <br />
                        {initiatorSwap.venue}
                        <br />
                        {`${initiatorSwap.startTime} - ${initiatorSwap.endTime}`}
                        <br />
                        Have: [{initiatorSwap.current_slot}]
                      </Typography>
                    </Card>
                    <Typography
                      className={classes.typography}
                      color="primary"
                      variant="h6"
                      align="center"
                    >
                      Current Slot
                    </Typography>
                  </Container>
                  <ArrowRightIcon></ArrowRightIcon>
                  <ArrowRightIcon></ArrowRightIcon>
                  <ArrowRightIcon></ArrowRightIcon>
                  <Container disableGutters="true">
                    <Card className={classes.card}>
                      <Typography variant="h6" align="center">
                        {props.creatorSwap.module_code}
                        <br />
                        {props.creatorSwap.slot_type}
                        <br />
                        {props.creatorSwap.day}
                        <br />
                        {props.creatorSwap.venue}
                        <br />
                        {`${props.creatorSwap.startTime} - ${props.creatorSwap.endTime}`}
                        <br />
                        Have: [{props.creatorSwap.current_slot}]
                      </Typography>
                    </Card>
                    <Typography
                      className={classes.typography}
                      color="primary"
                      variant="h6"
                      align="center"
                    >
                      Desired Slot
                    </Typography>
                  </Container>
                </Container>
              </>
            )}
          </DialogContent>
          <DialogActions>
            {currentDialog === 0 && (
              <>
                <Button
                  className={classes.standardButton}
                  disabled={filteredUserSwaps.length > 0}
                  onClick={handleCreate}
                >
                  Create Swap
                </Button>
                <Button
                  className={classes.standardButton}
                  disabled={disabled}
                  onClick={handleNext}
                >
                  Next
                </Button>
              </>
            )}
            {currentDialog === 1 && (
              <>
                <Button
                  className={classes.standardButton}
                  onClick={handleCreateSwap}
                >
                  Confirm
                </Button>
                <Button
                  className={classes.cancelButton}
                  onClick={handleDialogClose}
                >
                  Cancel
                </Button>
              </>
            )}
            {currentDialog === 2 && (
              <>
                <Button
                  className={classes.standardButton}
                  onClick={handleInitiateSwap}
                >
                  Initiate
                </Button>
                <Button
                  className={classes.cancelButton}
                  onClick={handleDialogClose}
                >
                  Cancel
                </Button>
              </>
            )}
          </DialogActions>
        </Dialog>
      </Card>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.swap.viewLoading,
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
