import {useState} from "react";
import logo from "../logo.svg";

export const OldPage = () => {
    const [count, setCount] = useState(0);
    async function handleClick(){
        let rez = count + 1;
        setCount(rez);
        if(rez === 10) alert("Ахуеееть, уже 10 !!!");
        if(rez === 20) alert("Ахуеееть, уже 20 !!!");
    }
    return(
        <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="d-flex justify-content-between">
          <Btn count={count} handleClick={handleClick}/>
          <Btn count={count} handleClick={handleClick}/>
        </div>
        <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    );

    function Btn({count, handleClick}){
        return(
            <button onClick={handleClick} style={{background: "red", fontSize: 20}}>Clicked {count} times</button>
        );
    }
}