import React from 'react';
import './App.css';
import GlobalStyle from './style';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <header>Contact List</header>
      <table>
        <thead>
          <tr>
            <th>Contato</th>
            <th>Telefone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Braien</td>
            <td>+5522992444720</td>
            <td>braienmp@outlook.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
