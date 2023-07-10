// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardStatsVertical from 'src/@core/components/card-statistics/card-stats-vertical'
import { getCarsCount } from 'src/store/cars'
import { useEffect, useState } from 'react'

//this is a test comment
const MyDashboard = () => {
  const [count, setCount] = useState()

  useEffect(() => {
    getCarsCount()
      .then(response => {
        setCount(response)
      })
      .catch(error => {
        console.error('Error retrieving total car count:', error)

        // Handle the error
      })
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={6} sm={4} lg={2}>
        <CardStatsVertical
          // stats='1.28k'
          chipText={count}
          chipColor='default'
          avatarColor='error'
          title='Registered Cars'
          // subtitle='Till now'
          avatarIcon='tabler:car'
        />
      </Grid>
    </Grid>
  )
}

export default MyDashboard
