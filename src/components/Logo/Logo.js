import NUSPMLogo from "../../assets/nuspmlogo.svg";
import { useMediaQuery } from "react-responsive";

function Logo(props) {
  const isSmallScreen = useMediaQuery({ query: "(max-width:701px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 700px)",
  });

  return <img src={NUSPMLogo} alt="NUSPM" width={props.width}></img>;
}

export default Logo;
