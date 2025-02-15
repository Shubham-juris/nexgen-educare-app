const express = require('express');
const bodyParser = require('body-parser');
const odbc = require('odbc');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Set your ODBC connection string (replace with your DSN, UID, PWD, etc.)
const connectionString =
  'DSN=192.168.71.69;UID=nexgened_aq208tt3nyf;PWD=Nexgen$2025';

// Helper function to obtain an ODBC connection
async function getConnection() {
  return await odbc.connect(connectionString);
}

/**
 * GET /data
 * Retrieves all records from the "admins" table.
 */
app.get('/data', async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM admins');
    await connection.close();
    console.log('Fetched data successfully:', result);
    res.json(result);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data from the database');
  }
});

/**
 * POST /data
 * Inserts a new record into the "admins" table.
 * Expected JSON body: { "name": "Admin Name", "email": "admin@example.com" }
 */
app.post('/data', async (req, res) => {
  try {
    const { name, email } = req.body;
    const connection = await getConnection();

    // Parameterized query to prevent SQL injection
    const result = await connection.query(
      'INSERT INTO admins (name, email) VALUES (?, ?)',
      [name, email]
    );
    await connection.close();
    console.log('Record inserted successfully:', result);
    res.json({ message: 'Record inserted successfully', result });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).send('Error inserting data into the database');
  }
});

/**
 * PUT /data/:id
 * Updates an existing record in the "admins" table.
 * Expected JSON body: { "name": "Updated Name", "email": "updated@example.com" }
 */
app.put('/data/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const connection = await getConnection();

    // Parameterized query for updating record by id
    const result = await connection.query(
      'UPDATE admins SET name = ?, email = ? WHERE id = ?',
      [name, email, id]
    );
    await connection.close();
    console.log('Record updated successfully:', result);
    res.json({ message: 'Record updated successfully', result });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).send('Error updating data in the database');
  }
});

/**
 * DELETE /data/:id
 * Deletes a record from the "admins" table by ID.
 */
app.delete('/data/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();

    // Parameterized query for deleting a record by id
    const result = await connection.query('DELETE FROM admins WHERE id = ?', [
      id,
    ]);
    await connection.close();
    console.log('Record deleted successfully:', result);
    res.json({ message: 'Record deleted successfully', result });
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).send('Error deleting data from the database');
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
