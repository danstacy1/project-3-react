import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import RecActivityForm from "../shared/RecActivityForm";
import { createActivity } from "../../api/activities";
import axios from 'axios'

const NewRecActivityModal = (props) => {
  const { user, destination, show, handleClose, msgAlert, triggerRefresh } =
    props;
  console.log(props);
  const [activity, setActivity] = useState({});

  // console.log('destination in edit modal', destination)

  // const handleChange = (e) => {
  //     setActivity(prevActivity => {
  //         let value = e.target.value
  //         let name = e.target.name
  //         console.log(value)
  //         // console.log('this is the input type', e.target.type)

  //         const updatedActivity = {
  //             [name]: value
  //         }
  //         return {
  //             ...prevActivity,
  //             ...updatedActivity
  //         }
  //     })
  // }

  // let complete = {
  //     name: props.activity.poi.name,
  //     address: props.activity.address.freeformAddress

  // }

  const handleSubmit = async (e) => {
    // e equals the event
    e.preventDefault();
    console.log(props.activity);
    let imageSearchId = await axios.get(`https://api.unsplash.com/search/photos?query=${props.activity.name}&client_id=QJzcjsf5p0Yo-yCWtDRNhN9Picgt8P0Bc4W9N_O9o0k
    `);
    console.log('this is the image response', imageSearchId)
    props.activity.images = imageSearchId.data.results[0].urls.full
    createActivity(user, destination._id, props.activity)
      // if we're successful in the modal, we want the modal to close

      // send a success message to the user
      //first callback is success message, second is error message
      .then(
        () => {
          msgAlert({
            heading: "Oh Yeah!",
            message: "Great! This will be fun!",
            variant: "success",
          });
        },
        () =>
          msgAlert({
            heading: "Oh No!",
            message: "Something went wrong, please try again",
            variant: "danger",
          })
      )
      .then(() => handleClose())
      .then(() => triggerRefresh());

  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton />
      <Modal.Body>
        <RecActivityForm
          activity={props.activity}
          handleChange={props.handleChange}
          handleSubmit={handleSubmit}
          heading="Plan Something To Do!"
        />
      </Modal.Body>
    </Modal>
  );
};

export default NewRecActivityModal;
