import {
  createSwapFail,
  createSwapRequest,
  createSwapSuccess,
  viewSwapFail,
  viewSwapRequest,
  viewSwapSuccess,
  deleteSwapFail,
  deleteSwapRequest,
  deleteSwapSuccess,
  updateSwapFail,
  updateSwapRequest,
  updateSwapSuccess,
  searchSwapFail,
  searchSwapRequest,
  searchSwapSuccess,
  showSwapFail,
  showSwapRequest,
  showSwapSuccess,
  resetSwap,
} from "../redux/actions/swapActions";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useState } from "react";
import authAxios from "../helpers/authAxios";

const useSwap = () => {
  const dispatch = useDispatch();
  const [moduleList, setModuleList] = useState([]);
  const [modDets, setModDets] = useState([]);
  const [userSwaps, setUserSwaps] = useState([]);
  const [potentialSwaps, setPotentialSwaps] = useState([]);
  const [slotDets, setSlotDets] = useState([]);
  const [completedSwap, setCompletedSwap] = useState({});

  const [initiatorSwap, setInitiatorSwap] = useState({});

  let date = new Date();
  let currentYear = date.getFullYear();
  let nextYear = currentYear + 1;
  let month = date.getMonth();
  const sem1 = [5, 6, 7, 8, 9, 10];
  const semester = sem1.includes(month) ? 0 : 1;

  const getAllModules = () => {
    axios
      .get(
        `https://api.nusmods.com/v2/${currentYear}-${nextYear}/moduleList.json`
      )
      .then((response) => {
        return response.data;
      })
      .then((mods) => mods.map((mod) => mod.moduleCode))
      .then((result) => setModuleList(result));
  };

  const getModuleDetails = (moduleCode) => {
    axios
      .get(
        `https://api.nusmods.com/v2/${currentYear}-${nextYear}/modules/${moduleCode}.json`
      )
      .then((response) => response.data.semesterData[semester].timetable)
      .then((result) => setModDets(result));
  };

  const getSlotDetails = (slotId, slotType) => {
    setSlotDets(
      modDets.filter(
        (timetable) =>
          timetable.classNo === slotId && timetable.lessonType === slotType
      )[0]
    );
  };

  const createSwap = (
    moduleCode,
    slotType,
    currentSlot,
    desiredSlots,
    completed,
    reset = true
  ) => {
    dispatch(createSwapRequest());
    authAxios
      .post(`/api/v1/swaps`, {
        module_code: moduleCode,
        slot_type: slotType,
        current_slot: currentSlot,
        desired_slots: desiredSlots,
        completed: completed,
        venue: slotDets.venue,
        startTime: slotDets.startTime,
        endTime: slotDets.endTime,
        day: slotDets.day,
      })
      .then((response) => {
        setInitiatorSwap(response.data);
      })
      .then((data) => {
        dispatch(createSwapSuccess());
        if (reset) {
          setTimeout(() => {
            dispatch(resetSwap());
          }, 3000);
        }
      })
      .catch((error) => {
        dispatch(createSwapFail(error.response.data));
        setTimeout(() => {
          dispatch(resetSwap());
        }, 3000);
      });
  };

  const viewSwaps = () => {
    dispatch(viewSwapRequest());
    authAxios
      .get(`/api/v1/swaps`)
      .then((response) => {
        setUserSwaps(response.data);
        dispatch(viewSwapSuccess());
      })
      .catch((error) => {
        dispatch(viewSwapFail(error.response));
        setTimeout(() => {
          dispatch(resetSwap());
        }, 2000);
      });
  };

  const updateSwap = (
    swapId,
    moduleCode,
    slotType,
    currentSlot,
    desiredSlots,
    completed
  ) => {
    dispatch(updateSwapRequest());
    authAxios
      .put(`/api/v1/swaps/${swapId}`, {
        module_code: moduleCode,
        slot_type: slotType,
        current_slot: currentSlot,
        desired_slots: desiredSlots,
        completed: completed,
        venue: slotDets.venue,
        startTime: slotDets.startTime,
        endTime: slotDets.endTime,
        day: slotDets.day,
      })
      .then((response) => {
        dispatch(updateSwapSuccess());
        setTimeout(() => {
          dispatch(resetSwap());
        }, 2000);
      })
      .catch((error) => {
        dispatch(updateSwapFail(error.response));
        setTimeout(() => {
          dispatch(resetSwap());
        }, 2000);
      });
  };

  const deleteSwap = (swapId) => {
    dispatch(deleteSwapRequest());
    authAxios
      .delete(`/api/v1/swaps/${swapId}`)
      .then((response) => {
        dispatch(deleteSwapSuccess());
        setTimeout(() => {
          dispatch(resetSwap());
        }, 2000);
      })
      .catch((error) => {
        dispatch(deleteSwapFail(error.response));
        setTimeout(() => {
          dispatch(resetSwap());
        }, 2000);
      });
  };

  const searchSwap = (moduleCode, slotType, currentSlot) => {
    dispatch(searchSwapRequest());
    authAxios
      .post(`/api/v1/swaps/searchSwap`, {
        module_code: moduleCode,
        slot_type: slotType,
        desired_slots: currentSlot,
      })
      .then((swapResponse) => swapResponse.data)
      .then((swapData) => {
        authAxios
          .get("api/v1/offers")
          .then((offerResponse) => offerResponse.data)
          .then((offerData) => {
            setPotentialSwaps(
              swapData.filter(
                (swap) =>
                  !swap.isCompleted &&
                  !offerData
                    .map((offer) => offer.initiatorSwapId)
                    .includes(swap.id) &&
                  !offerData
                    .map((offer) => offer.creatorSwapId)
                    .includes(swap.id)
              )
            );
            dispatch(searchSwapSuccess());
          })
          .catch((error) => {
            dispatch(searchSwapFail(error.response));
          });
      })
      .catch((error) => {
        dispatch(searchSwapFail(error.response));
      });
  };

  const showSwap = (swapId) => {
    dispatch(showSwapRequest());
    authAxios
      .get(`/api/v1/swaps/${swapId}`)
      .then((response) => {
        setCompletedSwap(response.data);
        dispatch(showSwapSuccess());
      })
      .catch((error) => {
        dispatch(showSwapFail(error));
      });
  };

  return {
    moduleList,
    setModuleList,
    modDets,
    setModDets,
    userSwaps,
    potentialSwaps,
    initiatorSwap,
    setInitiatorSwap,
    slotDets,
    setSlotDets,
    completedSwap,
    setCompletedSwap,
    getAllModules,
    getModuleDetails,
    getSlotDetails,
    createSwap,
    viewSwaps,
    deleteSwap,
    updateSwap,
    searchSwap,
    showSwap,
  };
};

export default useSwap;
