// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import CreateDestination from './components/destinations/CreateDestination'
import ShowDestination from './components/destinations/ShowDestination'
import ShowActivity from './components/activities/ShowActivity'
import BackgroundVideo from './components/auth/BackgroundVideo'
import './style.css'

// import fetch from 'node-fetch';
// global.fetch = fetch;


const App = () => {

  const [user, setUser] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])
  const [destination, setDestination] = useState(false)

  console.log('user in app', user)
  console.log('message alerts', msgAlerts)
  const clearUser = () => {
    console.log('clear user ran')
    setUser(null)
  }
// useEffect (() => {
// 	setDestination(destination)
// }, [destination])
	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id) )
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
      )
		})
	}

		return (
			<>
			
			<Fragment>
				<BackgroundVideo
				/>
				<Header user={user} />
				{/* <BackgroundVideo
					/> */}
				<Routes>
					<Route path='/' element={<Home msgAlert={msgAlert} user={user} destination={destination}/>} />
					<Route
						path='/sign-up'
						element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route
						path='/sign-in'
						element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route
						path='/sign-out'
						element={
						<RequireAuth user={user}>
							<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
						</RequireAuth>}
					/>
					<Route
						path='/change-password'
						element={
						<RequireAuth user={user}>
							<ChangePassword msgAlert={msgAlert} user={user} />
						</RequireAuth>}
					/>
					<Route
							path="/destinations/:id"
							element={ <ShowDestination user={ user } msgAlert={ msgAlert } />}
						/>
					<Route
							path="/activities/:destinationId/:activityId"
							element={ <ShowActivity user={ user } msgAlert={ msgAlert } />}
						/>	
					<Route
							path="/addDestination"
							element={
								<RequireAuth user={ user }>
									<CreateDestination msgAlert={msgAlert} user={user}/>
								</RequireAuth>}
					/>
					</Routes>
					
				{msgAlerts.map((msgAlert) => (
					<AutoDismissAlert
						key={msgAlert.id}
						heading={msgAlert.heading}
						variant={msgAlert.variant}
						message={msgAlert.message}
						id={msgAlert.id}
						deleteAlert={deleteAlert}
					/>
				))}
			</Fragment>
			</>
			
		)
}

export default App
