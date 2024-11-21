import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import Header from "./components/Header";
import Loading from "./pages/Loading";
import { ThemeProvider } from "@mui/material";
import { theme } from "./constants/data";
import { HelmetProvider } from "react-helmet-async";

const LazyHome = lazy(() => import("./pages/Home"));
const LazyProducts = lazy(() => import("./pages/Products"));
const LazyProductDetails = lazy(() => import("./pages/ProductDetails"));
const LazyCart = lazy(() => import("./pages/Cart"));

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<Header />}>

              <Route index element={<Suspense fallback={<Loading />}><LazyHome /></Suspense>} />
              <Route path="products" element={<Suspense fallback={<Loading />}><LazyProducts /></Suspense>} />
              <Route path="products/:productId" element={<Suspense fallback={<Loading />}><LazyProductDetails /></Suspense>} />
              <Route path="cart" element={<Suspense fallback={<Loading />}><LazyCart /></Suspense>} />

            </Route>

          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
