import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import LoadingScreen from "../shared/LoadingScreen";
import {
  getAllDestinations,
  getOneDestination,
  updateDestination,
  removeDestination,
} from "../../api/destinations";
import messages from "../shared/AutoDismissAlert/messages";
import "../../style.css";
import EditDestinationModal from "./EditDestinationModal";

// style for our card container
const cardContainerStyle = {
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "center",
  marginTop: '-3.5%'
};

const DestinationsIndex = (props) => {
  const [destinations, setDestinations] = useState(null);
  const [destination, setDestination] = useState(null);
  const [error, setError] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [updated, setUpdated] = useState(false);
  const { triggerRefresh } = props;

  //const { id } = useParams()
  const navigate = useNavigate();
  // const { msgAlert } = props

  console.log("Props in DestinationsIndex", props);

  useEffect(() => {
    console.log(props);
    getAllDestinations()
      .then((res) => setDestinations(res.data.destinations))
      .catch((err) => {
        msgAlert({
          heading: "Error Getting destinations",
          message: messages.getDestinationsFailure,
          variant: "danger",
        });
        setError(true);
      });
  }, []);

  const { user, msgAlert } = props;
  console.log("user in props", user);

  // If snowboards haven't been loaded yet, show a loading message
  if (!destinations) {
    return <LoadingScreen />;
  } else if (destinations.length === 0) {
    return <p>No destinations yet. Better add some.</p>;
  }
//   const removeTheDestination = (destId) => {
//     console.log(destId);
//     removeDestination(user, destId)
//       // on success send a success message
//       .then(() => {
//         msgAlert({
//           heading: "Success",
//           message: messages.removeDestinationSuccess,
//           variant: "success",
//         });
//       })
//       .then(() => getAllDestinations())
//       .then((res) => {
//         console.log(res);
//         return setDestinations(res.data.destinations);
//       })
//       .catch((err) => {
//         msgAlert({
//           heading: "Error removing destination",
//           message: messages.removeDestinationFailure,
//           variant: "danger",
//         });
//       });
//   };



  const destinationCards = destinations.map((destination) => (
    <Card
      className="cards"
      style={{ width: "18rem", margin: "15px", borderRadius: "8px",  }}
      key={destination.id}
    >
      <Card.Img
        style={{ borderRadius: "8px 8px 0 0", width:"17.90rem", height: "10rem" }}
        variant="top"
        src={destination.images}
      />
      <Card.Body style={{ textAlign: "center" }}>
        <Card.Title>{destination.name}</Card.Title>
        <Card.Text>{destination.schedule}</Card.Text>
        <Link to={`/destinations/${destination._id}`}>
          <button type="button" class="btn btn-outline-dark" size="sm">
            View {destination.name}
          </button>
        </Link>
        {/* {user && destination.owner === user._id ? (
          <>
            <Button
              onClick={() => {
                navigate(`/destinations/${destination._id}`)  
                setEditModalShow(true, destination)}}
              className="m-2"
              variant="warning"
              size="sm"
              destination={destination}
              key={destination._id}
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
            <EditDestinationModal
              user={user}
              destination={destination}
              key={destination._id}
              show={editModalShow}
              updateDestination={updateDestination}
              msgAlert={msgAlert}
              triggerRefresh={() => setUpdated((prev) => !prev)}
              handleClose={() => setEditModalShow(false)}
            />
          </>
        ) : null} */}
      </Card.Body>
    </Card>
  ));

  return <div style={cardContainerStyle}>{destinationCards}</div>;
};

export default DestinationsIndex;
