// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import NewSdkDemo from './NewSdkDemo';
import PreviousSdkDemo from './PreviousSdkDemo';

import { Route, Routes, Link } from 'react-router-dom';

export function App() {
  // setup routes for the new SDK demo and the previous SDK demo
  // with links to each

  return (
    <div>
      <h1>React App</h1>
      <nav>
        <ul>
          <li>
            <Link to="/new">New SDK Demo</Link>
          </li>
          <li>
            <Link to="/previous">Previous SDK Demo</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/new" element={<NewSdkDemo />} />
        <Route path="/previous" element={<PreviousSdkDemo />} />
      </Routes>
    </div>
  );
}

export default App;
