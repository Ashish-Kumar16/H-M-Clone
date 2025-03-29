import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { checkAuth } from "./redux/authSlice"; // Import checkAuth
import { store } from "./redux/store";
import { SnackbarProvider } from "notistack";
import "./App.css";
import { Navbar } from "./Components/Navbar/Navbar";
import { AllRoutes } from "./Pages/AllRoutes";
import { Footer } from "./Pages/Footer/Footer";
import { useSelector } from "react-redux";
// import { checkAuth } from "./redux/authSlice";

function App() {
  const dispatch = useDispatch();
  const {
    user,
    status: authStatus,
    error: authError,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth()).then((result) => {
      console.log("checkAuth result in App:", {
        payload: result.payload,
        status: result.meta.requestStatus,
      });
    });
  }, [dispatch]);

  console.log("App auth state:", { user, authStatus, authError });

  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <div className="App">
          <Navbar />
          <main>
            <AllRoutes />
          </main>
          <Footer />
        </div>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
