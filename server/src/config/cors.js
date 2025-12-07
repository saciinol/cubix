const allowedOrigins = {
	development: [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5174',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173',
   ],
	production: [process.env.CLIENT_URL || 'https://cubix.com'],
};

const corsOptions = {
	origin: function (origin, callback) {
      const origins = process.env.NODE_ENV === 'production'
         ? allowedOrigins.production
         : allowedOrigins.development;

      if (!origin || origins.indexOf(origin) !== -1) {
         callback(null, true);
      } else {
         callback(new Error('Not allowed by CORS'));
      }
   },
   credentials: true,
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
   allowedHeaders: ['Content-Type', 'Authorization']
};

export default corsOptions;
