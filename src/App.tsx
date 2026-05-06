import { RouterProvider } from 'react-router-dom';
import { router } from './lib/router/router';
import Providers from './components/providers/app';

function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}

export default App;
