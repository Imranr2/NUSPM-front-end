import { PacmanLoader } from "react-spinners";
import { Container } from "@material-ui/core";

function LoadingSpinner() {
  return (
    <Container maxWidth="false" disableGutters>
      <PacmanLoader />
    </Container>
  );
}

export default LoadingSpinner;
