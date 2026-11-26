"use client";

import RouteError from "@/components/shared/errors/RouteError";

export default function Error({ error, reset }) {
  return (
    <RouteError
      error={error}
      reset={reset}
      title="InternCheck couldn't load"
      description="An unexpected application error occurred. Try again, or reload InternCheck."
    />
  );
}
