import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import GlobalStyle from './style';
import { getContacts } from './helpers/api';
import IContact from './interfaces/IContact';
import Table from './components/Table';
import LoaderComponent from './components/Loader';

function App() {
  const [contacts, setContacts] = useState([] as IContact[]);
  const [loading, setLoading] = useState(false);

  const updateList = async () => {
    setLoading(true);
    const result = await getContacts();
    setContacts(result);
    setLoading(false);
  };

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
      {
        loading && (
          <LoaderComponent />
        )
      }
      <Header updateList={updateList} />
      <Table contacts={contacts} updateList={updateList} />
    </div>
  );
}

export default App;
