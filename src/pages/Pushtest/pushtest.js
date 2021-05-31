// import Logo from "../../components/Logo";
import {
  Button,
  // responsiveFontSizes
} from "@material-ui/core";
import axios from "axios";

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

function PushTest() {
  return <Button onClick={handleClick}>Hello</Button>;
}

export default PushTest;
