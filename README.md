# Pediatric Growth Monitoring Tool - PWA Edition

**Developed by PediaLink**

A comprehensive, mobile-optimized Progressive Web App (PWA) for monitoring pediatric growth using WHO (0-5 years) and IAP (5-18 years) standards.

## 🌟 Features

### 📊 Growth Charts
- **Weight-for-Age** (0-18 years)
- **Height-for-Age** (0-18 years)
- **Weight-for-Height** (65-120 cm, WHO standard)
- **BMI-for-Age** (0-5 years, WHO standard)
- **Head Circumference** (0-24 months, WHO standard)

### 📱 Mobile Optimized
- Responsive design for all screen sizes
- Touch-friendly interface
- Optimized input fields for mobile keyboards
- Horizontal scroll for chart selection
- Collapsible sections on mobile

### 🔄 Real-Time Updates
- Charts update dynamically as you type
- No need to click "Calculate" button
- Instant visual feedback
- Live data point plotting

### 💾 PWA Features
- **Install on home screen** (iOS, Android, Desktop)
- **Offline functionality** - Works without internet
- **Fast loading** - Cached for instant access
- **App-like experience** - Full screen mode
- **Push notifications ready** - For reminders (future feature)

## 📥 Installation

### For Developers

1. **Clone or Download** all files to a directory:
   ```
   ├── index.html
   ├── pediatric-growth-tool.jsx
   ├── manifest.json
   ├── service-worker.js
   └── icons/ (create this folder)
       ├── icon-72x72.png
       ├── icon-96x96.png
       ├── icon-128x128.png
       ├── icon-144x144.png
       ├── icon-152x152.png
       ├── icon-192x192.png
       ├── icon-384x384.png
       └── icon-512x512.png
   ```

2. **Create App Icons**:
   - Use a tool like [PWA Asset Generator](https://github.com/elegantapp/pwa-asset-generator) or
   - Use [Favicon.io](https://favicon.io/) to generate icons
   - Create a logo with:
     - Background: #4f46e5 (indigo)
     - Icon: Medical/pediatric themed symbol
     - Text: "PL" or pediatric icon
   - Generate all required sizes (72x72 to 512x512)

3. **Test Locally**:
   ```bash
   # Use any static server, for example:
   python -m http.server 8000
   # or
   npx serve
   ```

4. **Deploy**:
   - Upload all files to your web host
   - Ensure HTTPS is enabled (required for PWA)
   - Test PWA features at: https://your-domain.com

### For Users

#### Android:
1. Open the app in Chrome
2. Tap the menu (⋮) → "Install app" or "Add to Home screen"
3. Confirm installation
4. App will appear on your home screen

#### iOS (iPhone/iPad):
1. Open the app in Safari
2. Tap the Share button (□↑)
3. Scroll down and tap "Add to Home Screen"
4. Name it "PediaLink Growth"
5. Tap "Add"
6. App will appear on your home screen

#### Desktop (Chrome/Edge):
1. Open the app in browser
2. Look for install icon in address bar
3. Click "Install"
4. App opens in its own window

## 🚀 How to Use

### Input Data:
1. **Age**: Enter in years or months
2. **Gender**: Select Male or Female
3. **Weight**: Enter in kilograms (kg)
4. **Height**: Enter in centimeters (cm)
5. **Head Circumference** (optional): For children 0-2 years

### View Results:
- **Summary Cards**: Quick overview of key metrics
- **Detailed Measurements**: All percentiles and Z-scores
- **Growth Charts**: Visual representation with your child's data point
- **Interpretation**: Clinical guidance and recommendations

### Switch Charts:
- Tap chart buttons to view different growth parameters
- Horizontal scroll on mobile for all options
- Charts update instantly with your data

## 📊 Understanding Results

### Percentiles:
- **<3rd**: Below normal - needs evaluation
- **3rd-15th**: Low normal - monitor closely
- **15th-85th**: Normal range
- **85th-97th**: High normal - monitor
- **>97th**: Above normal - evaluate

### Z-Scores:
- **< -2**: Significantly below average
- **-2 to +2**: Normal range (95% of children)
- **> +2**: Significantly above average

### BMI Categories (IAP for Indian children):
- **< 17**: Thinness
- **17-23**: Normal
- **23-27**: Overweight
- **> 27**: Obese

## 🔧 Technical Specifications

### Standards Used:
- **WHO Child Growth Standards (2006)**: 0-5 years
- **IAP Growth Charts (2015)**: 5-18 years
- **Weight-for-Height**: WHO standard, 65-120 cm
- **BMI-for-Age**: WHO standard, 0-5 years
- **Head Circumference**: WHO standard, 0-24 months

### Browser Support:
- ✅ Chrome 90+ (Android, Desktop)
- ✅ Safari 14+ (iOS, macOS)
- ✅ Edge 90+
- ✅ Firefox 88+
- ✅ Samsung Internet 14+

### PWA Features:
- Service Worker caching
- Offline functionality
- Install prompts
- Background sync ready
- Push notifications ready (future)

## 🛠️ Customization

### Update Colors:
Edit the theme color in `manifest.json` and `index.html`:
```json
"theme_color": "#4f46e5"  // Change to your brand color
```

### Add Analytics:
Add your Google Analytics code in `index.html` at the bottom:
```javascript
gtag('config', 'YOUR-GA-ID');
```

### Modify Cache Strategy:
Edit `service-worker.js` to change caching behavior:
```javascript
const CACHE_NAME = 'pedialink-growth-v1.0.0';
```

## 📋 File Structure

```
/
├── index.html              # Main HTML with PWA integration
├── pediatric-growth-tool.jsx  # React component
├── manifest.json           # PWA manifest
├── service-worker.js       # Service worker for offline
├── icons/                  # App icons (all sizes)
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png
│   ├── icon-384x384.png
│   └── icon-512x512.png
└── splash/                 # iOS splash screens (optional)
    ├── launch-640x1136.png
    ├── launch-750x1334.png
    ├── launch-1242x2208.png
    └── launch-1125x2436.png
```

## 🔒 Privacy & Security

- **No data collection**: All calculations done locally
- **No tracking**: No user data sent to servers
- **HTTPS required**: Secure connection for PWA features
- **Offline capable**: Works without internet after first load
- **No external dependencies**: Growth data embedded in app

## ⚠️ Medical Disclaimer

This tool is for **educational purposes only**. It should not replace professional medical advice, diagnosis, or treatment. Always consult a qualified pediatrician or healthcare provider for:
- Medical diagnosis
- Treatment plans
- Growth concerns
- Health decisions

## 📱 Quick Start Checklist

- [ ] Upload all files to web hosting
- [ ] Create and add app icons (all sizes)
- [ ] Enable HTTPS on your domain
- [ ] Test PWA features (install, offline)
- [ ] Test on multiple devices (iOS, Android)
- [ ] Verify service worker registration
- [ ] Test offline functionality
- [ ] Submit to app stores (optional)

## 🆘 Troubleshooting

### PWA not installing?
- Ensure HTTPS is enabled
- Check browser console for errors
- Verify manifest.json is accessible
- Confirm service worker registered

### Charts not displaying?
- Check internet connection (first load)
- Verify React and Recharts loaded
- Check browser console for errors

### Offline mode not working?
- Visit site once while online
- Check service worker in DevTools
- Clear cache and try again

## 📞 Support

For issues or questions:
- Email: support@pedialink.com (example)
- Documentation: [Link to docs]
- GitHub Issues: [Repository link]

## 📄 License

Copyright © 2024 PediaLink. All rights reserved.

---

**Developed by PediaLink** - Professional Pediatric Solutions

Version 1.0.0 | Last Updated: 2024
