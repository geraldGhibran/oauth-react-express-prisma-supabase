import RootLayout from "@/components/RootLayout";
import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { useProviders } from "./hooks/useProviders";

type ProviderProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

export function Providers({ children }: ProviderProps) {
  const { signedIn, session } = useProviders();
  console.log("signedIn", signedIn);
  console.log("session", session);
  

  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <RootLayout>{children}</RootLayout>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default Providers;
