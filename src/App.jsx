import Navbar from "./components/navbar/Navbar";
import "./layout.scss";
import HomePage from "./routes/homePage/homePage";
function App() {
  return (
    <div className="layout">
      <Navbar />
      <div className="content">
        <HomePage />
      </div>
    </div>
  );
}

export default App;
