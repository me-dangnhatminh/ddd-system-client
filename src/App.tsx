import { Suspense, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FullLoading from "./views/components/FullLoading";
import { RootRouter } from "./views/routes/RootRouter";
import { RouterProvider } from "react-router-dom";

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
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Suspense fallback={<FullLoading />}>
        <RouterProvider router={RootRouter} />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;

