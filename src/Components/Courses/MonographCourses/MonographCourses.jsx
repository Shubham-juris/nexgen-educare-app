import React from 'react';
import Grid from '@mui/material/Grid2';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';

import RealEstate from '../../../assets/Courses/MonographCourses/Real-Estate.png';
import DispatchCourse from '../../../assets/Courses/MonographCourses/Dispatch-Course.png';
import DentalReceptionist from '../../../assets/Courses/MonographCourses/Dental-Receptionist.png';
import SecurityTraining from '../../../assets/Courses/MonographCourses/Security-Training.png';
import SalesTraining from '../../../assets/Courses/MonographCourses/Sales-Training.png';
import FoodHendler from '../../../assets/Courses/MonographCourses/Food-Hendler.png';
import EventPlanning from '../../../assets/Courses/MonographCourses/Event-Planning.png';

const cardsData = [
  { id: 1, title: 'Real Estate Managment', image: RealEstate },
  { id: 2, title: 'Dispatch Course ', image: DispatchCourse },
  { id: 3, title: 'Dental Receptionist', image: DentalReceptionist },
  { id: 4, title: 'Security Training', image: SecurityTraining },
  { id: 5, title: 'Sales Training', image: SalesTraining },
  { id: 6, title: 'Food Handler', image: FoodHendler },
  { id: 7, title: 'Event Planning', image: EventPlanning },
];

const MonographCoursesCards = () => {
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
        Monograph Courses
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

export default MonographCoursesCards;
