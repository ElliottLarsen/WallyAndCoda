export default function Login() {
    return (
        <form action="/login" method="POST">
            <p>
                <label htmlFor="username">Username: </label>
                <input id="username" type="text" placeholder="username" required />
            </p>
            <p>
                <label htmlFor="password">Password: </label>
                <input id="password" type="password" placeholder="password" required />
            </p>
            <input type="submit" value="Login" />
        </form>
    )
}