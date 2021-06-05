// import Logo from "../../components/Logo";
import {
  Button,
  // responsiveFontSizes
} from "@material-ui/core";
import axios from "axios";
import useSwap from "../../hooks/useSwap";

const handleClick = () => {
  const temp = [];
  axios
    .get("https://api.nusmods.com/v2/2018-2019/modules/CS1101S.json")
    .then((response) => response.data.semesterData[1].timetable)
    .then((timetable) => timetable.map((e) => e.lessonType))
    .then((slot) => {
      slot.array.forEach((element) => {
        if (temp.indexOf(element) === -1) {
          temp.push(element);
        }
      });
      console.log(temp);
    });
};

const handleClick2 = () => {
  axios
    .post(
      "http://localhost:3001/api/v1/swaps",
      {
        module_code: "CS2030S",
        slot_type: "LEC",
        current_slot: "08e",
        completed: false,
        reserved: false,
        desired_slots: ["08g", "08f"],
      },
      {
        headers: {
          "Content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxOSwiZXhwIjoxNjIyODE0NDAyfQ.lNj8pc6dxlVpZv7KJfVsFz1iROCd5lgOkKpvu23D3lc",
        },
      }
    )
    .then((response) => console.log(response.data))
    .catch((error) => {
      console.log(error);
      console.log(error.response.config.data);
    });
};

function PushTest() {
  const { viewSwap, deleteSwap, searchSwap } = useSwap();

  const view = (e) => {
    e.preventDefault();
    viewSwap();
  };

  const del = (e) => {
    deleteSwap(33);
  };

  const search = (e) => {
    searchSwap("CS2030S", "TUT", "1");
  };

  return <Button onClick={search}>Hello</Button>;
}

export default PushTest;
