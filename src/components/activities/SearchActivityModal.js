import React, { useState, useEffect } from "react";
import { DropdownButton, Modal } from "react-bootstrap";
import ActivityForm from "../shared/ActivityForm";
import { createActivity } from "../../api/activities";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import RecommendedList from "./RecommendedList";
import axios from "axios";
import NewRecActivityModal from "../activities/NewRecActivityModal";
const SearchActivityModal = (props) => {
  const { user, destination, show, handleClose, msgAlert, triggerRefresh } =
    props;
  const [value, setValue] = useState("important tourist attraction");
  const [activity, setActivity] = useState({ name: "" });
  const [recActivityModalShow, setRecActivityModalShow] = useState(false);
  const [recommendedListShow, setRecommendedListShow] = useState(false);
  const [places, setPlaces] = useState({
    data: { results: [] },
  });
  const handleSelect = (e) => {
    console.log(e);
    setValue(e);
  };
  console.log(value);

  useEffect(() => {
    const func = async () => {
      let newPlaces = await axios.get(
        `https://api.tomtom.com/search/2/categorySearch/${value}.json?typeahead=true&lat=${destination.lat}&lon=${destination.lon}&view=Unified&relatedPois=off&key=9JyQb3r2IQDfXHOgwSTNBa8mkxAAuNAT`
      );
      console.log(newPlaces);
      setPlaces(newPlaces);
    };
    func();
  }, [value]);
  function changeBackground(e) {
    e.target.style.background = "#a6e7f7";
  }
  function originalBackground(e) {
    e.target.style.background = "white";
  }
  console.log(places.data.results);

  let items = places.data.results.map((i) => (
    <>
      <li>
        <button
          style={{
            color: "black",
            marginBottom: "4px",
            borderRadius: "8px",
            transition: "0.25s ease-in-out",
          }}
          class="btn btn-outline-light"
          onMouseOver={changeBackground}
          onMouseLeave={originalBackground}
          id={i.id}
          onClick={() => {
            setActivity({
              name: i.poi.name,
              address: i.address.freeformAddress,
              schedule: "",
              priority: 0,
            });
            setRecActivityModalShow(true);
            console.log(activity);
          }}
        >
          {i.poi.name}
        </button>
      </li>
    </>
  ));

  console.log(items);
  const handleChange = (e) => {
    setActivity((prevActivity) => {
      let value = e.target.value;
      const name = e.target.name;
      console.log(value);
      // console.log('this is the input type', e.target.type)

      const updatedActivity = {
        [name]: value,
      };
      return {
        ...prevActivity,
        ...updatedActivity,
      };
    });
  };

  const handleSubmit = (e) => {
    // e equals the event
    e.preventDefault();
    console.log(destination);
    createActivity(user, destination._id, activity)
      // if we're successful in the modal, we want the modal to close
      .then(() => handleClose())
      // send a success message to the user
      .then(() => {
        msgAlert({
          heading: "Oh Yeah!",
          message: "Great! This will be fun!",
          variant: "success",
        });
      })
      .then(() => triggerRefresh())
      .catch(() =>
        msgAlert({
          heading: "Oh No!",
          message: "Something went wrong, please try again",
          variant: "danger",
        })
      );
  };

  let item = <h2>hey</h2>;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton />
      <h3 style={{ textAlign: "center", paddingTop: "8px" }}>Search {value}</h3>
      <Modal.Body>
        <Form>
          <DropdownButton onSelect={handleSelect} variant="info">
            <Dropdown.Item eventKey="important tourist attraction">
              important tourist attraction
            </Dropdown.Item>
            <Dropdown.Item eventKey="museum">museum</Dropdown.Item>
            <Dropdown.Item eventKey="parks">parks</Dropdown.Item>
            <Dropdown.Item eventKey="natural tourist attraction">
              natural tourist attraction
            </Dropdown.Item>
            <Dropdown.Item eventKey="statues">statues</Dropdown.Item>
            <Dropdown.Item eventKey="sushi">
              amanda's recommendations
            </Dropdown.Item>
            <Dropdown.Item eventKey="donut">timms suggestion</Dropdown.Item>
            <Dropdown.Item eventKey="mediterranean">
              james' recommendations
            </Dropdown.Item>
            <Dropdown.Item eventKey="breweries">
              dan's recommentations
            </Dropdown.Item>
            <Dropdown.Item eventKey="dispensaries">dispensaries</Dropdown.Item>
            <Dropdown.Item eventKey="sports">sports</Dropdown.Item>
            <Dropdown.Item eventKey="gas stations">gas stations</Dropdown.Item>
            <Dropdown.Item eventKey="coffee">coffee</Dropdown.Item>
          </DropdownButton>
        </Form>
        <ul style={{ listStyle: "none" }}>{items}</ul>
      </Modal.Body>
      <NewRecActivityModal
        user={user}
        destination={destination}
        show={recActivityModalShow}
        msgAlert={msgAlert}
        activity={activity}
        triggerRefresh={props.triggerRefresh}
        handleChange={handleChange}
        handleClose={() => setRecActivityModalShow(false)}
      />
    </Modal>
  );
};

export default SearchActivityModal;
