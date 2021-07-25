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
import { resetCreate } from "../../redux/actions/swapActions";
import { useDispatch } from "react-redux";
import { Alert } from "@material-ui/lab";
import { useState, useEffect } from "react";
import useSwap from "../../hooks/useSwap";
import useOffer from "../../hooks/useOffer";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { connect } from "react-redux";
import { useStyles } from "./theme";
import { PulseLoader } from "react-spinners";
import { Autocomplete } from "@material-ui/lab";

function PotentialSwap(props) {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentDialog, setCurrentDialog] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [desiredSlots, setDesiredSlots] = useState([
    props.creatorSwap.current_slot,
  ]);

  const filteredUserSwaps = props.initiatorSwaps.filter(
    (userSwap) =>
      userSwap.module_code === props.creatorSwap.module_code &&
      userSwap.slot_type === props.creatorSwap.slot_type
  );

  const { createSwap, initiatorSwap, setInitiatorSwap, setSlotDets } =
    useSwap();

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
    setDesiredSlots([props.creatorSwap.current_slot]);
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
    createSwap(
      props.creatorSwap.module_code,
      props.creatorSwap.slot_type,
      props.initiatorSlot,
      desiredSlots.sort(),
      false,
      false
    );
  };

  const resetCreateRedux = () => {
    dispatch(resetCreate());
  };

  const handleInitiateSwap = () => {
    createOffer(
      initiatorSwap.user_id,
      props.creatorSwap.user_id,
      initiatorSwap.id,
      props.creatorSwap.id,
      false,
      true
    );
    handleDialogClose();
  };

  useEffect(() => setSlotDets(props.slotDets));
  useEffect(() => {
    if (props.createSuccess) {
      setCurrentDialog(2);
    }
  }, [props.createSuccess]);
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
              {`${props.creatorSwap.startTime} - ${props.creatorSwap.endTime}`}
              <br />
              {props.creatorSwap.venue}
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
              <Typography component="div" variant="h5" align="center">
                Choose Your Swap
              </Typography>
            )}
            {currentDialog === 1 && (
              <Typography component="div" variant="h5" align="center">
                Create Swap
              </Typography>
            )}
            {currentDialog === 2 && (
              <Typography component="div" variant="h5" align="center">
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
                            {`${filteredUserSwaps[0].startTime} - ${filteredUserSwaps[0].endTime}`}
                            <br />
                            {filteredUserSwaps[0].venue}
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
                  <Autocomplete
                    classes={{ paper: classes.paper }}
                    value={desiredSlots}
                    options={props.slotOptions.filter(
                      (slot) => slot !== props.initiatorSlot
                    )}
                    onChange={(event, value) => {
                      if (!value.includes(props.creatorSwap.current_slot)) {
                        value.unshift(props.creatorSwap.current_slot);
                      }
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
                </Container>
                {props.createLoading && (
                  <Container className={classes.loader}>
                    <PulseLoader color="#0D169F" />
                  </Container>
                )}
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
                    disableGutters={true}
                  >
                    <Card className={classes.card}>
                      <Typography variant="h6" align="center">
                        {initiatorSwap.module_code}
                        <br />
                        {initiatorSwap.slot_type}
                        <br />
                        {initiatorSwap.day}
                        <br />
                        {`${initiatorSwap.startTime} - ${initiatorSwap.endTime}`}
                        <br />
                        {initiatorSwap.venue}
                        <br />
                        Have: [{initiatorSwap.current_slot}]
                        <br />
                        Want: [
                        {initiatorSwap.desired_slots !== undefined
                          ? initiatorSwap.desired_slots.toString()
                          : props.creatorSwap.current_slot}
                        ]
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
                  <Container disableGutters={true}>
                    <Card className={classes.card}>
                      <Typography variant="h6" align="center">
                        {props.creatorSwap.module_code}
                        <br />
                        {props.creatorSwap.slot_type}
                        <br />
                        {props.creatorSwap.day}
                        <br />
                        {`${props.creatorSwap.startTime} - ${props.creatorSwap.endTime}`}
                        <br />
                        {props.creatorSwap.venue}
                        <br />
                        Have: [{props.creatorSwap.current_slot}]
                        <br />
                        Want: [{props.creatorSwap.desired_slots.toString()}]
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
    createSuccess: state.swap.createSuccess,
    createLoading: state.swap.createLoading,
  };
};

export default connect(mapStateToProps)(PotentialSwap);
