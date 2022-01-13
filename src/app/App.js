/**
 * Entry application component used to compose providers and render Routes.
 * */

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "../app/Routes";
// import { I18nProvider } from "../_metronic/i18n";
import { LayoutSplashScreen, MaterialThemeProvider } from "../_metronic/layout";

export default function App() {
  return (
        <React.Suspense fallback={<LayoutSplashScreen />}>
          <BrowserRouter>
            <MaterialThemeProvider>
               {/* <I18nProvider> */}
                <Routes />
              {/* </I18nProvider> */}
            </MaterialThemeProvider>
          </BrowserRouter>
        </React.Suspense>
  );
}
