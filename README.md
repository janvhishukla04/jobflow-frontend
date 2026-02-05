# JobFlow - Job Application Tracker

A simple and elegant web application to track your job applications. Built with vanilla HTML, CSS, and JavaScript.

## 🚀 Features

- **User Authentication**: Secure login system
- **Add Applications**: Track company, role, status, and application date
- **Edit & Update**: Modify existing applications
- **Delete Applications**: Remove applications you no longer need
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Beautiful UI**: Modern gradient design with smooth animations

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend API**: FastAPI (Python) - [Backend Repository](https://github.com/janvhishukla04/jobflow-backend)
- **Deployment**: Vercel (Frontend) + Render (Backend)

## 📦 Project Structure

```
jobflow-frontend/
├── index.html          # Main HTML file
├── style.css           # Styling and animations
├── script.js           # JavaScript logic and API calls
├── vercel.json         # Vercel deployment configuration
└── README.md           # Project documentation
```

## 🌐 Live Demo

- **Frontend**: [Your Vercel URL will be here]
- **Backend API**: https://jobflow-backend-7wjj.onrender.com
- **API Documentation**: https://jobflow-backend-7wjj.onrender.com/docs

## 🚀 Deployment Instructions

### Deploy to Vercel

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   - Follow the prompts
   - Select "Set up and deploy"
   - Choose your project directory
   - Confirm deployment settings

4. **Production Deployment**:
   ```bash
   vercel --prod
   ```

### Alternative: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect settings
5. Click "Deploy"

### Deploy to GitHub Pages (Alternative)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/jobflow-frontend.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings
   - Navigate to "Pages"
   - Select "main" branch
   - Click "Save"

## 🔧 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/jobflow-frontend.git
   cd jobflow-frontend
   ```

2. **Open with Live Server**:
   - Use VS Code Live Server extension
   - Or use Python: `python -m http.server 8080`
   - Or use Node: `npx http-server`

3. **Access the app**:
   - Open `http://localhost:8080` in your browser

## 🔌 API Integration

The frontend connects to the backend API hosted at:
```
https://jobflow-backend-7wjj.onrender.com
```

### Available Endpoints:

- `POST /login` - User authentication
- `GET /jobs` - Fetch all job applications
- `POST /jobs` - Create new job application
- `PUT /jobs/{id}` - Update job application
- `DELETE /jobs/{id}` - Delete job application

## 📝 Environment Variables

No environment variables needed for the frontend. The API URL is hardcoded in `script.js`:

```javascript
const API_URL = "https://jobflow-backend-7wjj.onrender.com";
```

## 🎨 Customization

### Change Colors:
Edit the gradient in `style.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Modify API URL:
Update `script.js`:
```javascript
const API_URL = "your-backend-url-here";
```

## 🐛 Troubleshooting

### CORS Issues:
- Ensure your backend allows CORS from your frontend domain
- Backend should include proper CORS middleware

### API Not Responding:
- Check if backend is running: https://jobflow-backend-7wjj.onrender.com/docs
- Render free tier may sleep after inactivity (first request takes ~30s)

### Jobs Not Loading:
- Open browser console (F12) to check for errors
- Verify API URL is correct
- Check network tab for failed requests

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 👨‍💻 Author

Built with ❤️ by [Your Name]

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

⭐ Star this repo if you find it helpful!
