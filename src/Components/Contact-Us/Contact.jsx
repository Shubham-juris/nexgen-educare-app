import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Card,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import emailjs from "emailjs-com";
import AOS from "aos";
import "aos/dist/aos.css";
import Contact from "../../assets/Contact-Us/Contact.jpg";

const ContactUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace these with your EmailJS service, template, and user IDs
    const serviceId = "service_pki17gg";
    const templateId = "template_0qfjd5j";
    const userId = "FROpYta0fqq18rCgt";

    emailjs.send(serviceId, templateId, formData, userId).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", course: "", message: "" }); // Reset form
      },
      (error) => {
        console.error("FAILED...", error);
        alert("Message sending failed. Please try again.");
      }
    );
  };

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: "1200px",
        margin: "0 auto",
        "@media (max-width: 600px)": {
          padding: 2,
        },
      }}
    >
      {/* Header */}
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontSize: { xs: "1.8rem", sm: "2rem" },
          marginTop: "10%",
        }}
      >
        Contact Us
      </Typography>

      {/* Top Section: Cards */}
      <Grid
        container
        spacing={3}
        sx={{
          marginTop: 2,
          justifyContent: "center",
        }}
      >
        {/* Card 1: Office */}
        <Grid item xs={12} sm={6} md={4} data-aos="fade-up">
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "200px",
              padding: 2,
              margin: "0 auto",
              width: { xs: "295px", sm: "360px" },
            }}
          >
            <a
              href="https://www.google.com/maps/place/SCO+4-5,+New+Sunny+Enclave,+Sector+125,+Mohali,+Punjab+140301"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <LocationOnIcon
                fontSize="large"
                sx={{ color: "primary.main", marginBottom: 1 }}
              />
            </a>
            <a
              href="https://www.google.com/maps/place/SCO+4-5,+New+Sunny+Enclave,+Sector+125,+Mohali,+Punjab+140301"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="h6" align="center" sx={{ marginTop: 1 }}>
                OUR MAIN OFFICE
              </Typography>
            </a>
            <Typography align="center">
              <a
                href="https://www.google.com/maps/place/SCO+4-5,+New+Sunny+Enclave,+Sector+125,+Mohali,+Punjab+140301"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                SCO 4-5, Second Floor, New Sunny <br />
                Enclave, Sector-125, Mohali, Kharar
                <br />
                Punjab - 140301
              </a>
            </Typography>
          </Card>
        </Grid>

        {/* Card 2: Phone */}
        <Grid item xs={12} sm={6} md={4} data-aos="fade-up">
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "200px",
              padding: 2,
              margin: "0 auto",
              width: { xs: "295px", sm: "360px" },
            }}
          >
            <a
              href="tel:+91 9056729370"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <PhoneIcon
                fontSize="large"
                sx={{ color: "primary.main", marginBottom: 1 }}
              />
            </a>
            <a
              href="tel:+91 9056729370"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="h6" align="center" sx={{ marginTop: 1 }}>
                PHONE NUMBER
              </Typography>
            </a>
            <Typography align="center">
              <a
                href="tel:+91 9056729370"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                +91 9056729370
              </a>
            </Typography>
          </Card>
        </Grid>

        {/* Card 3: Email */}
        <Grid item xs={12} sm={6} md={4} data-aos="fade-up">
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "200px",
              padding: 2,
              margin: "0 auto",
              width: { xs: "295px", sm: "360px" },
            }}
          >
            <a
              href="mailto:  nexgeneducareacademy@gmail.com"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <EmailIcon
                fontSize="large"
                sx={{ color: "primary.main", marginBottom: 1 }}
              />
            </a>
            <a
              href="mailto:  nexgeneducareacademy@gmail.com"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="h6" align="center" sx={{ marginTop: 1 }}>
                EMAIL
              </Typography>
            </a>
            <Typography
              align="center"
              component="a"
              href="mailto:nexgeneducareacademy@gmail.com"
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              nexgeneducareacademy@gmail.com
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Bottom Section: Paragraph, Image, and Form */}
      <Grid
        container
        spacing={4}
        sx={{
          marginTop: 4,
          justifyContent: "center",
        }}
      >
        {/* Left Side: Paragraph and Circular Image */}
        <Grid item xs={12} md={6} data-aos="fade-right">
          <Box>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                textAlign: { xs: "center", md: "left" },
                paddingLeft: { xs: 0, md: 2 },
              }}
            >
              Contact info
            </Typography>
            <Typography
              gutterBottom
              sx={{
                textAlign: "justify",
                padding: { xs: 1, md: "0 16px" },
                lineHeight: 1.8,
              }}
            >
              Nexgen Educare Academy serves as a beacon of quality education,
              <br />
              shaping future leaders and problem-solvers. Our academy caters to{" "}
              <br />
              students of all age groups, offering a wide range of programs{" "}
              <br />
              designed to meet the evolving demands of the modern world.
            </Typography>
            <Box
              sx={{
                textAlign: "center",
                marginTop: 4,
              }}
            >
              <img
                src={Contact}
                alt="Contact"
                style={{
                  borderRadius: "50%",
                  width: "100%",
                  maxWidth: "240px",
                  height: "auto",
                  border: "3px solid #ccc",
                }}
              />
            </Box>
          </Box>
        </Grid>

        {/* Right Side: Contact Form */}
        <Grid item xs={12} md={6} data-aos="fade-left">
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              textAlign: "center",
              marginBottom: 2,
            }}
          >
            Get in touch
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: { xs: "270px", sm: "300px", md: "450px" },
              margin: "0 auto",
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Courses"
              name="course"
              value={formData.course}
              onChange={handleChange}
              select
              fullWidth
              required
              SelectProps={{
                MenuProps: {
                  sx: {
                    "& .MuiPaper-root": {
                      maxHeight: 150,
                    },
                  },
                },
              }}
            >
              <MenuItem value="Web Technologies Courses">
                Web Technologies Courses
              </MenuItem>
              <MenuItem value="Accounts Courses">Accounts Courses</MenuItem>
              <MenuItem value="Monograph Courses">Monograph Courses</MenuItem>
              <MenuItem value="Languages Courses">Languages Courses</MenuItem>
              <MenuItem value="Hospitalist Courses">
                Hospitalist Courses
              </MenuItem>
              <MenuItem value="Competitive Courses">
                Competitive Courses
              </MenuItem>
              <MenuItem value="Coaching Courses">Coaching Courses</MenuItem>
              <MenuItem value="Cooking Courses">Cooking Courses</MenuItem>
            </TextField>
            <TextField
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              required
            />
            <Button variant="contained" type="submit" fullWidth>
              SUBMIT
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactUs;
