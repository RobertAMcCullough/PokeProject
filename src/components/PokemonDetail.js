import {Link} from 'react-router-dom'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'

//renders a pokemon detail card using Bootstrap classes
const renderDetails = pokemon => {
    //creates a string of "abilities" that pokemon possesses
    const renderAbilities = () => {
        let str = ''
        pokemon.abilities.forEach((el,ind)=>{
            ind === 0 ? str = el.ability.name : str = str + `, ${el.ability.name}`
        })

        return str
    }

    //renders the card
    return(
        <div className='card' style={{width:'24rem'}}>
            <div className='card-body'>
                <h5 className="card-title pb-3" style={{textTransform:'capitalize'}}>{pokemon.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted" style={{textTransform:'capitalize'}}>Abilities: {renderAbilities()}</h6>
                <p className="card-text">Height: {pokemon.height}</p>
                <p className="card-text">Weight: {pokemon.weight}</p>
                <p className="card-text">Base Experience: {pokemon.base_experience}</p>
            </div>
        </div>
    )
}

export default (props) => {
    //pokemon ids jump from 898 to 10001, this will cause issues if someone tries to manually navigate to pokemon 950 for instance

    //id param comes from react router, this is passed to the graphQL query
    const idString = `"${props.match.params.id}"`

    //page to redirect to on "back" button - there will be issues above pokemon 898, so it will redirect to page 89 in that case
    const redirectPage = props.match.params.id >=898 ? 89 : Math.floor((props.match.params.id - 1)/10)

    //graphQL query will return name, experience, weight, height, and abiliites of a single pokemon
    //@type is required for nested data
    const getPokemon = gql`
        query getPokemon {
        pokemon @rest(type: "Pokemon", path: ${idString}) {
            name
            base_experience
            weight
            height
            abilities @type(name: "abilities") {
                ability @type(name: "ability") {
                    name
                }
            }
        }
    }
    `
    return(
        //fetchPolicy='no-chache' causes query to execute after state (page number) changes
        //The Query component wraps everything else, this is how the ApolloProvider in index.js connects to this component, similarly to a context provider and consumer
        <Query fetchPolicy='no-cache' query={getPokemon}>
            {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            if (data) {
                //prevents error if user manually navigates to pokemon that does not exist
                if(!data.pokemon) return(<div>That pokemon does not exist</div>)
                return (
                    <div className='d-flex flex-column align-items-center mt-5'>
                        {renderDetails(data.pokemon)}
                        <Link className='mt-3 page-item page-link' to={{pathname: '/pokemon',state: {page: redirectPage}}}>Back</Link>
                    </div>
                )
            }
            }}
        </Query>
    )
}
