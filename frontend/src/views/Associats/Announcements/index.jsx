import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { commonGetQuery } from "../../../utils/axiosInstance";
import { debounce } from "lodash";
import styled from "styled-components";

import Tables from "../../../components/SuperAdmin/Tables";
import InputComponent from "../../../components/InputComponent";

import { CommonWhiteBackground, FlexBox } from "../../../components/Sections";
import { Loader } from "../../../components/Loader";
import { Helmet } from "react-helmet";

const TABLE_OFFSET = "184px";

const Container = styled.div`
  .announcements-table {
    height: calc(100vh - ${TABLE_OFFSET});
  }
`;

const Announcements = () => {
  const [loading, setLoading] = useState(false);
  const [tableList, setTableList] = useState([]);
  const [searchFilterData, setSearchFilterData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  const { t } = useTranslation();

  const tableHeaderTitle = [
    { field: "id", headerName: t("ID") },
    { field: "title", headerName: t("Title"), width: 200 },
    { field: "desc", headerName: t("Details"), width: 700 },
  ];

  const getAnnouncementDat = async () => {
    setLoading(true);

    const response = await commonGetQuery("/announcements");

    setLoading(false);

    if (response) {
      const { data } = response.data;
      const modifiedData = data.map((item) => {
        return {
          id: item.id,
          title: item.title,
          desc: item.description,
        };
      });

      setTableList(modifiedData);
    }
  };

  const filterItems = (query) => {
    return tableList.filter(
      (item) => item.title.toLowerCase().includes(query.toLowerCase()) // Search by Title
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

      const filteredItems = filterItems(query);
      setSearchFilterData(filteredItems);
    }, 1000),
    [searchText]
  );

  // Event handler for input change
  const handleChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
    debouncedHandleSearch(value);
  };

  useEffect(() => {
    getAnnouncementDat();
  }, []);

  return (
    <Container>
      <CommonWhiteBackground>
        <Helmet>
          <title>{t("Announcements - Associate")}</title>
        </Helmet>
        <FlexBox className="mb-4" isWrap>
          <div className="main-title">{t("Announcements")}</div>
          <InputComponent
            type="search"
            label={t("Search Announcements")}
            value={searchText}
            onChange={handleChange}
          />
        </FlexBox>
        {loading ? (
          <Loader />
        ) : (
          <Tables
            className="announcements-table"
            header={tableHeaderTitle}
            body={isSearch ? searchFilterData : tableList}
          />
        )}
      </CommonWhiteBackground>
    </Container>
  );
};
export default Announcements;
