import { useState } from 'react'
import { createDestination } from '../../api/destinations'
import { useNavigate } from 'react-router-dom'
import { createDestinationSuccess, createDestinationFailure } from '../shared/AutoDismissAlert/messages'
import DestinationForm from '../shared/DestinationForm'
import axios from 'axios'

const CreateDestination = (props) => {
    //console.log('these are the props in createDestination\n', props)
    const { user, msgAlert } = props

    const navigate = useNavigate()

    const [destination, setDestination] = useState({
        name: '',
        schedule: '',
    })

    //console.log('this is destination in createDestination', destination)

    const handleChange = (e) => {
        setDestination(prevDestination => {
            let updatedValue = e.target.value
            const updatedName = e.target.name

            //console.log('this is the input type', e.target.type)

            const updatedDestination = {
                [updatedName]: updatedValue
            }
            return {
                ...prevDestination,
                ...updatedDestination
            }
        })
    }

    // We'll add a handleSubmit here that makes an api request, then handles the response

    const handleSubmit = async (e) => {
        e.preventDefault();
        let testing = await axios.get(`https://api.opentripmap.com/0.1/en/places/geoname?name=${destination.name}&apikey=5ae2e3f221c38a28845f05b6ee69c6dabf1a1c065bbb25f00387dbd9`)
        console.log('testing', testing.data)
        destination.lat = testing.data.lat
        destination.lon = testing.data.lon
        destination.population = testing.data.population
        console.log(destination)
        createDestination(user, destination)
        .then(res => {
            navigate(`/destinations/${res.data.destination._id}`)})
          .then(() =>
            msgAlert({
              heading: "oh yea!",
              message: createDestinationSuccess,
              variant: "success",
            })
          )
          .catch(() =>
            msgAlert({
              heading: "oh no!",
              message: createDestinationFailure,
              variant: "danger",
            })
          );
      };

    return (
        <DestinationForm 
            destination={ destination } 
            handleChange={ handleChange }
            handleSubmit={ handleSubmit }
            heading="Add a new destination!"
        />
    )
}

export default CreateDestination