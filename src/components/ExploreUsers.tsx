"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  type ExploreOrder,
  type ExploreProfile,
  ExploreService,
} from "@/services/explore.service";
import { Button } from "./Button";
import ErrorPage from "./ErrorPage";
import ExploreProfileCard from "./ExploreProfileCard";
import LoadingIndicator from "./LoadingIndicator";

const ExploreUsers = () => {
  const [order, setOrder] = useState<ExploreOrder>("latest");

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ["profiles", order],
    queryFn: ({ pageParam }: { pageParam: string }) =>
      ExploreService.getProfiles(pageParam, order),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: "",
  });

  return (
    <section className="content-wrapper mb-20">
      <div className="relative items-start floating-wrapper p-1 bg-surface-container mb-8 w-fit font-bold text-sm">
        <button
          type="button"
          onClick={() => setOrder("latest")}
          className={`rounded-full px-4 h-9 flex items-center justify-center ${
            order === "latest"
              ? "bg-primary text-on-primary"
              : "bg-surface-container"
          }`}
        >
          Newest Profiles
        </button>
        <button
          type="button"
          onClick={() => setOrder("popular")}
          className={`rounded-full px-4 h-9 flex items-center justify-center ${
            order === "popular"
              ? "bg-primary text-on-primary"
              : "bg-surface-container"
          }`}
        >
          Most Popular
        </button>
      </div>

      {isPending && <LoadingIndicator />}
      {error && <ErrorPage message={error.message} />}
      {data && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.pages.map((group, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <>
              <React.Fragment key={i}>
                {group.profiles.map((profile: ExploreProfile) => (
                  <div key={profile.id} className="h-full">
                    <ExploreProfileCard profile={profile} />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-center w-full mt-5">
            <Button
              label={hasNextPage ? "Load More" : "End reached"}
              disabled={!hasNextPage || isFetchingNextPage}
              isLoading={isFetchingNextPage}
              onClick={() => fetchNextPage()}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ExploreUsers;
