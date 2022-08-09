import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import DestinationForm from '../shared/DestinationForm';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function EditDestinationModal(props) {
    const { user, show, handleClose, updateDestination, msgAlert, triggerRefresh } = props

    const [destination, setDestination] = useState(props.destination)

    const navigate = useNavigate()

   
    const handleChange = (e) => {
        setDestination((prevDestination) => {
          let updatedValue = e.target.value;
          updatedValue = updatedValue.charAt(0).toUpperCase()+updatedValue.slice(1)
          const updatedName = e.target.name;
          console.log(e.target.type);

          const updatedDestination = {
            [updatedName]: updatedValue,
          };
          return {
            ...prevDestination,
            ...updatedDestination,
          };
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        let testing = await axios.get(`https://api.opentripmap.com/0.1/en/places/geoname?name=${destination.name}&apikey=5ae2e3f221c38a28845f05b6ee69c6dabf1a1c065bbb25f00387dbd9`)
        console.log('testing', testing)
        destination.lat = testing.data.lat
        destination.lon = testing.data.lon
        destination.population = testing.data.population
        console.log(destination)

        updateDestination(user, destination)
          .then(() => handleClose())
          .then(() =>
            msgAlert({
              heading: "oh yea!",
              message: "success",
              variant: "success",
            })
          )
          .then(() => triggerRefresh())
          .catch(() =>
            msgAlert({
              heading: "oh no!",
              message: "failure",
              variant: "danger",
            })
          );
      };

  return (
    <>
    
    <Modal show={show} onHide={handleClose}>
        {/* <Modal.Header closeButton />
        <Modal.Body> */}
            <DestinationForm 
            destination={destination}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            heading="Update Destination"
            />
        {/* </Modal.Body> */}
    </Modal>

    
    </>

  )
}

