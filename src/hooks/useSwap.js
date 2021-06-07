import {
  createFail,
  createRequest,
  createSuccess,
  viewFail,
  viewRequest,
  viewSuccess,
  deleteFail,
  deleteRequest,
  deleteSuccess,
  updateFail,
  updateRequest,
  updateSuccess,
  resetSwap,
} from "../redux/actions/swapActions";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useState } from "react";

const useSwap = () => {
  const dispatch = useDispatch();
  const [moduleList, setModuleList] = useState([]);
  const [modDets, setModDets] = useState([]);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const getAllModules = () => {
    if (moduleList.length === 0) {
      axios
        .get("https://api.nusmods.com/v2/2020-2021/moduleList.json")
        .then((response) => response.data)
        .then((mods) => mods.map((mod) => mod.moduleCode))
        .then((result) => setModuleList(result));
    }
  };

  // need to clear module details when module code is empty or changed, can cause weird things to be created
  const getModuleDetails = (moduleCode) => {
    if (moduleCode !== "" && modDets.length === 0) {
      // maybe should have date to automatically change parameters
      axios
        .get(`https://api.nusmods.com/v2/2020-2021/modules/${moduleCode}.json`)
        .then((response) => response.data.semesterData[0].timetable)
        .then((result) => setModDets(result));
    }
  };

  const createSwap = (
    moduleCode,
    slotType,
    currentSlot,
    desiredSlots,
    completed,
    reserved
  ) => {
    dispatch(createRequest());
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
        },
        {
          headers,
        }
      )
      .then((response) => {
        // created alert and create link to go view swap if user want
        dispatch(createSuccess());
        setTimeout(() => {
          dispatch(resetSwap());
        }, 10000);
      })
      .catch((error) => {
        dispatch(createFail(error.response.data));
        setTimeout(() => {
          dispatch(resetSwap());
        }, 10000);
      });
  };

  // your own swaps
  const viewSwap = () => {
    dispatch(viewRequest);
    axios
      .get("http://localhost:3001/api/v1/swaps", {
        headers,
      })
      .then((response) => {
        console.log(response.data);
        dispatch(viewSuccess());
        setTimeout(() => {
          dispatch(resetSwap());
        }, 2000);
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(viewFail(error.response.data));
        setTimeout(() => {
          dispatch(resetSwap());
        }, 2000);
      });
  };

  // tested all other functions except for this
  const updateSwap = (
    swapId,
    moduleCode,
    slotType,
    currentSlot,
    desiredSlots,
    completed,
    reserved
  ) => {
    dispatch(updateRequest());
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
        },
        {
          headers,
        }
      )
      .then((response) => {
        dispatch(updateSuccess());
        console.log(response.data);
        setTimeout(() => {
          dispatch(resetSwap());
        }, 2000);
      })
      .catch((error) => {
        dispatch(updateFail(error.response.data));
        setTimeout(() => {
          dispatch(resetSwap());
        }, 2000);
      });
  };

  const deleteSwap = (swapId) => {
    dispatch(deleteRequest());
    axios
      .delete(`http://localhost:3001/api/v1/swaps/${swapId}`, {
        headers,
      })
      .then((response) => {
        dispatch(deleteSuccess());
        console.log(response.data);
        setTimeout(() => {
          dispatch(resetSwap());
        }, 2000);
      })
      .catch((error) => {
        dispatch(deleteFail(error.response.data));
        console.log(error.response.data);
        setTimeout(() => {
          dispatch(resetSwap());
        }, 2000);
      });
  };

  // finding a potential swap
  const searchSwap = (moduleCode, slotType, currentSlot) => {
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
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return {
    moduleList,
    setModuleList,
    modDets,
    setModDets,
    getAllModules,
    getModuleDetails,
    createSwap,
    viewSwap,
    deleteSwap,
    searchSwap,
  };
};

export default useSwap;
