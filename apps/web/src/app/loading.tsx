import React from "react";
import { Container } from "@red-velvet/ui";
import { Skeleton } from "../components/common/Skeleton";

export default function Loading() {
  return (
    <Container size="default" className="py-20">
      <div className="flex flex-col items-center gap-6 text-center">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-12 w-3/4 max-w-xl" />
        <Skeleton className="h-6 w-1/2 max-w-md" />
        <div className="mt-8 flex gap-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
      <div className="mt-16">
        <Skeleton className="h-80 w-full" />
      </div>
    </Container>
  );
}
