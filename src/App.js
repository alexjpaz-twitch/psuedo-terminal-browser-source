import React from 'react';

import './App.css'
import 'xterm/css/xterm.css'
import { Terminal } from 'xterm';

import { useEffect } from 'react';
import TerminalFaker from './TerminalFaker';

function Term() {
  const terminalRef = React.useRef();


  useEffect(() => {

    if(process.env.NODE_ENV === "test") return;

    const node = terminalRef.current;

    const params = new URLSearchParams(window.location.hash.replace("#?",""));
console.log(params.keys, window.location.hash)
    let term = new Terminal({
      fontSize: params.get("term.fontSize") || 24,
      fontFamily: "Source Code Pro",
      cursorBlink: true,
      cursorStyle: "block",
      rows: params.get("term.rows") || 34,
      cols: params.get("term.cols") || 84
    });

    term.open(node);

    const terminalFaker = new TerminalFaker(term);

    terminalFaker.start();

    return () => {
      term.dispose();
      terminalFaker.stop();
    };

  }, [ terminalRef ]);

  return (
    <div ref={terminalRef}></div>
  );
}

function App() {

  

  return (
    <div className="App">
      <Term></Term>
    </div>
  );
}

export default App;
