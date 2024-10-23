import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Hero from "./Pages/Hero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Quiz from "./Pages/Quiz";
import Settings from "./Pages/Settings";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="settings" element={<Settings />} />
          <Route path="quiz" element={<Quiz />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
