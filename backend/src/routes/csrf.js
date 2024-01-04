const express = require('express')
const csrfRoute = express.Router()
const axios = require('axios')
const cookieParser = require('cookie-parser')

csrfRoute.use(cookieParser())

// Define the backend link
// const backendLink = 'http://localhost:8088/api/v1'
const backendLink = 'https://superset.acruxtek.net/api/v1'
const userCredentials = {
  username: 'guest',
  first_name: 'Guest',
  last_name: 'User'
}

// CSRF route
csrfRoute.get('/', async (req, res) => {
  try {
    const { dashboardId } = req.query
    const sessionCookie = req.headers.cookie

    // Request configuration for /security/login
    const loginConfig = {
      method: 'post',
      url: `${backendLink}/security/login`,
      data: {
        username: 'admin',
        password: 'admin931',
        provider: 'db',
        refresh: true
      }
    }

    // Make a request to /security/login
    const loginResponse = await axios(loginConfig)

    // Extract accessToken from the response
    const accessToken = loginResponse.data.access_token
    const refreshToken = loginResponse.data.refresh_token

    // console.log("accessToken",accessToken);

    // console.log("params",{
    //   Authorization: `Bearer ${accessToken}`,
    //   Cookie: sessionCookie
    // });

    // Request configuration for /security/csrf_token
    const csrfConfig = {
      method: 'get',
      url: `${backendLink}/security/csrf_token`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Cookie: sessionCookie
      }
    }

    // Make a request to /security/csrf_token
    const csrfResponse = await axios(csrfConfig)

    // Extract csrfToken from the response
    const csrfToken = csrfResponse.data.result

    // console.log("csrf",csrfToken);

    // Retrieve session cookie from the request headers

    // Request configuration for /security/guest_token
    const guestTokenConfig = {
      method: 'post',
      url: `${backendLink}/security/guest_token/`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-CSRFToken': csrfToken,
        Cookie: sessionCookie
      },
      withCredentials: true,
      data: {
        resources: [
          {
            type: 'dashboard',
            id: dashboardId
          }
        ],
        rls: [],
        user: userCredentials
      }
    }

    // Make a request to /security/guest_token
    const guestTokenResponse = await axios(guestTokenConfig)

    // console.log('hassan', guestTokenResponse.data.token)
    const guestToken = guestTokenResponse.data.token

    // Respond with the accessToken
    res.status(200).json({ accessToken, refreshToken, csrfToken, guestToken })
  } catch (error) {
    console.error('Error fetching', error.response.data)
    res.status(500).json({ error })
  }
})

module.exports = csrfRoute
