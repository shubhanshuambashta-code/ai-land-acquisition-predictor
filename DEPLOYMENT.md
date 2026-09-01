# Deployment Guide

## 🚀 Deployment Options

### 1. Vercel (Recommended)

**Pros**: Free tier, automatic deployments, serverless functions

#### Steps:

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Configure Environment**
   - Go to Vercel Dashboard
   - Project Settings → Environment Variables
   - Add `REACT_APP_API_BASE_URL` and other variables

4. **Automatic Deployments**
   - Connect GitHub repository
   - Push to main branch auto-deploys

### 2. Netlify

**Pros**: Simple setup, great build tools, free tier

#### Steps:

1. **Build locally**
```bash
npm run build
```

2. **Drag and drop**
   - Go to netlify.com
   - Drag `build/` folder to Netlify

3. **Or connect Git**
   - Connect GitHub repository
   - Build command: `npm run build`
   - Publish directory: `build`

### 3. GitHub Pages

**Pros**: Free, tight GitHub integration

#### Steps:

1. **Update package.json**
```json
"homepage": "https://yourusername.github.io/ai-land-acquisition-predictor"
```

2. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

3. **Deploy**
```bash
npm run deploy
```

### 4. Docker

#### Dockerfile
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
```

## 🔐 Environment Configuration

```env
REACT_APP_API_BASE_URL=https://api.yourdomain.com/api
REACT_APP_ENV=production
REACT_APP_AUTH_PROVIDER=oauth
```

## ✅ Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Environment variables configured
- [ ] API endpoints verified
- [ ] HTTPS enabled
- [ ] CORS configured on backend
- [ ] Performance optimized (Lighthouse score > 90)
- [ ] Accessibility tested (WCAG AA)
- [ ] Mobile responsiveness tested
- [ ] Security audit passed
- [ ] Monitoring and alerts configured

## 🔍 Performance Optimization

### Build Optimization
```bash
npm run build
```

### Enable Gzip Compression (Nginx)
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

### Caching Strategy
```nginx
location ~* \.(js|css|png|jpg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

---

**For detailed deployment instructions, see the full DEPLOYMENT.md file in the repository.**
