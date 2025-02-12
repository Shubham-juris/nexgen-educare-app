import React, { useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

import img1 from '../../assets/About-Us/about.png';
import img2 from '../../assets/About-Us/coaching.png';

const About = () => {
  const offerings = [
    {
      title: 'Academic Excellence Programs',
      details: [
        'Comprehensive curriculum support for school students from Grade 1 to Grade 12.',
        'Tailored coaching for CBSE, ICSE, State Boards, and International Boards.',
        'Regular progress tracking and performance evaluations to ensure continuous improvement.',
      ],
    },
    {
      title: 'Competitive Exam Training',
      details: [
        'Expert guidance for entrance exams such as JEE, NEET, SAT, GRE, GMAT, and more.',
        'Structured study plans, mock tests, and practice sessions for exam readiness.',
        'In-depth analysis of past papers and focus on high-yield topics.',
      ],
    },
    {
      title: 'Skill Development & Professional Courses',
      details: [
        'Public speaking and communication skills workshops.',
        'Leadership development, teamwork, and problem-solving exercises.',
        'Practical training in coding, robotics, and digital literacy for future-ready skills.',
      ],
    },
    {
      title: 'Career Counseling & Guidance',
      details: [
        'Personalized career coaching to identify strengths and interests.',
        'Assistance in choosing academic pathways and professional courses.',
        'Sessions on resume building, interview skills, and personality development.',
      ],
    },
    {
      title: 'Online Learning Solutions',
      details: [
        'Interactive online classes for all courses with access to expert educators.',
        'Recorded sessions, e-books, and digital resources for flexible learning.',
        '24/7 student support for doubt resolution and assignment help.',
      ],
    },
    {
      title: 'Extracurricular Activities',
      details: [
        'Art, music, and drama classes to foster creativity.',
        'Sports training to promote physical fitness and teamwork.',
        'Participation in national and international academic and cultural competitions.',
      ],
    },
    {
      title: 'Our Achievements',
      details: [
        'Consistently high results in board exams and competitive tests.',
        'Alumni placed in prestigious universities and organizations worldwide.',
        'Recipient of numerous awards for excellence in education.',
        'Collaboration with reputed institutions for advanced learning programs.',
      ],
    },
    {
      title: 'Why Choose NexGen Educare Academy?',
      details: [
        'Proven Track Record: Decades of experience in shaping successful students.',
        'Comprehensive Curriculum: Balancing academics with skill development.',
        'Advanced Teaching Methods: Integration of technology and traditional techniques.',
        'Holistic Development: Focusing on academic, emotional, and social growth.',
        'Strong Community: A network of supportive peers, parents, and educators.',
      ],
    },
    {
      title: 'State-of-the-Art Infrastructure',  
      details: [
        'Smart classrooms with audio-visual aids for interactive learning.',
        'Well-equipped science and computer labs for practical education.',
        'Comfortable and safe learning spaces with a student-first approach.',
      ],
    },
    {
      title: 'Expert Faculty',
      details: [
        'A team of highly qualified and experienced educators.',
        'Regular training for teachers to stay updated with the latest educational trends.',
        'Mentors who are dedicated to inspiring and guiding students.',
      ],
    },
    {
      title: 'Student-Centric Approach',
      details: [
        'Individualized attention to address unique learning needs.',
        'Regular parent-teacher meetings for collaborative growth.',
        'Focus on mental health and well-being through counseling support.',
      ],
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with animation duration
  }, []);

  return (
    <Container>
      {/* About Section */}
      <Box
        sx={{
          
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row', },
          justifyContent: 'center',
          alignItems: 'center',
          margin: { xs: 2, sm: 4, },

        }}
        data-aos='fade-up' // Add AOS animation
      >
        <Box sx={{ padding: { xs: 2, sm: 4, }, textAlign: 'center', marginTop:'10%'
 }}>
          <Typography variant='h6'>
            At our academy, we empower learners with innovative education,
            fostering growth, creativity, and success through personalized
            learning experiences.
          </Typography>
        </Box>
        <Box
          component='img'
          src={img1}
          alt='About Us'
          sx={{
            marginTop:'10%',
            width: { xs: '100%', sm: 500,},
            height: { xs: '100%', sm: 450, },
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'scale(1.03)',
              boxShadow: '0 8px 12px rgba(0,0,0,0.2)',

            },
          }}
          data-aos='zoom-in' // Add AOS animation
        />
      </Box>

      {/* Introduction */}
      <Box sx={{ textAlign: 'center', my: 4 }} data-aos='fade-down'>
        <Typography variant='h4'>About Us</Typography>
        <Typography>
          Nexgen Educare Academy is a leading educational institution committed
          to delivering exceptional learning experiences that empower students
          to achieve academic excellence and personal growth. Founded on the
          principles of innovation, integrity, and inclusivity, Nexgen Educare
          Academy serves as a beacon of quality education, shaping future
          leaders and problem-solvers.
        </Typography>
      </Box>

      {/* What We Offer Section */}
      <Box
        sx={{
          backgroundImage: `url(${img2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: { xs: 3, sm: 6, },
          textAlign: 'center',
        }}
        data-aos='fade-right'
      >
        <Container
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            padding: { xs: '3rem', sm: '4rem' ,},
            width: '100%',
          }}
        >
          <Typography variant='h4' sx={{ marginY: 3, fontWeight: 'bold' }}>
            What We Offer
          </Typography>
          <Grid container spacing={1}>
            {offerings.map((offer, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={index}
                data-aos='fade-up' // Add AOS animation
                data-aos-delay={index * 100} // Add staggered delay
              >
                <Box
                  sx={{
                    marginBottom: 4,
                    textAlign: 'left',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                    {offer.title}
                  </Typography>
                  <ul style={{ paddingLeft: '20px' }}>
                    {offer.details.map((detail, detailIndex) => (
                      <li key={detailIndex}>
                        <Typography>{detail}</Typography>
                      </li>
                    ))}
                  </ul>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Container>
  );
};

export default About;
