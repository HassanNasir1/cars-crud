import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import { getSupersetToken } from 'src/store/apache-superset'
import { embedDashboard } from '@superset-ui/embedded-sdk'


const MyDashboard = () => {
  const [token, setToken] = useState()
  const [guestToken, setGuestToken] = useState()
  const [csrfToken, setCsrfToken] = useState()

  useEffect(() => {
    getSupersetToken('e7350522-dbcc-409c-bd7f-cf4db5321da5').then(response => {
      setToken(response.accessToken)
      setGuestToken(response.guestToken)
      setCsrfToken(response.csrfToken)
    })
  }, [])

  useEffect(() => {
    if (guestToken) {
      embedDashboard({
        id: 'e7350522-dbcc-409c-bd7f-cf4db5321da5',
        supersetDomain: 'https://superset.acruxtek.net',
        mountPoint: document.getElementById('my-superset-container'),
        fetchGuestToken: () => guestToken,
        dashboardUiConfig: {
          hideTitle: true,
          filters: {
            expanded: true
          },
        },
        headers: {
          'X-CSRFToken': csrfToken,
          Authorization: `Bearer ${token}`
        }
      })
    }
  }, [guestToken, csrfToken])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {/* Apply styles to make the div 100% width and full scrolling height */}
        <div
          id='my-superset-container'
          style={{
            width: '100%',
            height: '100vh', // Full viewport height
            overflow: 'auto' // Enable scrolling
          }}
        ></div>
        {/* <iframe
          width='100%'
          height='1000px'
          seamless
          frameBorder='0'
          scrolling='no'
          src='https://superset.acruxtek.net/superset/explore/p/px2RMqEMn4P/?standalone=1&height=400'
        ></iframe> */}
      </Grid>
    </Grid>
  )
}

export default MyDashboard
