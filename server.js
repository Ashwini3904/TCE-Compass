import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Handle EADDRINUSE error
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Trying a different port...`);
        setTimeout(() => {
            server.close();
            app.listen(0, () => {
                console.log(`Server started on a random available port.`);
            });
        }, 1000);
    } else {
        console.error('Server error:', err);
    }
});
