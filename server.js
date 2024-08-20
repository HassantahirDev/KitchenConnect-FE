// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 80;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Handle all GET requests by sending back the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
