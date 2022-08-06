import { 
    useState, 
    useEffect 
} from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from "react-router-dom";
import LoadingScreen from '../shared/LoadingScreen'
import {
    getAllDestinations,
    getOneDestination,
    updateDestination,
    removeDestination,
  } from "../../api/destinations";
import messages from '../shared/AutoDismissAlert/messages'
import '../../style.css'
import EditDestinationModal from "./EditDestinationModal";




// style for our card container
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const DestinationsIndex = (props) => {
    const [destinations, setDestinations] = useState(null)
    const [destination, setDestination] = useState(null);
    const [error, setError] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false);
    const [updated, setUpdated] = useState(false);

    const { id } = useParams()
    const navigate = useNavigate()
    // const { msgAlert } = props

    console.log('Props in DestinationsIndex', props)
   

    useEffect(() => {
        console.log(props)
        getAllDestinations(id)
            .then(res => setDestinations(res.data.destinations))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting destinations',
                    message: messages.getDestinationsFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [destination])


    
    const { user, msgAlert } = props;
    console.log("user in props", user);
    // destructuring to get the id value from our route parameters
    

    // If snowboards haven't been loaded yet, show a loading message
    if (!destinations) {
        return <LoadingScreen />
    } else if (destinations.length === 0) {
        return <p>No destinations yet. Better add some.</p>
    }
    const removeTheDestination = (yuh) => {
        console.log(yuh)
        removeDestination(user, yuh)
          // on success send a success message
          .then(() => {
            msgAlert({
              heading: "Success",
              message: messages.removeDestinationSuccess,
              variant: "success",
            });
          })
          // then navigate to index
          .then((res) => {
              
  
          })
          // on failure send a failure message
          .catch((err) => {
            msgAlert({
              heading: "Error removing destination",
              message: messages.removeDestinationFailure,
              variant: "danger",
            });
          });
      };

    const destinationCards = destinations.map(destination => (
        <Card className="cards" style={{ width: '18rem', margin: '15px', borderRadius: '8px'}} key={ destination.id }>
            <Card.Img style={{borderRadius: '8px 8px 0 0'}}variant="top" src="https://images.unsplash.com/photo-1549041050-386c1c99d655?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bG9zJTIwYW5nZWxlcyUyMHNreWxpbmV8ZW58MHx8MHx8&w=1000&q=80" />
            <Card.Body style={{textAlign: 'center'}}>
            <Card.Title>{destination.name}</Card.Title>
                <Card.Text>
                    {destination.schedule}
                </Card.Text>
                    <Link to={`/destinations/${destination._id}`}><button type="button" class="btn btn-outline-dark" size="sm">View { destination.name }</button></Link>
                    {user && destination.owner === user._id ? (
              <>
                <Button
                  onClick={() => setEditModalShow(true)}
                  className="m-2"
                  variant="warning"
                  size="sm"
                >
                  Edit Destination
                </Button>
                <Button
                  onClick={() => removeTheDestination(destination._id)}
                  className="m-2"
                  variant="danger"
                >
                  Delete
                </Button>
              </>
            ) : null}
            </Card.Body>
    </Card>
))


//////////////////////////////////////////////////////////
// Not sure what this is
//////////////////////////////////////////////////////////
// const deleteAndEdit =()=>{
//     <Card.Footer>
//     <Button>Edit</Button>
// {/* {user &&  destination.owner === user._id ? ( */}
//     <>
//         <Button
//         onClick={() => setEditModalShow(true)}
//         className="m-2"
//         variant="warning"
//         >
//         Edit Destination
//         </Button>
//         <Button
//         onClick={() => removeTheDestination()}
//         className="m-2"
//         variant="danger"
        
//         >
//         Delete
//         </Button>
//     </>
// {/* ) : null}  */}
// </Card.Footer>
// }

    return (
        <div style={ cardContainerStyle }>
            { destinationCards }
            {/* { deleteAndEdit } */}
            <EditDestinationModal
                user={user}
                destination={destination}
                show={editModalShow}
                updateDestination={updateDestination}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)}
            />
        </div>
    )
}

export default DestinationsIndex