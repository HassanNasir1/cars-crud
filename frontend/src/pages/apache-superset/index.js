import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import { getAccessToken, getGuestToken, getCSRFToken } from 'src/store/apache-superset'
import { embedDashboard } from '@superset-ui/embedded-sdk'
import { accessToken } from 'src/configs/endpoint'

/**
 * Function to fetch the guest token from the backend.
 * Replace this function with your actual implementation.
 */
const fetchGuestTokenFromBackend = async () => {
  // Implement your logic to fetch the guest token
}

/**
 * MyDashboard component for displaying the Superset dashboard.
 * @component
 * @returns {JSX.Element} MyDashboard component.
 */
const MyDashboard = () => {
  const [token, setToken] = useState()
  const [guestToken, setGuestToken] = useState()

  useEffect(() => {
    // Fetch the access token when the component mounts
    getAccessToken()
      .then(response => {
        console.log(response)
        setToken(response)
      })
      .catch(error => {
        console.error('Error retrieving access token:', error)
        // Handle the error
      })
  }, [])

  useEffect(() => {
    // Fetch the guest token when the access token changes
    if (token) {
      getGuestToken(token)
        .then(response => {
          console.log(response)
          setGuestToken(response)
        })
        .catch(error => {
          console.error('Error retrieving guest token:', error)
          // Handle the error
        })
    }
  }, [token])

  useEffect(() => {
    // Embed the Superset dashboard when the guest token is available
    if (guestToken) {
      // const csrfToken = getCSRFToken(token)
      embedDashboard({
<<<<<<< HEAD
        id: '1', // Replace with your actual dashboard ID
        supersetDomain: 'http://192.168.100.69:8088', // Replace with your Superset domain
=======
        id: '5834991a-3a22-42c8-82cd-71f7fa3063b6', // Replace with your actual dashboard ID
        supersetDomain: 'http://localhost:8088', // Replace with your Superset domain
>>>>>>> 8d43ae902133d55317be44b99eb74b8ca8a18a1e
        mountPoint: document.getElementById('my-superset-container'),
        fetchGuestToken: () => guestToken,
        dashboardUiConfig: {
          hideTitle: true,
          filters: {
            expanded: true
          }
        },
        // headers: {
        //   'X-CSRFToken': csrfToken
        // }
      })
    }
  }, [guestToken])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {/* Render the container for the embedded Superset dashboard */}
        <div id='my-superset-container'></div>
        {/* <iframe
          width='600'
          height='400'
          seamless
          frameBorder='0'
          scrolling='no'
          src='http://localhost:8088/superset/explore/p/ALl76PeODYM/?standalone=1&height=400'
        ></iframe> */}
      </Grid>
    </Grid>
  )
}

export default MyDashboard
