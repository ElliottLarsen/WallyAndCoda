export default function UserDisplay({ currentUser }) {
    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <th>Username</th>
                        <td>{currentUser.username}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{currentUser.email}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td>{currentUser.first_name} {currentUser.last_name}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}