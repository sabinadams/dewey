import { HashRouter, useRoutes } from 'react-router-dom';
import { Suspense } from 'react';
import routes from '~react-pages';
import "./App.css";

function Routes() {
  const element = useRoutes(routes);
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      {element}
    </Suspense>
  );
}

function App() {
  return (
    <HashRouter>
      <main className="bg-white rounded-xl w-full h-full min-h-screen">
        <Routes />
      </main>
    </HashRouter>
  );
}

export default App;
