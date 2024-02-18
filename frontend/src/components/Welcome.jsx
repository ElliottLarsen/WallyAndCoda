import '../styles/welcome.css';
import whippet from '../assets/whippet2.jpg'

export default function Welcome() {
    return (
        <>
            <div className='flex-container'>
                <div className='square brown'>
                    <h1>Welcome!</h1>
                    <h2>Please register or login</h2>
                </div>
                <div className='square white'>
                    <img src={whippet} alt="Whippet picture" />
                    <a href="https://www.vecteezy.com/free-vector/whippet">Whippet Vectors by Vecteezy</a>
                </div>
            </div>
        </>
    )
}