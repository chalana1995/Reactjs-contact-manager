import React, { useState, useEffect } from 'react';
import { uuid } from 'uuidv4';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';
//import api from '../api/contact';
import axios from 'axios';

function App() {

  const [contacts, setContacts] = useState([]);

  const LOCAL_STORAGE_KEY = "contacts"

  const retriveContacts = async() => {
    const response = await axios.get('http://localhost:3006/contacts');
    return response.data;
  }

  const addContactHandler = (contact) => {
    setContacts([...contacts, { id: uuid(), ...contact }])
  }

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    })

    setContacts(newContactList);
  }

  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // setContacts(retriveContacts)

    const getAllContacts = async() => {
      const allcontacts = await retriveContacts();
      if (allcontacts) {
        setContacts(allcontacts);
      }
    }
    getAllContacts();
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts])

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" render={(props) => (<ContactList {...props} contacts={contacts} getContactId={removeContactHandler} />)} />
          <Route exact path="/add" render={(props) => (<AddContact {...props} addContactHandler={addContactHandler} />)} />
          <Route exact path="/contact/:id" component={ContactDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
