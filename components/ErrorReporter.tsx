"use client";

import { useEffect } from "react";
import { reportError } from "@/lib/reportError";

/**
 * Mounts global error listeners on the window object.
 * Catches two classes of errors that React's error boundary misses:
 *   1. Uncaught synchronous JS errors (window "error" event)
 *   2. Unhandled promise rejections (window "unhandledrejection" event)
 *
 * Renders nothing — add once to the root layout.
 */
export default function ErrorReporter() {
  useEffect(() => {
    function onError(event: ErrorEvent) {
      reportError(event.error ?? event.message, "window.onerror");
    }

    function onUnhandledRejection(event: PromiseRejectionEvent) {
      reportError(event.reason, "unhandled-promise");
    }

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandledRejection);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, []);

  return null;
}
