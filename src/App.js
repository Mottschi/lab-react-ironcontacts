// src/App.js
import { useState } from "react";
import "./App.css";
import allContacts from "./contacts.json";

function App() {
  const [contacts, setContacts] = useState(allContacts.slice(0, 5))

  function handleAddRandomContact() {
    console.log('adding new contact')
    const alreadyVisibleContactIDs = new Set(contacts.map(contact => contact.id));
    const choices = allContacts.filter(contact => !alreadyVisibleContactIDs.has(contact.id));

    if (!choices.length) return alert('No more choices available');

    const newContact = choices[Math.floor(Math.random() * choices.length)];
    setContacts([...contacts, newContact]);
  }

  function handleSortByPopularity() {
    const contactsCopy = [...contacts];
    contactsCopy.sort((a, b) => b.popularity - a.popularity);
    setContacts(contactsCopy)
  }

  function handleSortByName() {
    const contactsCopy = [...contacts];
    contactsCopy.sort((a, b) =>  a.name.localeCompare(b.name));
    setContacts(contactsCopy)
  }

  function createHandlerDeleteContact(id){
    function deleteContact() {
      setContacts(contacts.filter(contact => contact.id !== id))
    }

    return deleteContact
  }

  return <div className="App">
    <h1>IronContacts</h1>
    <button onClick={handleAddRandomContact}>Add Random Contact</button>
    <button onClick={handleSortByPopularity}>Sort by popularity</button>
    <button onClick={handleSortByName}>Sort by name</button>
    <table>
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won an Oscar</th>
          <th>Won an Emmy</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map(contact => (<tr key={contact.id} className={'contact' + (contact.popularity > 12 && ' superstar')}>
          <td><img src={contact.pictureUrl} alt="" className="contact-picture"/></td>
          <td>{contact.name}</td>
          <td>{contact.popularity}</td>
          <td>{contact.wonOscar && <img src='./oscar.png' alt='Oscar' className='trophy'/>}</td>
          <td>{contact.wonEmmy && <img src='./emmy.png' alt='Emmy'  className='trophy'/>}</td>

          {/* Note: I am aware that the below can also be done by arrow function - just wanted to try it with a closure
              since we haven't touched on them much, if at all (I think they were only mentioned in the self guided lesson) */}
          <td><button onClick={createHandlerDeleteContact(contact.id)}>Delete</button></td>
        </tr>))}
      </tbody>
    </table>

  </div>;
}
export default App;