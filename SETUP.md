# Comprehensive Installation & Setup Guide

## Prerequisites

- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher (comes with Node.js)
- **Git**: For cloning the repository
- **Text Editor/IDE**: VS Code recommended

## Step-by-Step Installation

### 1. Clone the Repository

```bash
git clone https://github.com/shubhanshuambashta-code/ai-land-acquisition-predictor.git
cd ai-land-acquisition-predictor
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`:
- React and React DOM
- React Router for navigation
- TailwindCSS for styling
- Recharts for charts
- Leaflet for maps
- Axios for HTTP requests
- And other utilities

### 3. Environment Configuration

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# API Base URL
REACT_APP_API_BASE_URL=http://localhost:5000/api

# Mapbox token (optional, for Mapbox integration)
REACT_APP_MAP_TOKEN=your_mapbox_token_here

# Environment
REACT_APP_ENV=development
```

### 4. Start Development Server

```bash
npm start
```

The application will automatically open in your browser at `http://localhost:3000`

### 5. Login

Use one of the demo accounts:
- **Admin**: admin@example.com / admin123
- **Manager**: manager@example.com / manager123
- **Viewer**: viewer@example.com / viewer123

## Available Scripts

### Development
```bash
# Start development server with hot reload
npm start
```

### Production Build
```bash
# Create optimized production build
npm run build
```

### Testing
```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

### Eject (Advanced)
```bash
# Eject from Create React App (irreversible)
npm run eject
```

## Backend Integration

To connect to a real backend:

1. **Update API Base URL** in `.env.local`:
   ```env
   REACT_APP_API_BASE_URL=http://your-backend-server:port/api
   ```

2. **Replace Dummy Data** in components:
   ```javascript
   // Before: Using dummy data
   const { data } = useApi(() => Promise.resolve(dummyProjects), []);
   
   // After: Using API service
   const { data } = useApi(() => projectService.getProjects(), []);
   ```

3. **Update API Services** in `src/services/` if your backend structure differs

## Project Structure Overview

```
ai-land-acquisition-predictor/
├── public/                 # Static files
│   ├── index.html         # HTML template
│   └── manifest.json      # PWA manifest
├── src/
│   ├── components/         # Reusable components
│   ├── pages/              # Page-level components
│   ├── services/           # API communication
│   ├── hooks/              # Custom React hooks
│   ├── context/            # React Context
│   ├── utils/              # Helper functions
│   ├── data/               # Dummy/mock data
│   ├── App.js              # Root component
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies
├── tailwind.config.js      # TailwindCSS config
├── .env.example            # Environment template
└── README.md               # Documentation
```

## Common Issues & Solutions

### Issue: `npm: command not found`
**Solution**: Install Node.js from https://nodejs.org/

### Issue: Port 3000 already in use
**Solution**: 
```bash
# Use a different port
PORT=3001 npm start

# Or kill the process using port 3000
lsof -ti:3000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :3000   # Windows
```

### Issue: `Cannot find module` errors
**Solution**: Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Styles not loading
**Solution**: Clear cache and restart
```bash
npm cache clean --force
rm -rf node_modules
npm install
npm start
```

### Issue: Map not displaying
**Solution**: Check that Leaflet CSS is loaded in `public/index.html`:
```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
```

## Database Setup (Backend)

If setting up your own backend:

### Required Tables
```sql
-- Users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('Admin', 'Manager', 'Viewer') DEFAULT 'Viewer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  district VARCHAR(100),
  state VARCHAR(100),
  type VARCHAR(50),
  status VARCHAR(50),
  risk_score INT,
  delay_probability INT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Alerts table
CREATE TABLE alerts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  message TEXT,
  project_id INT,
  severity ENUM('info', 'warning', 'critical'),
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id)
);
```

## Docker Setup (Optional)

Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t land-predictor .
docker run -p 3000:3000 land-predictor
```

## Deployment

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag and drop 'build' folder to Netlify
```

### Traditional Server
```bash
# Build
npm run build

# Deploy 'build' folder to your server
# Configure server to serve index.html for all routes
```

## Performance Optimization

1. **Code Splitting**: React Router automatically code-splits pages
2. **Image Optimization**: Use next-gen formats (WebP)
3. **Lazy Loading**: Implement for images and components
4. **Minification**: Automatic during production build
5. **Caching**: Configure via `.htaccess` or server config

## Security Best Practices

1. Never commit `.env.local` to version control
2. Use HTTPS in production
3. Validate all user inputs
4. Implement CSRF protection
5. Keep dependencies updated: `npm audit fix`
6. Use environment variables for sensitive data

## Next Steps

1. Explore the codebase
2. Customize branding in `tailwind.config.js`
3. Connect to your backend API
4. Deploy to production
5. Monitor and maintain

## Support & Resources

- **GitHub Issues**: Report bugs and request features
- **Documentation**: See README.md and inline comments
- **Community**: React, TailwindCSS, and other framework docs

---

For detailed component documentation, see individual component files.
