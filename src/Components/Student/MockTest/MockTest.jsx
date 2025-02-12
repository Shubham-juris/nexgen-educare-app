import React from 'react';
import Grid from '@mui/material/Grid2';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

import six from '../../../assets/Courses/CoachingClasses/6th.png';
import nine from '../../../assets/Courses/CoachingClasses/8th.png';
import leone from '../../../assets/Courses/CoachingClasses/12th.png';
import other from '../../../assets/Courses/CoachingClasses/other.png';

const cardsData = [
  { id: 1, title: 'Purchased Courses ', image: six },
  { id: 2, title: 'Purchased Courses  ', image: nine },
  { id: 3, title: 'Purchased Courses ', image: leone },
  { id: 4, title: 'Purchased Courses ', image: other },
];

const MockTestCards = () => {
  return (
    <Grid container spacing={2} justifyContent='center'>
      <Typography
        variant='h4'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          marginBottom: 3,
        }}
      >
        Mock Tests
      </Typography>
      {cardsData.map((test) => (
        <Grid item xs={12} sm={6} md={3} key={test.id}>
          <Card
            sx={{
              width: '280px',
              height: 320,
              textAlign: 'center',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              borderRadius: '10px',
            }}
          >
            <CardMedia
              component='img'
              alt={test.title}
              image={test.image}
              title={test.title}
              sx={{
                padding: '25px 25px 0px 25px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                objectFit: 'cover',
                height: 250,
              }}
            />
            <CardContent sx={{ backgroundColor: '#f4f4f4' }}>
              <Typography
                variant='h6'
                sx={{ fontWeight: 'bold', color: '#333' }}
              >
                {test.title}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MockTestCards;
