import {Link} from 'react-router-dom'

export default () => {
    return(
        <div className='jumbotron text-center' style={{height:'50vh'}}>
            <h1 className='display-3 mb-5'>Welcome to The PokeProject</h1>
            <Link to='/pokemon'><h3>Click here to see Pokemon</h3></Link>
        </div>
    )
}