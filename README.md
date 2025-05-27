# 🌦️ Weather Dashboard - React + MUI + i18next

A modern and responsive weather application built with **React**, **Material UI**, and the **OpenWeatherMap API**. Supports both **Arabic** and **English** languages, with animated weather icons and a sleek glassmorphism UI.

---

## 🚀 Features

- Real-time weather updates using OpenWeatherMap API
- Multilingual support: Arabic (RTL) and English (LTR)
- Beautiful and animated user interface
- Live date display with `moment.js`
- Language toggle button
- Responsive design for all devices

---

## 🛠️ Technologies Used

- React.js
- Material UI
- Axios
- i18next with HTTP backend and language detector
- Moment.js
- CSS Animations
- OpenWeatherMap API

---

## 📦 Installation & Usage

### 1. Clone the repository

```bash
git clone https://github.com/your-username/weather-dashboard.git
cd weather-dashboard

2. Install the dependencies

npm install

3. Get an API key from OpenWeatherMap

Go to https://openweathermap.org/api
Create a free account
Navigate to the API Keys section in your dashboard
Copy your API key

4. Replace the API key in the code

Open this file:
src/app/page.tsx
https://api.openweathermap.org/data/2.5/weather?lat=34.4658&lon=36.0364&appid={YOUR-ID}&units=metric
Replace {YOUR-ID} with your own API key.
And add your lat and kon of your country.

5. Run the app
npm run dev


To change the weather location, update the latitude (lat) and longitude (lon) in the API URL.
Example (Beirut):
lat=33.8938&lon=35.5018

📌 To Do (Optional)

Add geolocation support
Display hourly and weekly forecasts
Add theme switch (dark/light mode)
Improve accessibility


