import React, { useState, useEffect } from 'react';
import { uuid } from 'uuidv4';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';

function App() {

  const [contacts, setContacts] = useState([]);

  const LOCAL_STORAGE_KEY = "contacts"

  const addContactHandler = (contact) => {
    console.log("contacts appjs", contact);
    setContacts([...contacts, { id: uuid(), ...contact }])
  }

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    })

    setContacts(newContactList);
  }

  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    setContacts(retriveContacts)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts])

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={() => <ContactList contacts={contacts} getContactId={removeContactHandler}/> } />
          <Route exact path="/add" component={() => <AddContact addContactHandler={addContactHandler}/>} />
        </Switch>
        {/* <AddContact addContactHandler={addContactHandler} />
        <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}
      </Router>
    </div>
  );
}

export default App;
