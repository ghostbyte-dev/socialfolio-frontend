"use client"

import { AuthService } from "@/services/auth.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Verify() {
  const params = useParams();
  const token = params.token as string;
  const [verified, setVerified] = useState<boolean>(false)
  const verify = useMutation({
    mutationFn: () => toast.promise(
        AuthService.verify(token),
        {
          loading: "Verifying Profile",
          success: "Verified Profile",
          error: (err) => `Error: ${err.message}`,
        }
      ),
      onSuccess: () => {
        setVerified(true)
      }
  });

  useEffect(() => {
    verify.mutate()
  }, [])

  if (!verified) {
    return <div>Verifying...</div>
  }

  return (
    <div>
      <h2>Your Profile is now verified</h2>
    </div>
  );
}
