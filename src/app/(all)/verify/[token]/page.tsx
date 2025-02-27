"use client"

import EmailVerificationFailed from "@/components/EmailVerificationFailed";
import EmailVerifiedPage from "@/components/EmailVerifiedPage";
import LoadingIndicator from "@/components/LoadingIndicator";
import { AuthService } from "@/services/auth.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Verify() {
  const params = useParams();
  const token = params.token as string;

  const verify = useMutation({
    mutationFn: () => toast.promise(
        AuthService.verify(token),
        {
          loading: "Verifying Profile",
          success: "Verified Profile",
          error: (err) => `Error: ${err.message}`,
        }
      )
  });

  useEffect(() => {
    verify.mutate()
  }, [])

  if (verify.isError) {
    return <EmailVerificationFailed message={verify.error.message} />
  }

  if (verify.isPending) {
    return (
      <LoadingIndicator />
    );
  }

  return <EmailVerifiedPage />

}
