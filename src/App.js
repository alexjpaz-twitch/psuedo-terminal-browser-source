import React from 'react';
import ReactDOM from 'react';

import 'xterm/css/xterm.css'
import { Terminal } from 'xterm';

import { useEffect } from 'react';
import TerminalFaker from './TerminalFaker';

function Term() {
  const terminalRef = React.useRef();

  const [ terminal, setTerminal ] = React.useState(null);

  useEffect(() => {

    if(terminal) return;

    const node = terminalRef.current;

    let term = new Terminal({
      cursorBlink: true,
      rows: 20,
      cols: 200
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
