import React from 'react';
import './App.css';
import Dashboard from "../dashboard/Dashboard";
import Store from "../store/Store";

function App() {
    return (
        <Store>
            <Dashboard/>
        </Store>
    );
}

export default App;
