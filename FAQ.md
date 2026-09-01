# Frequently Asked Questions

## Installation & Setup

### Q: What are the system requirements?
**A:** Node.js v14+ and npm v6+. Works on Windows, Mac, Linux.

### Q: Can I use Yarn instead of npm?
**A:** Yes! Use `yarn` for all commands.

### Q: Port 3000 is already in use?
**A:** Use different port: `PORT=3001 npm start`

## Features & Functionality

### Q: How do I connect my backend?
**A:** Update `.env.local` with your API URL and replace dummy data with API calls.

### Q: How do I customize colors?
**A:** Edit `tailwind.config.js` and update the color values.

### Q: How do I add new pages?
**A:** Create in `src/pages/`, add route in `App.js`, link in `Navbar.js`.

## Maps & Charts

### Q: Map not displaying?
**A:** Verify Leaflet CSS in `public/index.html` and check project coordinates.

### Q: Can I add different chart types?
**A:** Yes, `ChartComponent` supports line, bar, and pie charts.

## Authentication

### Q: What demo credentials are available?
**A:**
- Admin: admin@example.com / admin123
- Manager: manager@example.com / manager123
- Viewer: viewer@example.com / viewer123

### Q: How do I implement real auth?
**A:** Update `authService.js` to call your backend.

## Deployment

### Q: What's the easiest way to deploy?
**A:** Vercel - connect your GitHub repo for auto-deploy.

### Q: Do I need a backend to deploy?
**A:** No, deploy frontend standalone and connect backend later.

### Q: How to set production environment variables?
**A:** Use platform's environment variables section, not in code.

## Performance

### Q: How can I improve performance?
**A:** Enable server compression, use CDN, optimize images, implement caching.

### Q: How to check bundle size?
**A:** Run `npm run build` and analyze with source-map-explorer.

## Styling

### Q: How do I add custom CSS?
**A:** Add to `src/index.css` or create component-specific styles.

### Q: How do I change fonts?
**A:** Update `fontFamily` in `tailwind.config.js`.

## Accessibility

### Q: Is this WCAG compliant?
**A:** Yes, WCAG 2.1 Level AA with keyboard navigation and ARIA labels.

## Data & Database

### Q: Can I use a real database?
**A:** Yes, create API services to fetch from your backend.

### Q: How do I export data?
**A:** Add export functions in services.

## Security

### Q: Should I commit .env files?
**A:** No! Use `.env.example` as template.

### Q: How to protect API keys?
**A:** Store as environment variables, use backend proxies.

## Troubleshooting

### Q: Blank page after deployment?
**A:** Check console errors, verify .env vars, clear cache, check network tab.

### Q: Styles not loading?
**A:** Restart dev server, clear node_modules, check CSS errors.

### Q: API calls failing?
**A:** Verify API URL, check CORS config, ensure backend running, check network tab.

## Contributing

### Q: How do I contribute?
**A:** See `CONTRIBUTING.md` for guidelines.

### Q: Is this open source?
**A:** Yes, MIT licensed - free for commercial use.

### Q: How do I report bugs?
**A:** Open GitHub issue with reproduction steps.

---

**Need more help?** Check the documentation or open an issue on GitHub.
