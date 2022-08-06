import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import DestinationForm from '../shared/DestinationForm';
import { updateDestinationSuccess, updateDestinationFailure } from '../shared/AutoDismissAlert/messages'

const EditDestinationModal = (props) => {
    const { user, show, handleClose, updateDestination, msgAlert, triggerRefresh } = props

    const [destination, setDestination] = useState(props.destination)
    
    console.log('destination in edit model', destination)
    
    const handleChange = (e) => {
        setDestination((prevDestination) => {
          let updatedValue = e.target.value;
          const updatedName = e.target.name;
          console.log('this is the input type', e.target.type);

          const updatedDestination = {
            [updatedName]: updatedValue,
          };
          return {
            ...prevDestination,
            ...updatedDestination,
          };
        });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        
        updateDestination(user, destination)
        .then(() => handleClose())
          .then(() =>
            msgAlert({
              heading: "oh yea!",
              message: updateDestinationSuccess,
              variant: "success",
            })
          )
          .then(() => triggerRefresh())
          .catch(() =>
            msgAlert({
              heading: "oh no!",
              message: updateDestinationFailure,
              variant: "danger",
            })
          );
      };



  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>
            <DestinationForm 
            destination={destination}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            heading="Update Destination"
            />
        </Modal.Body>
    </Modal>
  )
}

export default EditDestinationModal