import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useFilterStore } from "../stores/useFiltersStore";

const Filters = () => {
  const { cloudType, region, minRam, maxRam, minCpu, maxCpu, setFilters } =
    useFilterStore();

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg p-4">
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <DisclosureButton className="flex justify-between w-full p-3 text-lg font-semibold bg-gray-200 rounded-lg hover:bg-gray-300 transition">
              Filters
              {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </DisclosureButton>

            <DisclosurePanel className="mt-4 space-y-4">
              {/* Cloud Type */}
              <div>
                <label className="block text-sm font-medium">Cloud Type</label>
                <select
                  className="w-full p-2 border rounded"
                  value={cloudType}
                  onChange={(e) => setFilters({ cloudType: e.target.value })}
                >
                  <option value="AWS">AWS</option>
                </select>
              </div>

              {/* Region */}
              <div>
                <label className="block text-sm font-medium">Region</label>
                <select
                  className="w-full p-2 border rounded"
                  value={region}
                  onChange={(e) => setFilters({ region: e.target.value })}
                >
                  <option value="eu-west-1">eu-west-1</option>
                </select>
              </div>

              {/* RAM & CPU Inputs */}
              <div className="grid grid-cols-2 gap-4">
                {/* Min RAM */}
                <div>
                  <label className="block text-sm font-medium">
                    Min RAM (GB)
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={minRam}
                    min={0}
                    max={maxRam}
                    onChange={(e) =>
                      setFilters({ minRam: Number(e.target.value) })
                    }
                  />
                </div>

                {/* Max RAM */}
                <div>
                  <label className="block text-sm font-medium">
                    Max RAM (GB)
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={maxRam}
                    min={minRam}
                    max={128}
                    onChange={(e) =>
                      setFilters({ maxRam: Number(e.target.value) })
                    }
                  />
                </div>

                {/* Min CPU */}
                <div>
                  <label className="block text-sm font-medium">
                    Min CPU Cores
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={minCpu}
                    min={1}
                    max={maxCpu}
                    onChange={(e) =>
                      setFilters({ minCpu: Number(e.target.value) })
                    }
                  />
                </div>

                {/* Max CPU */}
                <div>
                  <label className="block text-sm font-medium">
                    Max CPU Cores
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={maxCpu}
                    min={minCpu}
                    max={64}
                    onChange={(e) =>
                      setFilters({ maxCpu: Number(e.target.value) })
                    }
                  />
                </div>
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Filters;
