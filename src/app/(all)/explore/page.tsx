"use client";

import ErrorPage from "@/components/ErrorPage";
import ExploreProfileCard from "@/components/ExploreProfileCard";
import LoadingIndicator from "@/components/LoadingIndicator";
import { ExploreProfile, ExploreService } from "@/services/explore.service";
import { useQuery } from "@tanstack/react-query";

export default function Explore() {
  const {
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

  return (
    <div className="items-center flex flex-col">
      <section className="flex flex-col items-center mb-10">
        <h1 className="text-6xl font-bold mb-6">Explore</h1>
      </section>

      <section className="w-full max-w-6xl px-4 mb-20">
        {isPending && <LoadingIndicator />}
        {error && <ErrorPage message={error.message} />}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles?.map((profile: ExploreProfile) => (
            <div key={profile.id} className="h-full">
              <ExploreProfileCard profile={profile} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
