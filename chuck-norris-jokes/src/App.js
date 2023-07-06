import './App.css';
import React, { useEffect, useState } from 'react';

function Modal({ joke, closeModal }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <p className="modal-joke">{joke}</p>
      </div>
    </div>
  );
}

function App() {
  const [buttons, setButtons] = useState([]);
  const [joke, setJoke] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const url = 'https://api.chucknorris.io/jokes/categories';

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setButtons(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  const getJoke = async (category) => {
    const url = `https://api.chucknorris.io/jokes/random?category=${category}`;
    try {
      const response = await fetch(url);
      const json = await response.json();
      setJoke(json);
      setShowModal(true);
    } catch (error) {
      console.log("error", error);
    }
  }

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p className='title'>Chuck Norris</p>

        <div className="btn-wrapper">
          {buttons.map((item) => (
            <button
              key={item}
              className="btn"
              onClick={() => getJoke(item)}
            >
              {item}
              <p className='btn__txt'>Unlimited jokes on {item}</p>
            </button>
          ))}
        </div>

        {showModal && (
          <Modal joke={joke.value} closeModal={closeModal} />
        )}
      </header>
    </div>
  );
}

export default App;
