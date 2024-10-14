import { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'
const baseUrl = 'https://selainohjelmointi-backend-harkka.onrender.com/api/tyot'

const Filtteri = ({ filter, handleFiltteriChange }) => {
  return (
    <form>
      <div> Työ filtteri: <input value={filter} onChange={handleFiltteriChange} /></div>
    </form>
  )
}

const TyoForm = ({ addTyo, newTyoNimi, handleTyoNimiChange, newTyonKuvaus, handleTyonKuvausChange, newPaivanmaara, handlePaivanmaaraChange }) => {
  return (
    <form onSubmit={addTyo}>
      <div>Työ: <input value={newTyoNimi} onChange={handleTyoNimiChange} /></div>
      <div>Työn kuvaus: <input value={newTyonKuvaus} onChange={handleTyonKuvausChange} /></div>
      <div>Milloin pitää olla valmis: <input type="date" value={newPaivanmaara} onChange={handlePaivanmaaraChange} /></div>
      <button classNimi='buttonLisaa' type="submit">lisää</button>
    </form>
  )
}

const Tyot = ({ tyo, del }) => {
  return (
    <table>
      <tr>
      <td><strong>{tyo.nimi}</strong>: {tyo.tyonkuvaus} (Päivänmäärä: {tyo.paivanmaara})</td>
      <td><button onClick={() => del(tyo.id)}>poista</button></td>
      </tr>
    </table>
  )
}

const App = () => {
  const [tyot, setTyot] = useState([])
  const [newTyoNimi, setNewTyoNimi] = useState('')
  const [newTyonKuvaus, setNewTyonKuvaus] = useState('')
  const [newPaivanmaara, setNewPaivanmaara] = useState('')
  const [newFiltteri, setNewFiltteri] = useState('')

  const hook = () => {
    axios
      .get(baseUrl)
      .then(response => {
        console.log('Data haettu')
        setTyot(response.data)
      })
  }

  useEffect(hook, [])

  const addTyo = (event) => {
    event.preventDefault()

    if (newTyoNimi === '' || newTyonKuvaus === '' || newPaivanmaara === '') {
      alert('Täytä kaikki kentät, kiitos!')
    } else if (tyot.find((same) => same.nimi === newTyoNimi)) {
      alert(`${newTyoNimi} on jo sinun työlistassa`)
    } else {
      const tyoObject = {
        nimi: newTyoNimi,
        tyonkuvaus: newTyonKuvaus,
        paivanmaara: newPaivanmaara
      }
      axios
        .post(baseUrl, tyoObject)
        .then(response => {
          setTyot(tyot.concat(response.data))
          console.log('Data lähetetty')
        })
      setNewTyoNimi('')
      setNewTyonKuvaus('')
      setNewPaivanmaara('')
    }
  }

  const handleTyoNimiChange = (event) => {
    console.log(event.target.value, ('työ kenttä'))
    setNewTyoNimi(event.target.value)
  }
  
  const handleTyonKuvausChange = (event) => setNewTyonKuvaus(event.target.value)
  const handlePaivanmaaraChange = (event) => setNewPaivanmaara(event.target.value)
  const handleFiltteriChange = (event) => setNewFiltteri(event.target.value)

  const handleDelete = (id) => {
    if (window.confirm('Haluatko varmasti poistaa tämän työn?')) {
      axios
        .delete(`${baseUrl}/${id}`)
        .then(() => setTyot(tyot.filter(tyo => tyo.id !== id)))
    }
  }

  const tyotToShow = newFiltteri
    ? tyot.filter((tyo) =>
        tyo.nimi.toLowerCase().includes(newFiltteri.toLowerCase())
      )
    : tyot

  return (
    <div>
      <h1>Työlista</h1>
      <Filtteri filter={newFiltteri} handleFiltteriChange={handleFiltteriChange} />
      <h1>Luo uusi työ</h1>
      <TyoForm
        addTyo={addTyo}
        newTyoNimi={newTyoNimi}
        handleTyoNimiChange={handleTyoNimiChange}
        newTyonKuvaus={newTyonKuvaus}
        handleTyonKuvausChange={handleTyonKuvausChange}
        newPaivanmaara={newPaivanmaara}
        handlePaivanmaaraChange={handlePaivanmaaraChange}
      />
      <h1>Työt</h1>
      <ul>
        {tyotToShow.map(tyo =>
          <Tyot key={tyo.id} tyo={tyo} del={handleDelete} />
        )}
      </ul>
    </div>
  )
}

export default App
