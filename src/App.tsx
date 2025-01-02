
import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { SortBy, type User } from './types.d';
import { UsersList } from './components/UserList';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState<boolean>(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const originalUsers = useRef<User[]>([]);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  // -> guardar un valor para que se comparta entre renderizados
  // pero que al cambiar no vuelva a renderizar el componente

  const toggleColors = () => {
    setShowColors(prev => !prev);
  }

  const toggleSortByCountry = () => {
    const newSorting = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSorting);
  }

  const handleDelete = (email: string) => {
    const newUsers: User[] = users.filter((user) => user.email !== email);
    setUsers(newUsers);
  }

  const handleReset = () => {
    setUsers(originalUsers.current);
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  }

  useEffect(() => {
    fetch('https://randomuser.me/api?results=104')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results;
      })
      .catch(err => console.error(err))
  }, []);

  const filteredUsers = useMemo(() => {
    return filterCountry && filterCountry.length > 0
      ? users.filter(user => {
        return user.location.country.includes(filterCountry.toLocaleLowerCase())
      })
      : users
  }, [users, filterCountry])


  const sortedUser = useMemo(() => {
    if (sorting == SortBy.NONE) return filteredUsers;

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last

    }

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b));
    })
  }, [filteredUsers, sorting]);

  return (
    <div>
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={toggleColors}>
          Colorear filas
        </button>
        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY ? 'No ordenar por país' : 'Ordenar por país'}
        </button>
        <button
          onClick={handleReset}
        >
          Resetar estado
        </button>
        <input
          onChange={(e) => {
            setFilterCountry(e.target.value);
          }}
          placeholder='Filtra por país'
          type="text" />
      </header>

      <main>
        <UsersList
          changeSorting={handleChangeSort}
          deleteUser={handleDelete}
          showColors={showColors}
          users={sortedUser} />
      </main>
    </div>
  )
}

export default App
