import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ButtonComponent from "../ButtonComponent";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

const GobackButton = ({ className }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <ButtonComponent
      className={className}
      text={t("Back")}
      startIcon={<ArrowBackOutlinedIcon />}
      variant="outlined"
      onClick={() => navigate(-1)}
    />
  );
};

export default GobackButton;
