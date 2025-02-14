import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const formatArrayToString = (data) => {
  if (!data) return "No data available";

  try {
    let parsedData = data;

    if (typeof data === "string") {
      parsedData = JSON.parse(data);
      if (typeof parsedData === "string") {
        parsedData = JSON.parse(parsedData);
      }
    }

    if (Array.isArray(parsedData) && parsedData.length > 0) {
      return parsedData.join(", ");
    }

    if (typeof parsedData === "string") {
      return parsedData;
    }
  } catch (error) {
    console.error("Error parsing data:", error);
  }

  return "No data available";
};

const StudentDetailsModal = ({ student, onClose }) => {
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Student Details</title>
            <style>
              @media print {
                body {
                  font-family: Arial, sans-serif;
                  padding: 20px;
                  margin: 0;
                  font-size: 12px;
                  width: 210mm; /* A4 width */
                  height: 297mm; /* A4 height */
                }
                h6 { margin-bottom: 10px; text-align: center; font-size: 18px; }
                p { margin: 5px 0; font-size: 14px; }
                .no-print { display: none; }
                .page-break { page-break-before: always; }
              }
            </style>
          </head>
          <body>
            <h6>Student Details</h6>
            <p><strong>Name:</strong> ${student.studentName}</p>
            <p><strong>Father's Name:</strong> ${student.fatherName}</p>
            <p><strong>Mother's Name:</strong> ${student.motherName}</p>
            <p><strong>Date of Birth:</strong> ${formatDate(student.dateOfBirth)}</p>
            <p><strong>Gender:</strong> ${student.gender}</p>
            <p><strong>Phone:</strong> ${student.phoneNumber}</p>
            <p><strong>Email:</strong> ${student.emailAddress}</p>
  
            <p><strong>Address:</strong> ${student.address}</p>
            <p><strong>Permanent Address:</strong> ${student.permanentAddress}</p>
            <p><strong>Course:</strong> ${formatArrayToString(student.courses)}</p>
            <p><strong>Preferred Timing:</strong> ${student.preferredTiming}</p>
            <p><strong>Reason:</strong> ${student.reason}</p>
            <p><strong>Payment Method:</strong> ${student.paymentMethod}</p>
            ${student.transactionId ? `<p><strong>Transaction ID:</strong> ${student.transactionId}</p>` : ""}
            <p><strong>Student ID:</strong> ${student.student_id}</p>
            <p><strong>Password:</strong> ${student.password}</p>
            <script>
              window.onload = function() { window.print(); window.close(); }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: 4,
          overflowY: "auto",
          width: 800,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Student Details
        </Typography>
        <Typography variant="body1">
          <strong>Name:</strong> {student.studentName}
        </Typography>
        <Typography variant="body1">
          <strong>Father's Name:</strong> {student.fatherName}
        </Typography>
        <Typography variant="body1">
          <strong>Mother's Name:</strong> {student.motherName}
        </Typography>
        <Typography variant="body1">
          <strong>Date of Birth:</strong> {formatDate(student.dateOfBirth)}
        </Typography>
        <Typography variant="body1">
          <strong>Gender:</strong> {student.gender}
        </Typography>
        <Typography variant="body1">
          <strong>Phone:</strong> {student.phoneNumber}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {student.emailAddress}
        </Typography>
        <Typography variant="body1">
          <strong>Address:</strong> {student.address}
        </Typography>
        {/* <Typography variant="body1">
          <strong>permanentAddress:</strong> {student.permanentAddress}
        </Typography> */}

        <Typography variant="body1">
          <strong>Course:</strong> {formatArrayToString(student.courses)}
        </Typography>
        <Typography variant="body1">
          <strong>Preferred Timing:</strong> {student.preferredTiming}
        </Typography>
        <Typography variant="body1">
          <strong>Reason:</strong> {student.reason}
        </Typography>
        <Typography variant="body1">
          <strong>Payment Method:</strong> {student.paymentMethod}
        </Typography>
        {student.transactionId && (
          <Typography variant="body1">
            <strong>Transaction ID:</strong> {student.transactionId}
          </Typography>
        )}
        <Typography variant="body1">
          <strong>Student ID:</strong> {student.student_id}
        </Typography>
        <Typography variant="body1">
          <strong>Password:</strong> {student.password}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={onClose} sx={{ mr: 2 }}>
            Close
          </Button>
          <Button variant="contained" color="secondary" onClick={handlePrint} className="no-print">
            Print
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default StudentDetailsModal;
