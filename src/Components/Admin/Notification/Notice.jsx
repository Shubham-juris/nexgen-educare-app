import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Paper,
  Grid,
  Divider,
} from "@mui/material";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [filteredNotices, setFilteredNotices] = useState([]);

  useEffect(() => {
    const storedNotices = JSON.parse(localStorage.getItem("notices")) || [];
    setNotices(storedNotices);
    setFilteredNotices(storedNotices);
  }, []);

  useEffect(() => {
    if (searchDate || searchTitle) {
      handleSearch();
    } else {
      setFilteredNotices(notices);
    }
  }, [searchDate, searchTitle, notices]);

  const handleSearch = () => {
    const filtered = notices.filter(
      (notice) =>
        (!searchDate || notice.date === searchDate) &&
        (!searchTitle || notice.title.toLowerCase().includes(searchTitle.toLowerCase()))
    );
    setFilteredNotices(filtered);
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  // Sort notices by date (newest first)
  const sortedNotices = [...filteredNotices].sort((a, b) => {
    return new Date(b.date) - new Date(a.date); // descending order
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Notice Board
      </Typography>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Search Notices
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Search by Date"
              type="date"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm=  {6}>
            <TextField
              fullWidth
              label="Search by Title"
              variant="outlined"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
          </Grid>
        </Grid>
      </Paper>

      {sortedNotices.length > 0 ? (
        sortedNotices.map((notice, index) => (
          <Paper key={index} elevation={2} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
            <Typography variant="caption" sx={{ color: "red", fontWeight: "bold" }}>
              {formatDate(notice.date)}
            </Typography>
            <Typography
              variant="h6"
              sx={{ mt: 1, fontWeight: "bold", color: "#1976d2" }}
            >
              {notice.title}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" sx={{ mb: 1 }}>
              {notice.details}
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontStyle: "italic", color: "#555" }}
            >
              <b>- Posted by</b>    {notice.postedBy} at {notice.postTime}
            </Typography>
          </Paper>
        ))
      ) : (
        <Typography align="center" sx={{ mt: 4, color: "#999" }}>
          No notices found.
        </Typography>
      )}
    </Container>
  );
};

export default Notice;
