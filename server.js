const express = require('express');
const { PORT } = require('./config/config');

const logger = require('./middleware/logger');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Global middleware
app.use(express.json());   // Parse JSON request bodies
app.use(logger);           // Log every request

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'E-Commerce Backend REST API is running.',
  });
});

// Mount routers
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// 404 handler for unknown routes
app.use(notFound);

// Centralized error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
