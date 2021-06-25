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

  const [initiatorSwap, setInitiatorSwap] = useState({});
  const [creatorSwap, setCreatorSwap] = useState("");

  const getAllModules = () => {
    axios
      .get("https://api.nusmods.com/v2/2020-2021/moduleList.json")
      .then((response) => {
        return response.data;
      })
      .then((mods) => mods.map((mod) => mod.moduleCode))
      .then((result) => setModuleList(result));
  };

  const getModuleDetails = (moduleCode) => {
    // maybe should have date to automatically change parameters
    axios
      .get(`https://api.nusmods.com/v2/2020-2021/modules/${moduleCode}.json`)
      .then((response) => response.data.semesterData[0].timetable)
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
    completed
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
        dispatch(createSwapSuccess());
        setInitiatorSwap(response.data);
        setTimeout(() => {
          dispatch(resetSwap());
        }, 3000);
      })
      .catch((error) => {
        console.log(error.response);
        console.log(error.response.data);
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
        setTimeout(() => {
          dispatch(resetSwap());
        }, 2000);
      })
      .catch((error) => {
        dispatch(viewSwapFail(error.response.data));
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
        dispatch(updateSwapFail(error.response.data));
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
        dispatch(deleteSwapFail(error.response.data));
        setTimeout(() => {
          dispatch(resetSwap());
        }, 2000);
      });
  };

  // finding a potential swap
  const searchSwap = (moduleCode, slotType, currentSlot) => {
    dispatch(searchSwapRequest());
    authAxios
      .post(`/api/v1/searchSwap`, {
        module_code: moduleCode,
        slot_type: slotType,
        desired_slots: currentSlot,
      })
      .then((response) => {
        dispatch(searchSwapSuccess());
        console.log(response.data);
        setPotentialSwaps(response.data.filter((swap) => !swap.isCompleted));
        console.log(potentialSwaps);
        setTimeout(() => {
          dispatch(resetSwap());
        }, 5000);
      })
      .catch((error) => {
        dispatch(searchSwapFail(error.response.data));
        console.log(error.response);
        setTimeout(() => {
          dispatch(resetSwap());
        }, 2000);
      });
  };

  // NEW METHOD FOR OFFER
  const showSwap = (swapId) => {
    dispatch(viewSwapRequest());
    authAxios
      .get(`/api/v1/swaps/${swapId}`)
      .then((response) => {
        dispatch(viewSwapSuccess());
        setTimeout(() => {
          dispatch(resetSwap());
        }, 3000);
      })
      .catch((error) => {
        dispatch(viewSwapFail());
        setTimeout(() => {
          dispatch(resetSwap());
        }, 3000);
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
    getAllModules,
    getModuleDetails,
    getSlotDetails,
    createSwap,
    viewSwaps,
    deleteSwap,
    updateSwap,
    searchSwap,
  };
};

export default useSwap;
