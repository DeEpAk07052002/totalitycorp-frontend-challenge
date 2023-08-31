import "./App.css";
import { useEffect, useState } from "react";
import AppHeader from "./Components/pageHeader";
import PageContent from "./Components/pageContent";
import AppFooter from "./Components/footer";
import { BrowserRouter } from "react-router-dom";
function App() {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    localStorage.setItem("screenSize", window.innerWidth);
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    // Add event listener on component mount
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <AppHeader />
        <PageContent />
        {/* <AppFooter /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
