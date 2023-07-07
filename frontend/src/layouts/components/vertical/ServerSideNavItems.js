// ** React Imports
import { useEffect, useState } from 'react'
import { accessToken } from 'src/configs/endpoint'
import { API_URL } from 'src/configs/endpoint'

// ** Axios Import
import axios from 'axios'

const ServerSideNavItems = () => {
  // ** State
  const [menuItems, setMenuItems] = useState([])
  useEffect(() => {
    axios
      .get(`${API_URL.url}/get-all-modules`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => {
        const menuArray = response.data
        setMenuItems(menuArray)
      })
  }, [])

  return { menuItems }
}

export default ServerSideNavItems
