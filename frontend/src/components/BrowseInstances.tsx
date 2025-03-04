import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchInstances } from '../actions/filters.actions';
import InstanceCard from './InstanceCard';
import Spinner from './Spinner'; // Ensure this component exists
import { useFilterStore } from '../stores/useFiltersStore';

const BrowseInstances: React.FC = () => {
  const { cloudType, region, minRam, maxRam, minCpu, maxCpu } =
    useFilterStore();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useSearchInstances({ cloudType, region, minRam, maxRam, minCpu, maxCpu });

  const handleLoadNextPage = async () => {
    if (!isFetchingNextPage && hasNextPage) {
      return fetchNextPage();
    }
    return [];
  };

  console.log('BrowseInstances data', data);

  const totalInstances: number = Number(
    data?.pages?.reduce((acc, group) => acc + (group.data?.length || 0), 0) ||
      0,
  );

  return (
    <div className="mt-6 min-h-[680px] w-full pb-6">
      <InfiniteScroll
        dataLength={totalInstances}
        next={handleLoadNextPage}
        hasMore={hasNextPage || isFetchingNextPage || isLoading}
        loader={
          <div className="flex w-full items-center justify-center p-4">
            <Spinner className="h-8 w-8 text-blue-500" />
          </div>
        }
        endMessage={
          <div className="flex items-center justify-center p-4 text-gray-500">
            No more instances available. Check back later!
          </div>
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.pages?.map((group, i) => (
            <React.Fragment key={i}>
              {group.data?.map((instance, index) => (
                <InstanceCard
                  key={instance.id || `${i}-${index}`}
                  instance={instance}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default BrowseInstances;
