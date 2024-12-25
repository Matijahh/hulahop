import { useTranslation } from "react-i18next";

import { Button } from "@mui/material";

const ButtonComponent = ({ variant, startIcon, text, onClick }) => {
  const { t } = useTranslation();

  return (
    <Button variant={variant} startIcon={startIcon} onClick={onClick}>
      {t(text)}
    </Button>
  );
};

export default ButtonComponent;
