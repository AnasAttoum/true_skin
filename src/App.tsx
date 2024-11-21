import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import Header from "./components/Header";
import Loading from "./pages/Loading";

const LazyHome = lazy(() => import("./pages/Home"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Suspense fallback={<Loading />}><LazyHome /></Suspense>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
