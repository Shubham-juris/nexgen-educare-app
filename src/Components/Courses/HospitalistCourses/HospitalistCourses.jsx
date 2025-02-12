import React from 'react';
import Grid from '@mui/material/Grid2';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

import CallCenter from '../../../assets/Courses/HospitalistCourses/Call-Center.png';
import MakeUp from '../../../assets/Courses/HospitalistCourses/Make-Up.png';
import Saloon from '../../../assets/Courses/HospitalistCourses/Saloon.png';
import LegalDrafting from '../../../assets/Courses/HospitalistCourses/Legal-Drafting.png';
import Nanny from '../../../assets/Courses/HospitalistCourses/Nanny.png';

const cardsData = [
  { id: 1, title: 'Call Center Training', image: CallCenter },
  { id: 2, title: 'Make Up ', image: MakeUp },
  { id: 3, title: 'Saloon', image: Saloon },
  { id: 4, title: 'Legal Drafting', image: LegalDrafting },
  { id: 5, title: 'Nanny', image: Nanny },
];

const HospitalistCoursesCards = () => {
  return (
    <Grid container spacing={2} justifyContent='center'>
      <Typography
        variant='h4'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          mt: 4,
          marginBottom: 3,
        }}
      >
        Others Courses
      </Typography>
      {cardsData.map((card) => (
        <Grid item xs={12} sm={6} md={3} key={card.id}>
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
              alt={card.title}
              image={card.image}
              title={card.title}
              sx={{
                padding: '25px 25px 0px 25px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                objectFit: 'cover',
                height: 200,
              }}
            />
            <CardContent sx={{ backgroundColor: '#f4f4f4' }}>
              <Typography
                variant='h6'
                sx={{ fontWeight: 'bold', color: '#333' }}
              >
                {card.title}
              </Typography>
              <Grid
                container
                spacing={1}
                justifyContent='center'
                sx={{ marginTop: 2 }}
              >
                <Grid item>
                  <Button variant='contained' size='small' color='primary'>
                    Details
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant='outlined' size='small' color='secondary'>
                    Enroll
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default HospitalistCoursesCards;
