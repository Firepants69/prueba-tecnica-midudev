import { type User } from '../types.d'

interface Props {
    showColors: boolean,
    users: User[]
};

export function UsersList({ showColors, users }: Props) {

    return (
        <table width={"100%"}>
            <thead>
                <tr>
                    <th>Foto </th>
                    <th>Nombre </th>
                    <th> Apellido</th>
                    <th> País</th>
                    <th> Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index) => {
                        const backGroundColor = index % 2 == 0 ? "#333" : "#555";
                        const color = showColors ? backGroundColor : "transparent";
                        return (
                            <tr key={user.email}
                                style={{ backgroundColor: color }}
                            >
                                <td>
                                    <img src={user.picture.medium} />
                                </td>
                                <td>
                                    {user.name.first}
                                </td>
                                <td>
                                    {user.name.last}
                                </td>
                                <td>
                                    {user.location.country}
                                </td>
                                <td>
                                    <button>Borrar</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}


// talbe, thread, tbody <--- Son la clave
// tr -> 