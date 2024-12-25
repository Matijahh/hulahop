import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { renderHeader } from "./mock";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { debounce, size } from "lodash";
import * as Yup from "yup";
import map from "lodash/map";
import styled from "styled-components";

import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import { LoaderContainer } from "../../../components/Loader";

import Tables from "../../../components/SuperAdmin/Tables";
import InputComponent from "../../../components/InputComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import AddIcon from "@mui/icons-material/Add";
import ModalComponent from "../../../components/ModalComponent";

const TABLE_OFFSET = "184px";

export const Container = styled.div`
  .translations-table {
    height: calc(100vh - ${TABLE_OFFSET});

    .css-yrdy0g-MuiDataGrid-columnHeaderRow {
      .MuiDataGrid-withBorderColor:last-child {
        .MuiDataGrid-columnHeaderTitleContainer {
          justify-content: center;
        }
      }
    }
  }
`;

const Translation = () => {
  const [loading, setLoading] = useState(false);
  const [wordsList, setWordsList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchFilterData, setSearchFilterData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  const { t } = useTranslation();

  const validation = Yup.object().shape({
    en: Yup.string().required(t("English word is required!")),
    sb: Yup.string().required(t("Serbian word is required!")),
  });

  const formik = useFormik({
    initialValues: {
      id: null,
      en: "",
      sb: "",
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      let reqBody = {
        en: values.en,
        sb: values.sb,
      };

      const URL = "/translations";

      setLoading(true);

      const response = await commonAddUpdateQuery(
        URL,
        reqBody
        // values.id ? "PATCH" : "POST"
      );

      setLoading(false);

      if (response) {
        getWordsList();
        //isSearch && debouncedHandleSearch(searchText);
        handleClose();
      }
    },
  });

  const getWordsList = async () => {
    setLoading(true);

    const response = await commonGetQuery("/translations/sb");

    if (response) {
      const data = response.data;

      let WordListArray = [];

      if (size(data) > 0) {
        let id = 1;

        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            const value = data[key];
            let langObj = {
              id: id,
              en: key,
              sb: value,
            };
            WordListArray.push(langObj);
          }
          id++;
        }

        setWordsList(WordListArray);

        if (isSearch && searchText) {
          const filteredItems = filterItems(searchText, WordListArray);
          setSearchFilterData(filteredItems);
        }
      }

      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    const { en, sb } = item;

    formik.setValues({
      id: item.id,
      en: en,
      sb: sb,
    });

    setIsOpen(true);
  };

  const setTableRenderData = (data) => {
    const renderData = map(data, (item, index) => ({
      ...item,
      no: `${index + 1}`,
      en: item.en,
      sb: item.sb,
      id: item.id,
      handleEdit,
    }));

    return renderData;
  };

  const AddWord = () => {
    formik.resetForm();
    setIsOpen(true);
  };

  const handleClose = () => {
    formik.resetForm();
    setIsOpen(false);
  };

  const filterItems = (query, list) => {
    return list.filter(
      (item) =>
        item.en.toLowerCase().includes(query.toLowerCase()) || // Search English
        item.sb.toLowerCase().includes(query.toLowerCase()) // Search Serbian
    );
  };

  // Debounced version of handleSearch
  const debouncedHandleSearch = useCallback(
    debounce((query) => {
      if (query) {
        setIsSearch(true);
      } else {
        setIsSearch(false);
      }

      const filteredItems = filterItems(query, wordsList);
      setSearchFilterData(filteredItems);
    }, 1000),
    [searchText, wordsList]
  );

  // Event handler for input change
  const handleChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
    debouncedHandleSearch(value);
  };

  useEffect(() => {
    getWordsList();
  }, []);

  return (
    <Container>
      <CommonWhiteBackground>
        <FlexBox className="mb-4 title-wrapper">
          <div className="main-title ">{t("Translations")}</div>
          <FlexBox className="filters-wrapper">
            <InputComponent
              type="search"
              label={t("Search")}
              value={searchText}
              onChange={handleChange}
            />
            <ButtonComponent
              variant="contained"
              startIcon={<AddIcon />}
              text={t("Add Word")}
              onClick={() => AddWord()}
            />
          </FlexBox>
        </FlexBox>

        {loading && <LoaderContainer />}

        <Tables
          className="translations-table"
          body={
            isSearch
              ? size(searchFilterData) > 0
                ? setTableRenderData(searchFilterData)
                : []
              : size(wordsList) > 0
              ? setTableRenderData(wordsList)
              : []
          }
          header={renderHeader.map((item) => ({
            ...item,
            headerName: t(item.headerName),
          }))}
        />
      </CommonWhiteBackground>
      <ModalComponent
        open={isOpen}
        title={formik && formik.values.id ? t("Edit Word") : t("Add Word")}
        handleClose={handleClose}
        size="m"
      >
        <form onSubmit={formik.handleSubmit}>
          <InputComponent
            label={t("English Word")}
            fullWidth
            InnerPlaceholder={t("Enter English Word")}
            name="en"
            formik={formik}
            className="mt-3"
            disabled={loading}
          />
          <InputComponent
            label={t("Serbian Word")}
            fullWidth
            InnerPlaceholder={t("Enter Serbian Word")}
            name="sb"
            formik={formik}
            className="mt-3"
            disabled={loading}
          />
          <>
            <FlexBox hasBorderTop={true} className="pt-3 mt-3">
              <ButtonComponent
                className=""
                variant="outlined"
                fullWidth
                text={t("Cancel")}
                onClick={handleClose}
              />
              <ButtonComponent
                variant="contained"
                fullWidth
                text={
                  formik && formik.values.id ? t("Update Word") : t("Add Word")
                }
                type="submit"
              />
            </FlexBox>
          </>
        </form>
      </ModalComponent>
    </Container>
  );
};

export default Translation;
