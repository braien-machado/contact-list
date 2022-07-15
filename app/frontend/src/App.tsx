import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import GlobalStyle from './style';
import { getContacts } from './helpers/api';
import IContact from './interfaces/IContact';
import Table from './components/Table';

function App() {
  const [contacts, setContacts] = useState([] as IContact[]);

  useEffect(() => {
    async function fetchApi() {
      const result = await getContacts();
      setContacts(result);
    }
    fetchApi();
  }, []);

  return (
    <div className="App">
      <GlobalStyle />
      <Header />
      <Table contacts={contacts} />
    </div>
  );
}

export default App;
