import { QueryClient, QueryClientProvider } from "react-query";
import HomePage from "./pages/HomePage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { onError: () => {} }, //TODO: add global error handling
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
  );
}

export default App;

