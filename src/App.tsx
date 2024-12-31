
import { useEffect, useState } from 'react'
import './App.css'
import { type User } from './types.d';
import { UsersList } from './components/UserList';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState<boolean>(false);

  const toggleColors = () => {
    setShowColors(prev => !prev);
  }

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
      })
      .catch(err => console.error(err))
  }, []);

  return (
    <div>
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={toggleColors}>
          Colorear filas
        </button>
      </header>

      <main>
        <UsersList showColors={showColors} users={users} />
      </main>
    </div>
  )
}

export default App
