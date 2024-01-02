import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import { getAccessToken, getGuestToken } from 'src/store/apache-superset'
import { embedDashboard } from '@superset-ui/embedded-sdk'

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
      embedDashboard({
        id: '1', // Replace with your actual dashboard ID
        supersetDomain: 'http://192.168.100.69:8088', // Replace with your Superset domain
        mountPoint: document.getElementById('my-superset-container'),
        fetchGuestToken: () => guestToken,
        dashboardUiConfig: {
          hideTitle: true,
          filters: {
            expanded: true
          }
        }
      })
    }
  }, [guestToken])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {/* Render the container for the embedded Superset dashboard */}
        <div id='my-superset-container'></div>
      </Grid>
    </Grid>
  )
}

export default MyDashboard
