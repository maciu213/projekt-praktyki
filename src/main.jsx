import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

function App() {
  return (
    <div className="flex flex-col items-center">
      <div className="header">
          <h1>To-do-list</h1>
      </div>
      <div onClick={() => handleClick('Dodaj zadanie')} className="add">
        Dodaj zadanie
      </div>

      {/* Tabela */}
      <table>
        <tbody>
          <tr>
            <th onClick={() => handleClick('Zadania')} className="clickable">Zadania</th>
            <th onClick={() => handleClick('Data utworzenia')} className="clickable">Data utworzenia</th>
            <th onClick={() => handleClick('Termin oddania')} className="clickable">Termin oddania</th>
          </tr>
          <tr>
            <td>*nazwa zadania*</td>
            <td>*data_utworzenia*</td>
            <td>*termin_oddania*</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

