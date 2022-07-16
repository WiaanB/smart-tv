import { useState } from 'react';
import Banner from './Banner';
import Menu from './Menu';
import Display from './Display';

function App() {
  const [showMenu, setshowMenu] = useState(false);
  const [topic, setTopic] = useState({ id: "bo8jQKTaE0Y" });

  function toggleMenu() {
    setshowMenu(!showMenu)
  }

  function topicSelected(newTopic) {
    setTopic(newTopic)
    toggleMenu()
  }

  return (
    <div className="App">
      {showMenu && <Menu toggleMenu={toggleMenu} changeTopic={topicSelected} />}
      <Banner toggleMenu={toggleMenu} />
      <Display topic={topic} showNav={showMenu} />
    </div>
  );
}

export default App;
