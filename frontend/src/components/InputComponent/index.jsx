import { useTranslation } from "react-i18next";
import styled from "styled-components";
import cx from "classnames";

import { TextField, InputAdornment } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const InputComponentContainer = styled.div`
  label {
    margin-bottom: 9px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;

    .text-input {
      width: 100% !important;
    }
  }

  .error-msg {
    color: rgb(241, 103, 109);
    font-size: 12px;
    font-weight: 500;
    margin-top: 9px;
  }

  .MuiFormHelperText-root {
    margin-left: 0 !important;
    font-size: 0.9rem !important;
  }
`;

const InputComponent = ({
  placeholder,
  variant,
  fullWidth,
  label,
  InnerPlaceholder,
  type,
  className,
  helperText,
  value,
  onChange,
  id,
  hasIcon,
  iconPosition,
  renderIcon,
  formik,
  name,
  disabled,
  inputClassname,
  isUseCustomeValue,
}) => {
  const { t } = useTranslation();

  return (
    <InputComponentContainer
      hasError={formik && formik.errors[name] && formik.touched[name]}
      className={className}
    >
      {type === "search" ? (
        <TextField
          id="search"
          type="search"
          label={t(label)}
          value={value}
          onChange={onChange}
          sx={{ width: 300 }}
          size="small"
          className={cx("text-input", inputClassname)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      ) : (
        <>
          {label && <label>{label}</label>}
          <TextField
            id={id && id}
            label={t(placeholder)}
            variant={variant ? variant : "outlined"}
            size="small"
            name={name}
            error={
              formik && formik.errors[name] && formik.touched[name]
                ? true
                : false
            }
            helperText={
              formik &&
              formik.touched[name] &&
              formik.errors[name] &&
              t(formik.errors[name])
            }
            onChange={formik ? formik.handleChange : onChange}
            className={cx("text-input", inputClassname)}
            value={
              isUseCustomeValue ? value : formik ? formik.values[name] : value
            }
            onBlur={formik && formik.handleBlur}
            fullWidth={fullWidth}
            placeholder={t(InnerPlaceholder)}
            type={type || "text"}
            multiline={type === "textarea"}
            rows={type === "textarea" && 4}
            title={t(helperText) || t(placeholder) || t(InnerPlaceholder)}
            disabled={disabled}
            InputProps={{
              endAdornment: (
                <>
                  {hasIcon && (
                    <InputAdornment position={iconPosition || "end"}>
                      {renderIcon ? (
                        <>{renderIcon}</>
                      ) : (
                        <VisibilityOutlinedIcon
                          style={{ width: "18px", cursor: "pointer" }}
                        />
                      )}
                    </InputAdornment>
                  )}
                </>
              ),
            }}
          />
        </>
      )}
    </InputComponentContainer>
  );
};

export default InputComponent;
