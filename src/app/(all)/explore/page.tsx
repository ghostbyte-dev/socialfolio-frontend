"use client";

import ErrorPage from "@/components/ErrorPage";
import ExploreProfileCard from "@/components/ExploreProfileCard";
import LoadingIndicator from "@/components/LoadingIndicator";
import SubmitButton from "@/components/SubmitButton";
import { ExploreProfile, ExploreService } from "@/services/explore.service";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React from "react";

export default function Explore() {
  /*const {
    data: profiles,
    isPending,
    error,
  } = useQuery({
    queryKey: ["exploreprofiles"],
    queryFn: async () => {
      try {
        return await ExploreService.getProfiles();
      } catch (err: any) {
        throw err;
      }
    },
  });
*/
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: ({ pageParam }: { pageParam: string }) =>
      ExploreService.getProfiles(pageParam),
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    initialPageParam: "",
  });

  return (
    <>
    <title>Explore - Socialfolio</title>

    <div className="items-center flex flex-col">
      <section className="flex flex-col items-center mb-10">
        <h1 className="text-6xl font-bold mb-6">Explore</h1>
      </section>

      <section className="w-full max-w-6xl px-4 mb-20">
        {isPending && <LoadingIndicator />}
        {error && <ErrorPage message={error.message} />}
        {data && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.pages.map((group, i) => (
                <React.Fragment key={i}>
                  {group.profiles.map((profile: ExploreProfile) => (
                    <div key={profile.id} className="h-full">
                      <ExploreProfileCard profile={profile} />
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div >
              <div className="flex justify-center w-full mt-5">
                <SubmitButton
                  text={hasNextPage ? "Load More" : "End reached"}
                  isDisabled={!hasNextPage || isFetchingNextPage}
                  isLoading={isFetchingNextPage}
                  isFullWidth={false}
                  onClick={() => fetchNextPage()}
                />
              </div>
             
          </div>
        )}
      </section>
    </div>
    </>
  );
}
