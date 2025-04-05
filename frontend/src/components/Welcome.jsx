// import '../styles/welcome.css';
import whippet from '../assets/whippet2.jpg'

export default function Welcome() {
    return (
        <>
            <div className='flex-container'>
                <div className='square brown'>
                    <hr />
                    <h1>Welcome!</h1>
                    <hr />
                </div>
                <div className='square white'>
                    <img src={whippet} alt="Whippet picture" />
                </div>
            </div>
        </>
    )
}