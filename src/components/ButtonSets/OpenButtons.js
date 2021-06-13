import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
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
import { DeleteButton } from "./theme";
import useSwap from "../../hooks/useSwap";

export default function OpenButtons({ swapDetails }) {
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

  const handleEditClickOpen = () => {
    console.log(swapDetails);
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
    updateSwap(
      swapDetails.id,
      moduleCode,
      slotType,
      currentSlot,
      desiredSlots,
      swapDetails.isCompleted,
      swapDetails.isReserved
    );
    setEditOpen(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteSwap(swapDetails.id);
    setDeleteOpen(false);
  };

  useEffect(() => getAllModules());
  useEffect(() => getModuleDetails(moduleCode), [moduleCode]);
  useEffect(() => getSlotDetails(currentSlot, slotType), [moduleCode]);

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
              console.log(modDets);
              console.log(slotDets);
              setSlotType(value);
            }}
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
            value={desiredSlots}
            options={desiredSlotOptions}
            onChange={(event, value) => {
              setDesiredSlots(value);
            }}
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
      <DeleteButton variant="contained" onClick={handleDelete}>
        DELETE
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
