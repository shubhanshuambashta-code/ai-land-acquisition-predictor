# AI-Powered Land Acquisition Delay Predictor

A responsive, minimalist, and user-friendly web application for predicting land acquisition delays using AI and advanced analytics.

## 🎯 Features

- **Interactive Dashboard**: Real-time project metrics and risk analysis
- **Project Management**: Create, edit, and manage land acquisition projects
- **Advanced Analytics**: District-wise, state-wise trends and delay driver analysis
- **GIS-Enabled Map**: Visualize project locations with risk indicators
- **Risk Assessment**: AI-powered risk scores and delay probability predictions
- **Alert System**: Real-time notifications for high-risk projects
- **Role-Based Access**: Admin, Manager, and Viewer roles with different permissions
- **WCAG Compliant**: Accessible design for all users
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## 🚀 Tech Stack

- **Frontend Framework**: React 18 with Hooks
- **Styling**: TailwindCSS with custom themes
- **Charts**: Recharts for interactive visualizations
- **Maps**: Leaflet.js with React-Leaflet
- **HTTP Client**: Axios for API communication
- **Routing**: React Router v6
- **Icons**: Lucide React

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/shubhanshuambashta-code/ai-land-acquisition-predictor.git
cd ai-land-acquisition-predictor
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your configuration:
```
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_MAP_TOKEN=your_mapbox_token_here
REACT_APP_ENV=development
```

4. **Start the development server**
```bash
npm start
```

The application will open at `http://localhost:3000`

## 📖 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.js
│   ├── DashboardCard.js
│   ├── ChartComponent.js
│   ├── MapComponent.js
│   ├── AlertPanel.js
│   ├── Alert.js
│   ├── Button.js
│   ├── Input.js
│   ├── Card.js
│   ├── Dropdown.js
│   ├── Toast.js
│   ├── LoadingSpinner.js
│   └── ProtectedRoute.js
├── pages/               # Page components
│   ├── Login.js
│   ├── Dashboard.js
│   ├── Projects.js
│   └── Analytics.js
├── services/            # API service modules
│   ├── authService.js
│   ├── projectService.js
│   ├── riskService.js
│   └── alertService.js
├── hooks/               # Custom React hooks
│   ├── useApi.js
│   └── useAuth.js
├── context/             # Context API
│   └── AuthContext.js
├── utils/               # Utility functions
│   ├── api.js
│   ├── constants.js
│   └── helpers.js
├── data/                # Dummy data for testing
│   └── dummyData.js
├── App.js               # Main app component
├── index.js             # Entry point
└── index.css            # Global styles
```

## 🔐 Authentication

### Demo Accounts

The application includes demo accounts for testing:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | admin123 |
| Manager | manager@example.com | manager123 |
| Viewer | viewer@example.com | viewer123 |

## 📊 Dashboard Features

### Key Metrics
- Total Projects
- Average Risk Score
- High-Risk Projects Count
- Average Delay Probability

### Charts
- **Timeline Analysis**: Projected vs Actual project duration trends
- **District-wise Trends**: Risk analysis by district
- **State-wise Comparison**: Multi-metric state-level analysis
- **Delay Drivers**: Primary factors causing delays
- **Project Distribution**: Breakdown by project type

### Filters
- Filter by District
- Filter by State
- Filter by Project Type
- Search functionality

## 🗺️ Map Features

- Interactive map with project locations
- Color-coded risk indicators (Green, Yellow, Orange, Red)
- Popup information on marker click
- Responsive map sizing

## 📱 Components Documentation

### DashboardCard
Displays metric cards with optional trend indicators and risk scores.

```jsx
<DashboardCard
  title="Projects"
  value={42}
  icon={MapPin}
  trend={{ value: 12, direction: 'up', label: 'from last month' }}
/>
```

### ChartComponent
Universal chart component supporting line, bar, and pie charts.

```jsx
<ChartComponent
  type="line"
  data={timelineData}
  xAxisKey="month"
  dataKey={['projected', 'actual']}
  title="Timeline Analysis"
/>
```

### MapComponent
Interactive map for project location visualization.

```jsx
<MapComponent
  projects={projectList}
  center={[20.5937, 78.9629]}
  zoom={5}
/>
```

### AlertPanel
Manages and displays alerts with severity levels.

```jsx
<AlertPanel
  alerts={alerts}
  onMarkAsRead={handleRead}
  onDelete={handleDelete}
/>
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color theme:

```javascript
// Primary brand color
primary: { 500: '#0ea5e9', ... },
// Risk level colors
danger: { ... },
success: { ... },
warning: { ... },
```

### Typography
Modify font family in `tailwind.config.js`:

```javascript
fontFamily: {
  sans: ['Your-Font', 'system-ui', 'sans-serif'],
}
```

## 🔌 API Integration

### Services

All API calls are managed through service modules:

```javascript
// Authentication
import authService from './services/authService';
await authService.login(email, password);

// Projects
import projectService from './services/projectService';
const projects = await projectService.getProjects();

// Risk Analysis
import riskService from './services/riskService';
const risks = await riskService.getRiskScores();

// Alerts
import alertService from './services/alertService';
const alerts = await alertService.getAlerts();
```

### Backend Endpoints

Expected API structure:

```
POST   /api/auth/login
GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PUT    /api/projects/:id
DELETE /api/projects/:id
GET    /api/risk-scores
GET    /api/risk-scores/:id/delay-probability
GET    /api/analytics/district-trends
GET    /api/analytics/state-trends
GET    /api/analytics/delay-drivers
GET    /api/analytics/timeline/:id
GET    /api/alerts
GET    /api/alerts/unread-count
PUT    /api/alerts/:id/read
PUT    /api/alerts/mark-all-read
DELETE /api/alerts/:id
POST   /api/alerts
```

## ♿ Accessibility

- WCAG 2.1 Level AA compliant
- Keyboard navigation support
- ARIA labels on all interactive elements
- Color contrast ratios meet accessibility standards
- Focus indicators for keyboard users
- Screen reader friendly

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

## 📦 Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build` folder.

## 🐛 Troubleshooting

### Issue: Map not loading
- Ensure Leaflet CSS is loaded from CDN in `public/index.html`
- Check browser console for errors

### Issue: API calls failing
- Verify `REACT_APP_API_BASE_URL` in `.env.local`
- Check CORS configuration on backend
- Ensure backend server is running

### Issue: Styles not applying
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Rebuild Tailwind: `npm run build:css`

## 📚 Documentation

For detailed documentation on each component and service, see the inline comments in the source files.

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please follow the existing code style and submit pull requests to the main branch.

## 📞 Support

For issues and questions, please open an issue on GitHub.

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [TailwindCSS Docs](https://tailwindcss.com)
- [React Router Guide](https://reactrouter.com)
- [Recharts API](https://recharts.org)
- [Leaflet Documentation](https://leafletjs.com)

---

**Built with ❤️ for land acquisition management**
