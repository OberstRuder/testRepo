import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { CRouting } from './components/routing';
import { CHeader } from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <CHeader />
      <CRouting />
    </BrowserRouter>
  );
}

export default App;
