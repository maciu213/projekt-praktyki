import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
function Card(props){
    return(
        <div className="Card bg-slate-500 p-6">
            <div className="text-lg">{ props.title }</div>
            <div className="text-sm">{ props.description }</div>
        </div>
    );
}

export default Card;