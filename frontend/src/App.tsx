import './App.css'
import BrowseInstances from "./components/BrowseInstances";
import Filters from "./components/Filters";

function App() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <Filters />
      <BrowseInstances />
    </div>
  );
}

export default App;
