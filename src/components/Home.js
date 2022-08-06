import DestinationsIndex from "./destinations/DestinationIndex"
import { useState, useEffect } from "react";

const Home = (props) => {
	const [updated, setUpdated] = useState(false)
	// const { msgAlert, user } = props
	console.log('props in home', props)
	const { user, msgAlert, destination } = props
	return (
		
		<>
			<h2>Destinations</h2>
			<DestinationsIndex msgAlert={ msgAlert } user={user} destination={destination} triggerRefresh={() => setUpdated(prev => !prev)}/>
		</>
	)
}

export default Home
