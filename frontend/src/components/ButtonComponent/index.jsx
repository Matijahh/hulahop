import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import cx from "classnames";

import { Button } from "@mui/material";
import { Spinner } from "react-bootstrap";

const VisuallyHiddenInput = styled("input")({
  opacity: 0,
  height: "100%",
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: "100%",
  zIndex: 1,
});

const ButtonComponent = ({
  variant,
  startIcon,
  text,
  onClick,
  className,
  width,
  endIcon,
  maxHeight,
  styled,
  type,
  fontSize,
  disabled,
  fullWidth,
  loading,
  handleFileChange,
}) => {
  const { t } = useTranslation();

  return (
    <Button
      variant={variant}
      startIcon={startIcon}
      size="large"
      disabled={disabled}
      style={{
        maxHeight: maxHeight ? maxHeight : "40px",
        width: width || (fullWidth ? "100%" : ""),
        ...styled,
        fontSize: `${fontSize || "14px"} `,
        cursor: "pointer",
      }}
      className={cx(className, "brand-btn")}
      onClick={onClick}
      endIcon={endIcon}
      type={type}
    >
      {type === "file" ? (
        <>
          {loading ? <Spinner color="light" /> : text}

          <VisuallyHiddenInput
            onChange={handleFileChange}
            accept="image/*"
            type="file"
          />
        </>
      ) : (
        <>{loading ? <Spinner color="light" /> : t(text)}</>
      )}
    </Button>
  );
};

export default ButtonComponent;
