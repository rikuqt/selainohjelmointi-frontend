import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({filter, handleFilterChange}) => {
  return (
    <form>
      <div> Filter shown with <input value={filter} onChange={handleFilterChange} />
       </div>
       </form>
  )
}

const PersonForm = ({addName, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addName}>
    <div>Name: <input value={newName} string={newName}
    onChange={handleNameChange}/>
    </div>

    <div>Number: <input value={newNumber}
    onChange={handleNumberChange}/>
    </div>

    <button type="submit">add</button>
</form>
  )
}

const Persons = ({person}) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])
  
  const addName = (event) => {
    event.preventDefault()

    if (newName==='' || newNumber==='') {
      alert(`Fill form fully!`)
    } else if (persons.find((same) => same.name=== newName)){
      alert(`${newName} is already added to phonebook`)
      console.log('else if')
    } else {
        const personObject = {
        name: newName,
        number: newNumber,
        id: String(persons.length + 1)
      }
        axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        console.log(response)
      })
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      console.log(persons)
  }
}


  const handleNameChange = (event) => {
    console.log(event.target.value, 'nimi')
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value, 'numero')
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value, ('filtteri'))
    
    setNewFilter(event.target.value)
  }

  const personsToShow = newFilter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      )
    : persons


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
          <Persons key={person.id} person={person} />
        )}
      </ul>
    </div>
  )

}

export default App