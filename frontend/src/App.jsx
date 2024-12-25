import { Suspense, useEffect, useState } from "react";
import { axiosInstance } from "./utils/axiosInstance";
import { get } from "lodash";
import store from "./utils/store";
import indexRoutes from "./routes";
import i18next from "i18next";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";

import ErrorBoundary from "./boundaries/GlobalErrorBoundary";
import NotFound from "./views/NotFound";

import "./assets/sass/style.scss";
import "react-toastify/dist/ReactToastify.css";

const RenderRoutes = () => {
  return (
    <>
      {indexRoutes.map((page, key) => (
        <Route path={page.path} Component={page.component} key={key} />
      ))}
      <Route path="*" Component={NotFound}></Route>
    </>
  );
};

const App = () => {
  const [jsonData, setJsonData] = useState(null);
  const lang = localStorage.getItem("I18N_LANGUAGE") || "sb";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: `translations/${lang == "sr" ? "sb" : "en"}`,
        });

        if (response) {
          const data = get(response, "data");
          if (data) {
            setJsonData(data);
          }
        }
      } catch (error) {
        const { message } = error.data;
        return console.warn(message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (jsonData) {
      i18next.init({
        lng: lang, // or any other default language
        resources: {
          [lang]: {
            translation: jsonData, // assuming jsonData follows the i18next resource format
          },
        },
      });
    }
  }, [jsonData]);

  let theme = createTheme({
    palette: {
      primary: {
        main: "rgb(241, 103, 109)",
      },
      secondary: {
        main: "#fff",
      },
    },
    typography: {
      fontFamily: ["Nunito Sans"],
    },
  });

  return (
    <>
      <Provider store={store}>
        <ErrorBoundary>
          <ToastContainer theme="colored" />
          <BrowserRouter basename="/">
            <Suspense fallback={<div className="content">Loading</div>}>
              <ThemeProvider theme={theme}>
                <Routes>{RenderRoutes()}</Routes>
              </ThemeProvider>
            </Suspense>
          </BrowserRouter>
        </ErrorBoundary>
      </Provider>
    </>
  );
};

export default App;
