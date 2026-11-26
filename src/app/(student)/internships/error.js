"use client";

import RouteError from "@/components/shared/errors/RouteError";

export default function Error({ error, reset }) {
  return (
    <RouteError
      error={error}
      reset={reset}
      title="Internships couldn't be loaded"
    />
  );
}
