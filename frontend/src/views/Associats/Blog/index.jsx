import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { renderHeader } from "./mock";
import {
  ROUTE_ADMIN_BLOG_ADD,
  ROUTE_ADMIN_BLOG_EDIT,
} from "../../../routes/routes";
import {
  commonAddUpdateQuery,
  commonGetQuery,
} from "../../../utils/axiosInstance";
import { ACCESS_TOKEN } from "../../../utils/constant";
import { get, size, debounce } from "lodash";
import { jwtDecode } from "jwt-decode";
import map from "lodash/map";
import styled from "styled-components";

import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import { LoaderContainer } from "../../../components/Loader";

import InputComponent from "../../../components/InputComponent";
import Tables from "../../../components/SuperAdmin/Tables";
import ButtonComponent from "../../../components/ButtonComponent";
import AddIcon from "@mui/icons-material/Add";
import ModalComponent from "../../../components/ModalComponent";

const TABLE_OFFSET = "184px";

const Container = styled.div`
  .blogs-table {
    height: calc(100vh - ${TABLE_OFFSET});

    .css-yrdy0g-MuiDataGrid-columnHeaderRow {
      .MuiDataGrid-withBorderColor:nth-child(2),
      .MuiDataGrid-withBorderColor:last-child {
        .MuiDataGrid-columnHeaderTitleContainer {
          justify-content: center;
        }
      }
    }
  }
`;

const AssociateBlog = () => {
  const [loading, setLoading] = useState(false);
  const [blogList, setBlogList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchFilterData, setSearchFilterData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [storeId, setStoreId] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  const navigation = useNavigate();
  const { t } = useTranslation();

  const decoded = jwtDecode(ACCESS_TOKEN);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const getBlogList = async () => {
    setLoading(true);

    const response = await commonGetQuery(`/associate_blogs/store/${storeId}`);

    if (response) {
      const { data } = response.data;
      setBlogList(data);
      setLoading(false);
    }

    setLoading(false);
  };

  const setTableRenderData = (data) => {
    const renderData = map(data, (item, index) => ({
      ...item,
      no: `${index + 1}`,
      id: get(item, "id", ""),
      heading: get(item, "heading", ""),
      image_id: get(item, "image_id", ""),
      category_name: get(item, "category_name", ""),
      content: get(item, "content", ""),
      handleOpenDeleteModal,
      EditColor,
    }));

    return renderData;
  };

  const handleDelete = async () => {
    setLoading(true);

    const response = await commonAddUpdateQuery(
      `/associate_blogs/${blogToDelete.id}`,
      null,
      "DELETE"
    );

    if (response) {
      getBlogList();
    }

    setLoading(false);

    handleToggle();
  };

  const handleOpenDeleteModal = (id, title) => {
    setBlogToDelete({ id, title });
    handleToggle();
  };

  const EditColor = (id) => {
    let route = ROUTE_ADMIN_BLOG_EDIT.replace(":id", id);
    navigation(route);
  };

  const getStoreData = async () => {
    setLoading(true);

    const response = await commonGetQuery(
      `/store_layout_details/${decoded.id}`
    );

    setLoading(false);

    const { data } = response.data;
    setStoreId(data?.id);
  };

  useEffect(() => {
    getStoreData();
  }, []);

  useEffect(() => {
    if (storeId) {
      getBlogList();
    }
  }, [storeId]);

  const filterItems = (query) => {
    return blogList.filter(
      (item) =>
        item?.heading?.toLowerCase()?.includes(query?.toLowerCase()) ||
        item?.category_name?.toLowerCase()?.includes(query?.toLowerCase())
    );
  };

  const debouncedHandleSearch = useCallback(
    debounce((query) => {
      if (query) {
        setIsSearch(true);
      } else {
        setIsSearch(false);
      }

      const filteredItems = filterItems(query);
      setSearchFilterData(filteredItems);
    }, 1000),
    [searchText]
  );

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
    debouncedHandleSearch(value);
  };

  return (
    <Container>
      <CommonWhiteBackground>
        <FlexBox className="mb-4 assoc-title-wrapper">
          <div className="main-title ">{t("Blogs")}</div>
          <FlexBox className="filters-wrapper">
            <InputComponent
              type="search"
              label={t("Search Blogs")}
              value={searchText}
              onChange={handleChange}
            />
            <ButtonComponent
              variant="contained"
              startIcon={<AddIcon />}
              text={t("Add Blog")}
              onClick={() => navigation(ROUTE_ADMIN_BLOG_ADD)}
            />
          </FlexBox>
        </FlexBox>

        {loading && <LoaderContainer />}

        <ModalComponent
          title={t("Delete Blog")}
          size={"m"}
          open={isOpen}
          handleClose={handleToggle}
        >
          <p>
            {`${t("Are you sure you want to delete")} `}
            <span className="bold">{blogToDelete?.title}</span>
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
          className="blogs-table"
          body={
            isSearch
              ? size(searchFilterData) > 0
                ? setTableRenderData(searchFilterData)
                : []
              : size(blogList) > 0
              ? setTableRenderData(blogList)
              : []
          }
          header={renderHeader.map((item) => ({
            ...item,
            headerName: t(item.headerName),
          }))}
        />
      </CommonWhiteBackground>
    </Container>
  );
};

export default AssociateBlog;
