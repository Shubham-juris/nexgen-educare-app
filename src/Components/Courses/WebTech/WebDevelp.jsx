import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
} from '@mui/material';
import { Link } from 'react-router-dom';

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
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Container maxWidth='lg'>
      <Box display='flex' flexDirection='column' alignItems='center' mt={5}>
        <Typography
          variant='h4'
          align='center'
          sx={{ mb: 5, fontWeight: 'bold', color: '#333' }}
        >
          Web Technologies
        </Typography>
        <Box
          display='grid'
          gap={3}
          gridTemplateColumns={{
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr 1fr',
          }}
          justifyContent='center'
        >
          {cardsData.map((card) => (
            <Box key={card.id} data-aos='fade-up'>
              <Link to={card.path} style={{ textDecoration: 'none' }}>
                <Card
                  sx={{
                    width: 300,
                    height: 350,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    textAlign: 'center',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    borderRadius: '10px',
                    '&:hover': { boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)' },
                  }}
                >
                  <CardMedia
                    component='img'
                    alt={card.title}
                    image={card.image}
                    title={card.title}
                    sx={{
                      width: '100%',
                      height: 180,
                      objectFit: 'cover',
                      backgroundColor: '#f8f8f8',
                    }}
                  />
                  <CardContent
                    sx={{
                      backgroundColor: '#f4f4f4',
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      variant='h6'
                      sx={{ fontWeight: 'bold', color: '#333' }}
                    >
                      {card.title}
                    </Typography>
                    <Button
                      variant='outlined'
                      size='small'
                      color='secondary'
                      sx={{ mt: 2 }}
                    >
                      Enroll Now
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default WebTechCoursesCards;
