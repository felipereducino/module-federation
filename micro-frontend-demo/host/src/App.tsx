import { Suspense, lazy } from "react";
import "./App.css";

// Lazy load the remote components
const Header = lazy(() => import("remote1/Header"));
const Table = lazy(() => import("remote2/Table"));

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Suspense
        fallback={<div className="text-center p-4">Loading Header...</div>}
      >
        <Header />
      </Suspense>

      <main className="py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            Welcome to Module Federation Demo
          </h1>

          <Suspense
            fallback={<div className="text-center p-4">Loading Table...</div>}
          >
            <Table />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

export default App;
