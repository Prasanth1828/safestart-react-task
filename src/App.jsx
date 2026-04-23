import { RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import AppRouter from './routes/AppRouter';
import ToasterConfig from './components/ui/ToasterConfig';
import ErrorFallback from './components/ui/ErrorFallback';

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.href = '/'}
    >
      <ToasterConfig />
      <RouterProvider router={AppRouter} />
    </ErrorBoundary>
  );
}

export default App;
