import './App.css';
import BrowseInstances from './components/BrowseInstances';
import Filters from './components/Filters';

function App() {
  return (
    <div>
      <div className="flex w-full flex-col items-stretch justify-center px-6 lg:max-w-[1170px]">
        <section className="flex w-full flex-col items-center justify-between gap-2 pt-3">
          <div className="relative z-0 mt-4 w-full">
            <Filters />
          </div>
          <div className="relative z-0 mt-4 w-full">
            <BrowseInstances />
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
