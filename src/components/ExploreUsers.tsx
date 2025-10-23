"use client";

import {
    type ExploreProfile,
    ExploreService,
} from "@/services/explore.service";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import ErrorPage from "./ErrorPage";
import ExploreProfileCard from "./ExploreProfileCard";
import LoadingIndicator from "./LoadingIndicator";
import SubmitButton from "./SubmitButton";

const ExploreUsers = () => {
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
    } = useInfiniteQuery({
        queryKey: ["projects"],
        queryFn: ({ pageParam }: { pageParam: string }) =>
            ExploreService.getProfiles(pageParam),
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        initialPageParam: "",
    });

    return (
        <section className="content-wrapper mb-20">
            {isPending && <LoadingIndicator />}
            {error && <ErrorPage message={error.message} />}
            {data && (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.pages.map((group, i) => (
                            // biome-ignore lint/suspicious/noArrayIndexKey: <>
                            <React.Fragment key={i}>
                                {group.profiles.map((
                                    profile: ExploreProfile,
                                ) => (
                                    <div key={profile.id} className="h-full">
                                        <ExploreProfileCard profile={profile} />
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
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
    );
};

export default ExploreUsers;
