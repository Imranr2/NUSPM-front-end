import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  Container,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ThemeProvider,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { theme } from "../../Theme";
import { useStyles, DeleteButton } from "./theme";
import useSwap from "../../hooks/useSwap";
import useOffer from "../../hooks/useOffer";
import { withdrawOfferFail } from "../../redux/actions/offerActions";
import useNotification from "../../hooks/useNotification";
import { connect } from "react-redux";
import { PulseLoader } from "react-spinners";
import Alert from "@material-ui/lab/Alert";

function CurrentSwapButtons({
  swapDetails,
  editLoading,
  editSuccess,
  editFail,
}) {
  const classes = useStyles();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [moduleCode, setModuleCode] = useState(swapDetails.module_code);
  const [slotType, setSlotType] = useState(swapDetails.slot_type);
  const [currentSlot, setCurrentSlot] = useState(swapDetails.current_slot);
  const [desiredSlots, setDesiredSlots] = useState(swapDetails.desired_slots);

  const {
    updateSwap,
    deleteSwap,
    getSlotDetails,
    moduleList,
    modDets,
    getAllModules,
    getModuleDetails,
    slotDets,
  } = useSwap();

  const { rejectOffers, withdrawOffers } = useOffer();

  const { createNotification } = useNotification();

  const handleEditClickOpen = () => {
    setModuleCode(swapDetails.module_code);
    setSlotType(swapDetails.slot_type);
    setCurrentSlot(swapDetails.current_slot);
    setDesiredSlots(swapDetails.desired_slots);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setModuleCode(swapDetails.module_code);
    setSlotType(swapDetails.slot_type);
    setCurrentSlot(swapDetails.current_slot);
    setDesiredSlots(swapDetails.desired_slots);
  };

  const handleDeleteClickOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  // Edit dialog needs a useeffect to fetch venue starttime endtime and day just like createswap
  const handleEdit = (e) => {
    e.preventDefault();
    rejectOffers(swapDetails.id);
    withdrawOffers(swapDetails.id);
    updateSwap(
      swapDetails.id,
      moduleCode,
      slotType,
      currentSlot,
      desiredSlots,
      swapDetails.isCompleted,
      swapDetails.isReserved
    );
    // setEditOpen(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteSwap(swapDetails.id);
    setDeleteOpen(false);
  };

  const closeDialog = () => setEditOpen(false);

  useEffect(() => getAllModules(), []);
  useEffect(() => getModuleDetails(moduleCode), [moduleCode]);
  useEffect(
    () => getSlotDetails(currentSlot, slotType),
    [currentSlot, desiredSlots, slotType]
  );
  useEffect(() => {
    if (editSuccess) {
      setEditOpen(false);
    }
  }, [editSuccess]);

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
      <Button variant="outlined" color="primary" onClick={handleEditClickOpen}>
        Edit
      </Button>
      <Dialog
        open={editOpen}
        onClose={handleEditClose}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Edit Swap Details</DialogTitle>
        <DialogContent>
          <Autocomplete
            value={moduleCode}
            options={moduleList}
            onChange={(event, value) => {
              setModuleCode(value);
              setSlotType([]);
              setCurrentSlot([]);
              setDesiredSlots([]);
            }}
            disabled={editLoading}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="dense"
                id="moduleCode"
                label="Module Code"
                type="text"
                fullWidth
              />
            )}
          />
          <Autocomplete
            value={slotType}
            options={slotTypeOptions}
            onChange={(event, value) => {
              setSlotType(value);
              setCurrentSlot([]);
              setDesiredSlots([]);
            }}
            disabled={editLoading}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="dense"
                id="slotType"
                label="Slot Type"
                type="text"
                fullWidth
              />
            )}
          />
          <Autocomplete
            value={currentSlot}
            options={slotOptions}
            onChange={(event, value) => {
              setCurrentSlot(value);
            }}
            disabled={editLoading}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="dense"
                id="currentSlot"
                label="Current Slot"
                type="text"
                fullWidth
              />
            )}
          />
          <Autocomplete
            value={
              desiredSlots.removeIf((slot) => slot === currentSlot) ||
              desiredSlots
            }
            options={desiredSlotOptions}
            onChange={(event, value) => {
              setDesiredSlots(value);
            }}
            disabled={editLoading}
            renderInput={(params) => (
              <TextField
                {...params}
                inputProps={{
                  ...params.inputProps,
                  required: desiredSlots.length === 0,
                }}
                margin="dense"
                id="desiredSlots"
                label="Desired Slots"
                type="text"
                fullWidth
              />
            )}
            multiple
          />
          {editLoading && (
            <Container className={classes.loader}>
              <PulseLoader color="#0D169F" />
            </Container>
          )}
          {editFail && (
            <Alert severity="error">
              Check if you already have a swap with the same module code and
              type
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEdit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <DeleteButton variant="outlined" onClick={handleDeleteClickOpen}>
        Delete
      </DeleteButton>
      <Dialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Delete Swap</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    editLoading: state.swap.updateLoading,
    editSuccess: state.swap.updateSuccess,
    editFail: state.swap.updateError,
  };
};

export default connect(mapStateToProps)(CurrentSwapButtons);
