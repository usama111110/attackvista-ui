
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { NotificationProvider } from "@/components/notification-provider";
import { lazy, Suspense } from "react";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

// Lazy load pages for code splitting and better performance
const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Users = lazy(() => import("./pages/Users"));
const Organizations = lazy(() => import("./pages/Organizations"));
const LiveTraffic = lazy(() => import("./pages/LiveTraffic"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Detection = lazy(() => import("./pages/Detection"));
const Network = lazy(() => import("./pages/Network"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Security = lazy(() => import("./pages/Security"));
const Compliance = lazy(() => import("./pages/Compliance"));

// Optimized QueryClient with caching and stale time for better performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <NotificationProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-screen">
                <LoadingSkeleton lines={5} showAvatar />
              </div>
            }>
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
            </Suspense>
          </BrowserRouter>
        </NotificationProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
