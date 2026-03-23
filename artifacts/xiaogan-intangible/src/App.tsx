import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Pages
import Home from "@/pages/Home";
import Museum from "@/pages/Museum";
import Artisans from "@/pages/Artisans";
import Quiz from "@/pages/Quiz";
import Market from "@/pages/Market";
import AiStudio from "@/pages/AiStudio";
import Activities from "@/pages/Activities";
import Culture from "@/pages/Culture";
import HeritageDetail from "@/pages/HeritageDetail";
import NotFound from "@/pages/not-found";

// Layout
import MainLayout from "@/components/layout/MainLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function Router() {
  return (
    <MainLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/museum" component={Museum} />
        <Route path="/museum/:id" component={HeritageDetail} />
        <Route path="/artisans" component={Artisans} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/market" component={Market} />
        <Route path="/ai-studio" component={AiStudio} />
        <Route path="/activities" component={Activities} />
        <Route path="/culture" component={Culture} />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
