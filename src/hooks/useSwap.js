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
} from "../redux/actions/swapActions";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const useSwap = () => {
  const [moduleCode, setModuleCode] = useState("");
  const [slotType, setSlotType] = useState("");
  const [desiredSlots, setDesiredSlots] = useState([]);
};

export default useSwap;
