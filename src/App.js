import "./App.css";
import AppHeader from "./Components/pageHeader";
import PageContent from "./Components/pageContent";
import AppFooter from "./Components/footer";
import { BrowserRouter } from "react-router-dom";
function App() {
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
