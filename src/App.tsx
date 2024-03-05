import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./views/pages/HomePage";

const queryClient = new QueryClient({
  defaultOptions: {},
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
  );
}

export default App;

