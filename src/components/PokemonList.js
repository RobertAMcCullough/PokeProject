import {useState} from 'react'
import {Link} from 'react-router-dom'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'


export default props => {
    //current page is stored in state
    //props.location.state is used when navigating from pokemon detail page back to the list, so that you go back to the place on the list that you were before
    const [page, setPage] = useState(props.location.state ? props.location.state.page : 0)

    //path to pass to query
    const path = `"?offset=${10*page}&limit=10"`

    //graphQL query - return an array of pokemon objects that contain name and url
    //@type is required for nested data
    const getAllPokemon = gql`
        query getAllPokemon {
            AllPokemon @rest(type: "AllPokemon", path: ${path}) {
                results @type(name: "results") {
                    name
                    url
                }
            }
        }
`
    //renders the list of 10 pokemon returned from the query, links go to detail page
    const renderList = list => {
        return(
            <ul className="list-group" style={{width:'400px'}}>
                {list.map((el,ind)=>{
                    return(
                        <li className="list-group-item" key={ind}><Link style={{color:"black"}} to={`pokemon/${ind+1+page*10}`}>{ind+1+page*10}. {el.name}</Link></li>
                    )
                })}
            </ul>
        )
    }

    //renders the pagination links. onClick handlers won't go below page zero or past page 111 (the last page of pokemon). The 'next' property could also be queried from the api to dyanamically determine if the end of the list has been reached (when next = null)
    const renderPagination = () => {
        return(
            <nav className='mt-3'>
                <ul className="pagination">
                    <li className="page-item page-link" onClick={()=>page === 0 ? null : setPage(page-1)}>Previous</li>
                    <li className="page-item page-link" onClick={()=>page >= 111 ? null: setPage(page+1)}>Next</li>
                </ul>
            </nav>
        )
    }

    return(
        //fetchPolicy='no-chache' causes query to execute after state (page number) changes
        //The Query component wraps everything else, this is how the ApolloProvider in index.js connects to this component, similarly to a context provider and consumer
        <Query fetchPolicy='no-cache' query={getAllPokemon}>
            {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            if (data) {
                return(
                    <div className='d-flex flex-column align-items-center'>
                        {renderList(data.AllPokemon.results)}
                        {renderPagination()}
                    </div>
                )
            }
            }}
        </Query>
    )
}
