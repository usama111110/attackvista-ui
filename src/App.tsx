
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { NotificationProvider } from "@/components/notification-provider";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Pricing from "./pages/Pricing";
import Users from "./pages/Users";
import Organizations from "./pages/Organizations";
import LiveTraffic from "./pages/LiveTraffic";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Detection from "./pages/Detection";
import Network from "./pages/Network";
import Notifications from "./pages/Notifications";
import Analytics from "./pages/Analytics";
import Security from "./pages/Security";
import Compliance from "./pages/Compliance";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <NotificationProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/" element={<Index />} />
              <Route path="/detection" element={<Detection />} />
              <Route path="/network" element={<Network />} />
              <Route path="/users" element={<Users />} />
              <Route path="/organizations" element={<Organizations />} />
              <Route path="/live-traffic" element={<LiveTraffic />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/security" element={<Security />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/compliance" element={<Compliance />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
