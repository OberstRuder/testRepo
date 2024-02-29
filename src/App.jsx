import './App.css';
import { HashRouter } from 'react-router-dom';
import { CRouting } from './components/routing';
import { CHeader } from './components/Header';

function App() {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <CHeader />
      <CRouting />
    </HashRouter>
  );
}

export default App;
