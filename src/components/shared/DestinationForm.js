import { Form, Button } from "react-bootstrap";
import '../../style.css'

const DestinationForm = (props) => {
  const { destination, handleChange, heading, handleSubmit } = props;


  const formStyle ={
    color: 'white',
    textAlign: 'center',
    position: 'absolute',
    zIndex: '2'
  }

  return (
    <div className='row'id='destinationForm'style={formStyle}>
        <div className='col-md mx-auto mt-5' >
          <h3 style={{color: 'white'}} id="destinationFormHeading">{heading}</h3>
            <Form className="cards" onSubmit={handleSubmit}>
              <Form.Control
                placeholder="Destination name"
                name="name"
                id="name"
                value={destination.name}
                onChange={handleChange}
                className="mt-2"
                style={{textAlign: 'center'}}
              />
              <Form.Control
                placeholder="When is this trip?"
                name="schedule"
                id="schedule"
                value={destination.schedule}
                onChange={handleChange}
                className="mt-2"
                style={{textAlign: 'center'}}
              />
              <Button type="submit" className="mt-3" size="sm">Submit</Button>
            </Form>
        </div>
      </div>
  );
};

export default DestinationForm;
