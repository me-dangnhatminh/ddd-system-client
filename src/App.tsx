"use client";

import { Suspense, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { rootRouter } from "./views/routes/root";
import FullLoading from "./views/components/FullLoading";
import { ApiError } from "./api/http-rest/api.dto";

const handleErrorMessages = (error: unknown) => {
  if (error instanceof ApiError) return error.error.detail;
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;

  return "An unknown error occurred.";
};

function App() {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          refetchOnWindowFocus: false,
          refetchOnMount: false,
          refetchOnReconnect: false,
        },
        mutations: { retry: false },
      },
      mutationCache: new MutationCache({
        onError: (error, _variables, _context, mutation) => {
          if (mutation.options.onError) return;
          alert(handleErrorMessages(error));
        },
      }),
    })
  );

  return (
    <Suspense fallback={<FullLoading />}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <RouterProvider router={rootRouter} />
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;

