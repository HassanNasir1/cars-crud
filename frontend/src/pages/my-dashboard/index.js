import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardStatsVertical from 'src/@core/components/card-statistics/card-stats-vertical';
import { getCarsCount } from 'src/store/cars';
import { useEffect, useState } from 'react';

/**
 * MyDashboard component for displaying the dashboard.
 * @component
 * @returns {JSX.Element} MyDashboard component.
 */
const MyDashboard = () => {
  const [count, setCount] = useState();

  useEffect(() => {
    getCarsCount()
      .then(response => {
        setCount(response);
      })
      .catch(error => {
        console.error('Error retrieving total car count:', error);
        // Handle the error
      });
  }, []);

  return (
    <Grid container spacing={6}>
      <Grid item xs={6} sm={4} lg={2}>
        <CardStatsVertical
          chipText={count}
          chipColor='default'
          avatarColor='error'
          title='Registered Cars'
          avatarIcon='tabler:car'
        />
      </Grid>
    </Grid>
  );
};

export default MyDashboard;
