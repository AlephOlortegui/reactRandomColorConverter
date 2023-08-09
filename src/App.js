// you can import the whole pack.
import 'bootstrap-icons/font/bootstrap-icons.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Nav from './Comp/Nav';
import Home from './Comp/Home';
import NotFound from './Comp/NotFound';
import Random from './Comp/Random';
import Switch from './Comp/Switch';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-theme">
          <Nav />
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/random' element={<Random />}/>
              <Route path='/switch' element={<Switch />}/>
              <Route path='*' element={<NotFound />} />
            </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
