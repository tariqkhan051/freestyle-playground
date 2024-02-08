// doesn't work in TS directly
// import logo from './logo.svg';

import './App.css';

const logo: string = require("./logo.svg").default;

interface MyButtonProps {
  /** The text to display inside the button */
  title: string;
  /** Whether the button can be interacted with */
  disabled: boolean;
}

function ButtonWithProps({ title, disabled }: MyButtonProps) {
  return (
    <button disabled={disabled}>{title}</button>
  );
}

function MyButton( {title}: {title: string}) {
  return (
    <button>{title}</button>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to React Basics!
        </p>
        <MyButton title="A button to be pressed!"/> <br />
        <ButtonWithProps title="A button can't be pressed" disabled={true}/>
      </header>
    </div>
  );
}

export default App;
