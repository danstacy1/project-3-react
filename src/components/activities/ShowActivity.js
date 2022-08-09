import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { Container, Card, Button } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneActivity, updateActivity, removeActivity } from '../../api/activities'
import messages from '../shared/AutoDismissAlert/messages'
import EditActivityModal from './EditActivityModal'
import {
    getOneDestination
  } from "../../api/destinations";
// import ShowActivity from "../activities/ShowActivity";

// we'll use a style object to lay out the activity cards
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'left',
}

const ShowActivity = (props) => {
    const [activity, setActivity] = useState(null)
    const [activityModalShow, setActivityModalShow] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)
    // const [destination, setDestination] = useState(null);

    const { destinationId, activityId } = useParams()
    console.log('this is the destinationId', destinationId)
    console.log('this is the activityId', activityId)
    const navigate = useNavigate()
    console.log('these are activity show props', props)
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to

    const { user, msgAlert, triggerRefresh } = props
    console.log('user in props', user)
    // console.log('the activity in showActivity', activity)
    // destructuring to get the id value from our route parameters

    useEffect(() => {
        getOneActivity(user, destinationId, activityId)
            .then(res => setActivity(res.data.activity))
            .catch(err => {                   
                msgAlert({
                    heading: 'Error getting activity',
                    message: messages.getActivityFailure,
                    variant: 'danger'
                })
                navigate(`/activities/${destinationId}/${activityId}`)
                //navigate back to the destinations page if there's an error fetching
            })
    }, [updated])

    // here we'll declare a function that runs which will remove the activity
    // this function's promise chain should send a message, and then go somewhere
    const removeTheActivity = () => {
        removeActivity(user, destinationId, activityId)
            // on success send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeActivitySuccess,
                    variant: 'success'
                })
            })
            // then navigate to index
            .then(() => {navigate (`/destinations/${destinationId}`)})
            // on failure send a failure message
            .catch(err => {                   
                msgAlert({
                    heading: 'Error removing activity',
                    message: messages.removeActivityFailure,
                    variant: 'danger'
                })
            })
    }

    if (!activity) {
        return <LoadingScreen />
    }

    let priorityLevel 
    if (activity.priority >= 75 ){
        priorityLevel = <h2>💯🥵🙌</h2>
    } else if (activity.priority >= 50){
        priorityLevel = <h2>👏😄💪</h2>
    } else if (activity.priority >= 25){
        priorityLevel = <h2>🤷‍♀️😮‍💨🤷</h2>
    } else {
        priorityLevel = <h2>🤦‍♀️👎🤦</h2>
    }

    // console.log('this is the destination.images', destination.images)

    return (
        <>
        <Container className="fluid" style={{marginTop: "8%"}}>
        <Card
          style={{ width: "30rem", zIndex: "2" }}
          className="mx-auto mt-4"
          id="card"
        >
          <Card.Img
            id="card-img"
            variant="top"
            style={{height: '15rem', objectFit: 'cover' }}
            src={activity.images}
          />
          <Card.Body>
            <Card.Text style={{paddingTop: '2%'}}>
              <h1 style={{textAlign:'center'}}>{activity.name}</h1>
            </Card.Text>
            <Card.Text style={{paddingBottom: '10%', paddingTop: '2%', width: '18rem', marginLeft: '22%'}}>
              <h5 style={cardContainerLayout} className='mb-4'>❓ When: {activity.schedule}</h5>
              <h5 style={cardContainerLayout} > 🚥 Priority level: { priorityLevel } </h5>
              <h5 style={cardContainerLayout}> 📍 Address: {activity.address}</h5>
            </Card.Text>
            <hr />
         

                        {
                            // user && activity.owner === user._id 
                            // ?
                            <>
                            <span style={{marginLeft: '25%'}}>
                                <Button onClick={() => setEditModalShow(true)} 
                                    className="m-2" 
                                    variant="outline-primary"
                                    size='sm'
                                >
                                    Edit Activity
                                </Button>
                                <Button onClick={() => removeTheActivity()}
                                    className="m-2"
                                    variant="outline-danger"
                                    size='sm'
                                >
                                    Delete Activity
                                </Button>
                            </span>
                            </>
                            //   :
                            //  null
                        }
                     </Card.Body>
                </Card> 
            </Container>
            {/* <Container style={cardContainerLayout}>
                {activityCards}
            </Container>  */}
            <EditActivityModal 
                user={user}
                activity={activity} 
                show={editModalShow} 
                destinationId={destinationId}
                updateActivity={updateActivity}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)} 
            />
        </>
    )
}

export default ShowActivity
// show={activityModalShow}
// handleClose={() => setActivityModalShow(false)} 