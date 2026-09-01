# Quick Start Guide

## 🚀 Get Running in 5 Minutes

### 1. Clone & Install
```bash
git clone https://github.com/shubhanshuambashta-code/ai-land-acquisition-predictor.git
cd ai-land-acquisition-predictor
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
```

### 3. Start Development Server
```bash
npm start
```

The app opens at `http://localhost:3000`

### 4. Login with Demo Account
- **Email**: admin@example.com
- **Password**: admin123

## 📊 What You'll See

### Dashboard
- Key metrics and risk scores
- Interactive charts and maps
- Recent alerts
- Filter by district/state

### Projects
- View all land acquisition projects
- Create, edit, delete projects
- Search and filter functionality
- Risk assessment cards

### Analytics
- District and state-wise trends
- Delay driver analysis
- Comprehensive reporting
- Export options

## 🔧 Customization

### Change Theme Colors
Edit `tailwind.config.js`:
```javascript
primary: {
  500: '#0ea5e9',  // Change this to your brand color
}
```

### Connect Real Backend
Update `.env.local`:
```env
REACT_APP_API_BASE_URL=http://your-api.com/api
```

Then replace dummy data in components with actual API calls.

## 📁 Key Files

- `src/App.js` - Main routing
- `src/pages/Dashboard.js` - Main dashboard
- `src/components/` - Reusable components
- `src/services/` - API communication
- `tailwind.config.js` - Theme configuration

## 🆘 Troubleshooting

**Port 3000 in use?**
```bash
PORT=3001 npm start
```

**Dependencies not installing?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Styles not showing?**
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server

## 📚 Next Steps

1. Explore `/src/pages` to understand page structure
2. Check `/src/components` for reusable UI components
3. Review `/src/services` for API integration patterns
4. Read `SETUP.md` for detailed installation
5. Check inline code comments for more details

## 🎯 Common Tasks

### Add a New Page
1. Create file in `src/pages/`
2. Add route in `src/App.js`
3. Add navigation link in `src/components/Navbar.js`

### Add a New Component
1. Create file in `src/components/`
2. Import and use in pages

### Add API Integration
1. Create service in `src/services/`
2. Use `useApi` hook to fetch data
3. Handle loading and error states

## 💡 Tips

- Use Recharts for charts
- Use Leaflet for maps
- Use TailwindCSS for styling
- Use context API for state management
- Check browser console for errors

## 📖 Documentation

- [React Docs](https://react.dev)
- [TailwindCSS Docs](https://tailwindcss.com)
- [Recharts Examples](https://recharts.org)
- [Leaflet Guide](https://leafletjs.com)

## 🤝 Need Help?

Check the code comments, explore similar components, or open an issue on GitHub.

---

**Happy coding! 🎉**
