import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { renderHeader } from "./mock";
import { debounce, size } from "lodash";
import {
  ROUTE_ADMIN_COLORS_ADD,
  ROUTE_ADMIN_COLORS_EDIT,
} from "../../../routes/routes";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import map from "lodash/map";

import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import { LoaderContainer } from "../../../components/Loader";

import Tables from "../../../components/SuperAdmin/Tables";
import InputComponent from "../../../components/InputComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import AddIcon from "@mui/icons-material/Add";
import ModalComponent from "../../../components/ModalComponent";
import { ColorsContainer } from "./styled";

const Colors = () => {
  const [loading, setLoading] = useState(false);
  const [colorList, setColorList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [colorToDelete, setColorToDelete] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchFilterData, setSearchFilterData] = useState([]);

  const navigation = useNavigate();
  const { t } = useTranslation();

  const getColorList = async () => {
    setLoading(true);

    const response = await commonGetQuery("/colors");

    if (response) {
      const { data } = response.data;
      setColorList(data);
      setLoading(false);
    }

    setLoading(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const setTableRenderData = (data) => {
    const renderData = map(data, (item, index) => ({
      ...item,
      no: `${index + 1}`,
      color_code: item?.code,
      color_name: item.name,
      id: item.id,
      status: item.status ? t("Active") : t("Inactive"),
      handleOpenDeleteModal,
      EditColor,
    }));

    return renderData;
  };

  const handleDelete = async () => {
    setLoading(true);

    const response = await commonAddUpdateQuery(
      `/colors/${colorToDelete.id}`,
      null,
      "DELETE"
    );

    if (response) {
      getColorList();
    }

    setLoading(false);

    handleToggle();
  };

  const handleOpenDeleteModal = (id, title) => {
    setColorToDelete({ id, title });
    handleToggle();
  };

  const EditColor = (id) => {
    let route = ROUTE_ADMIN_COLORS_EDIT.replace(":id", id);
    navigation(route);
  };

  const filterColors = (query) => {
    return colorList.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) || // Search by Color Name
        item.code.toLowerCase().includes(query.toLowerCase()) // Search by Code
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

      const filteredItems = filterColors(query);
      setSearchFilterData(filteredItems);
    }, 1000),
    [searchText]
  );

  // Event handler for search change
  const handleChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
    debouncedHandleSearch(value);
  };

  useEffect(() => {
    getColorList();
  }, []);

  return (
    <ColorsContainer>
      <CommonWhiteBackground>
        <FlexBox className="mb-4 title-wrapper">
          <div className="main-title ">{t("Colors")}</div>
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
              text={t("Add Colors")}
              onClick={() => navigation(ROUTE_ADMIN_COLORS_ADD)}
            />
          </FlexBox>
        </FlexBox>

        {loading && <LoaderContainer />}

        <ModalComponent
          title={t("Delete Color")}
          size={"m"}
          open={isOpen}
          handleClose={handleToggle}
        >
          <p>
            {`${t("Are you sure you want to delete")} `}
            <span className="bold">{colorToDelete?.title}</span>
            {`?`}
          </p>
          <>
            <FlexBox hasBorderTop={true} className="pt-3 mt-3">
              <ButtonComponent
                className=""
                variant="outlined"
                fullWidth
                text={t("Cancel")}
                onClick={handleToggle}
              />
              <ButtonComponent
                variant="contained"
                fullWidth
                text={t("Delete")}
                type="button"
                onClick={handleDelete}
              />
            </FlexBox>
          </>
        </ModalComponent>

        <Tables
          className="colors-table"
          body={
            isSearch
              ? size(searchFilterData) > 0
                ? setTableRenderData(searchFilterData)
                : []
              : size(colorList) > 0
              ? setTableRenderData(colorList)
              : []
          }
          header={renderHeader.map((item) => ({
            ...item,
            headerName: t(item.headerName),
          }))}
        />
      </CommonWhiteBackground>
    </ColorsContainer>
  );
};

export default Colors;
