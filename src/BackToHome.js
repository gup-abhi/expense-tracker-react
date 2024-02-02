import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BackToHome = () => {
  const navigate = useNavigate();
  const backToHome = () => {
    navigate("/");
  };
  return (
    <Button className="m-2" variant="contained" onClick={backToHome}>
      <ArrowBackIcon />
    </Button>
  );
};

export default BackToHome;
