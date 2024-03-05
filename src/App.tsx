import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>Hello World</h1>
      </div>
    </QueryClientProvider>
  );
}

export default App;

