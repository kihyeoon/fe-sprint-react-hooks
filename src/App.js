import { BrowserRouter, Routes, Route } from "react-router-dom";
import useFetch from "./util/useFetch";
import React, { Suspense, lazy } from "react";

/* react.lazy()와 suspense를 사용해 보세요. */
const Home = lazy(() => import("./Home"));
const Navbar = lazy(() => import("./component/Navbar"));
const CreateBlog = lazy(() => import("./blogComponent/CreateBlog"));
const BlogDetails = lazy(() => import("./blogComponent/BlogDetail"));
const NotFound = lazy(() => import("./component/NotFound"));
const Footer = lazy(() => import("./component/Footer"));
const Loading = lazy(() => import("./component/Loading"));

function App() {
  /* get 메소드를 통해 데이터를 받아오는 useEffect hook은 컴포넌트 내 여기저기 존재하고 있습니다. */
  /* 해당 hook은 반복이 되는 부분이 있으므로 어떻게 custom hook으로 만들 수 있을 지 고민해봅시다. */
  /* util 폴더 내에 존재하는 useFetch에 여러분의 custom hook을 작성해주세요. */
  const [blogs, isPending, error] = useFetch("http://localhost:3001/blogs/");

  return (
    <BrowserRouter>
      {error && <div>{error}</div>}
      <div className="app">
        <Navbar />
        <div className="content">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route
                exact
                path="/"
                element={<Home blogs={blogs} isPending={isPending} />}
              />
              <Route path="/create" element={<CreateBlog />} />
              <Route path="/blogs/:id" element={<BlogDetails />} />
              <Route path="/blogs/:id" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
