import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const queryClientWrapper: React.JSXElementConstructor<{
  children: React.ReactElement;
}> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export { queryClient, queryClientWrapper };
