import Banner from './Banner';
import Menu from './Menu';
import { useState } from 'react'

function App() {
  const [showMenu, setshowMenu] = useState(false);

  function toggleMenu() {
    setshowMenu(!showMenu)
  }

  return (
    <div className="App">
      { showMenu && <Menu toggleMenu={toggleMenu}/> }
      <Banner toggleMenu={toggleMenu}/>
    </div>
  );
}

export default App;
