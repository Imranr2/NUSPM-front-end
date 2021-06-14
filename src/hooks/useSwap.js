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

const useSwap = () => {
  const dispatch = useDispatch();
  const [moduleList, setModuleList] = useState([]);
  const [modDets, setModDets] = useState([]);
  const [userSwap, setUserSwaps] = useState([]);
  const [potentialSwaps, setPotentialSwaps] = useState([]);
  const [slotDets, setSlotDets] = useState([]);

  // for showSwap at the bottom, rename if u need or delete if u dont need
  const [initiatorSwap, setInitiatorSwap] = useState("");
  const [creatorSwap, setCreatorSwap] = useState("");

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const getAllModules = () => {
    axios
      .get("https://api.nusmods.com/v2/2020-2021/moduleList.json")
      .then((response) => {
        console.log(moduleList);
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
    completed,
    reserved
  ) => {
    dispatch(createSwapRequest());
    axios
      .post(
        "http://localhost:3001/api/v1/swaps",
        {
          module_code: moduleCode,
          slot_type: slotType,
          current_slot: currentSlot,
          desired_slots: desiredSlots,
          completed: completed,
          reserved: reserved,
          venue: slotDets.venue,
          startTime: slotDets.startTime,
          endTime: slotDets.endTime,
          day: slotDets.day,
        },
        {
          headers,
        }
      )
      .then((response) => {
        dispatch(createSwapSuccess());
        setTimeout(() => {
          dispatch(resetSwap());
        }, 3000);
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
    axios
      .get("http://localhost:3001/api/v1/swaps", {
        headers,
      })
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
    completed,
    reserved
  ) => {
    dispatch(updateSwapRequest());
    axios
      .put(
        `http://localhost:3001/api/v1/swaps/${swapId}`,
        {
          module_code: moduleCode,
          slot_type: slotType,
          current_slot: currentSlot,
          desired_slots: desiredSlots,
          completed: completed,
          reserved: reserved,
          venue: slotDets.venue,
          startTime: slotDets.startTime,
          endTime: slotDets.endTime,
          day: slotDets.day,
        },
        {
          headers,
        }
      )
      .then((response) => {
        dispatch(updateSwapSuccess());
        console.log(response.data);
        console.log("updated");
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
    axios
      .delete(`http://localhost:3001/api/v1/swaps/${swapId}`, {
        headers,
      })
      .then((response) => {
        dispatch(deleteSwapSuccess());
        console.log(response.data);
        setTimeout(() => {
          dispatch(resetSwap());
        }, 2000);
      })
      .catch((error) => {
        dispatch(deleteSwapFail(error.response.data));
        console.log(error.response.data);
        setTimeout(() => {
          dispatch(resetSwap());
        }, 2000);
      });
  };

  // finding a potential swap
  const searchSwap = (moduleCode, slotType, currentSlot) => {
    dispatch(searchSwapRequest());
    axios
      .post(
        "http://localhost:3001/api/v1/searchSwap",
        {
          module_code: moduleCode,
          slot_type: slotType,
          desired_slots: currentSlot,
        },
        {
          headers,
        }
      )
      .then((response) => {
        dispatch(searchSwapSuccess());
        console.log(response.data);
        setPotentialSwaps(
          response.data.filter((swap) => !swap.isReserved && !swap.isCompleted)
        );
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
  const showSwap = (swapId, initiator) => {
    dispatch(viewSwapRequest());
    axios
      .get(`http://localhost:3001/api/v1/swaps/${swapId}`, {
        headers,
      })
      .then((response) => {
        dispatch(viewSwapSuccess());
        //change to whatever u think is better
        if (initiator) {
          setInitiatorSwap(response.data);
        } else {
          setCreatorSwap(response.data);
        }
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
    userSwap,
    potentialSwaps,
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
