import React from "react";
import { Provider } from "react-redux";

import "./App.css";
import { Navbar } from "./Components/Navbar/Navbar";
import { AllRoutes } from "./Pages/AllRoutes";
import { Footer } from "./Pages/Footer/Footer";
import { store } from "./redux/store"; // Import the configured Redux store
import { useDispatch } from "react-redux";
import { signIn } from "./redux/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (accessToken && user) {
      dispatch(
        signIn.fulfilled({
          user,
          ACCESS_TOKEN: accessToken,
        }),
      );
    }
  }, [dispatch]);

  return (
    <Provider store={store}>
      <div className="App">
        {/* Main Navigation */}
        <Navbar />

        {/* Application Routes */}
        <main>
          <AllRoutes />
        </main>

        {/* Footer Section */}
        <Footer />
      </div>
    </Provider>
  );
};

export default App;
