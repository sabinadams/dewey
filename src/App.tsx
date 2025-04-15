import { HashRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import "./App.css";

const Home = lazy(() => import('./pages/index'));

function App() {
  return (
    <HashRouter>
      <main className="bg-white rounded-2xl w-full h-full min-h-screen">
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
    </HashRouter>
  );
}

export default App;
