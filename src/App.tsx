import './App.css'

import Router from './Routes/Router';

import GoBackButton from './Routes/GoBackButton';

function App() {
  return (
    <div className='App'>
      <div className='title '>
        <a className='d-flex justify-content-center align-items-center p-2 link-no-decoration' href="/">
          <img src="https://s39331.pcdn.co/wp-content/themes/bhub/assets/images/logos/logo-bhub.svg" alt="BHub" title="BHub"
              width="120" height="33" data-src="https://s39331.pcdn.co/wp-content/themes/bhub/assets/images/logos/logo-bhub.svg" decoding="async" className="lazyloaded"/>
          <h2 className='m-0 ms-3 align-self-center'>Clients</h2>
        </a>
      </div>
     <Router />
    </div>
  );
}

export default App;
