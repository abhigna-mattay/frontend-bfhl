import React, { useEffect } from 'react';
import './App.css';
import Bfhlform from './components/Bfhlform';

function App() {
    useEffect(() => {
        document.title = 'AP21110010343'; // setting the doc title as my roll number
    }, []);

    return (
        <div className="App">
            <h1>BFHL APPLICATION</h1>
            <Bfhlform />
        </div>
    );
}

export default App;
