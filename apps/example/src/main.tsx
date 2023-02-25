import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { WebRpcClientProvider } from "@webrpc/react-query-adapter";
import { rpcQueryClient } from "./rpc";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WebRpcClientProvider client={rpcQueryClient}>
      <ReactQueryDevtools />
      <App />
    </WebRpcClientProvider>
  </React.StrictMode>
);
