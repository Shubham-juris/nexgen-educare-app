import React from 'react';
import Grid from '@mui/material/Grid2';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for routing
 
import GraphicDesign from '../../../assets/Courses/WebTech/Graphic-Design.png';
import FullStackDeveloper from '../../../assets/Courses/WebTech/Full-Stack-Developer.png';
import WebDesigning from '../../../assets/Courses/WebTech/Web-Designing.png';
import PythonCrashCourse from '../../../assets/Courses/WebTech/Python-Crash-Course.png';
import VideoEditing from '../../../assets/Courses/WebTech/Video-Editing.png';
import SEOManagement from '../../../assets/Courses/WebTech/SEO-Management.png';
import DigitalMarketing from '../../../assets/Courses/WebTech/Digital-Marketing.png';
import ContentWriting from '../../../assets/Courses/WebTech/Content-Writing.png';
 
const cardsData = [
  {
    id: 1,
    title: 'Graphic Design',
    image: GraphicDesign,
    path: '/graphic-design',
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    image: FullStackDeveloper,
    path: '/full-stack-developer',
  },
  {
    id: 3,
    title: 'Web Designing',
    image: WebDesigning,
    path: '/web-designing',
  },
  {
    id: 4,
    title: 'Python Crash Course',
    image: PythonCrashCourse,
    path: '/python-crash-course',
  },
  {
    id: 5,
    title: 'Video Editing',
    image: VideoEditing,
    path: '/video-editing',
  },
  {
    id: 6,
    title: 'SEO Management',
    image: SEOManagement,
    path: '/seo-management',
  },
  {
    id: 7,
    title: 'Digital Marketing',
    image: DigitalMarketing,
    path: '/digital-marketing',
  },
  {
    id: 8,
    title: 'Content Writing',
    image: ContentWriting,
    path: '/content-writing',
  },
];
 
const WebTechCoursesCards = () => {
  return (
    <Grid container spacing={2} justifyContent='center'>
      <Typography
        variant='h4'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          mt:'10%',
          mb: 3,
        }}
      >
        Web Technologies
      </Typography>
      {cardsData.map((card) => (
        <Grid item xs={12} sm={6} md={3} key={card.id}>
          <Link to={card.path} style={{ textDecoration: 'none' }}>
            {' '}
            {/* Wrap card with Link */}
            <Card
              sx={{
                width: '280px',
                height: 320,
                textAlign: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                borderRadius: '10px',
                '&:hover': {
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
                },
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
                  spacing={2}
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
                      Buy Now
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};
 
export default WebTechCoursesCards;