// import logo from "./logo.svg";
import "./App.css";
import AppHeader from "./Components/pageHeader";
import PageContent from "./Components/pageContent";
import AppFooter from "./Components/footer";
function App() {
  return (
    <div className="App">
      <AppHeader />
      <PageContent />
      <AppFooter />
    </div>
  );
}

export default App;
