import { Suspense } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { rootRouter } from "./views/routes/root";
import FullLoading from "./views/components/FullLoading";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<FullLoading />}>
        <RouterProvider router={rootRouter} />
        <ReactQueryDevtools />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;

