"use client";
import "./page.module.css";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";
import "moment/min/locales";
import "./i18n";
import { useTranslation } from "react-i18next";

moment.locale("ar");

export default function Home() {
  const [language, setLanguage] = useState("ar");
  const { t, i18n } = useTranslation();
  const [dateAndTime, setDataAndTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState({
    name: "",
    number: null,
    description: "",
    min: null,
    max: null,
    icon: null,
  });

  function handleLanguageClick() {
    if(language == "ar"){
      setLanguage("en");
      i18n.changeLanguage("en");
    }else{
      setLanguage("ar");
      i18n.changeLanguage("ar");
    }
  }

  useEffect(() => {
    i18n.changeLanguage(language);
    moment.locale(language);
    setDataAndTime(moment().format("dddd YYYY/MM/DD"));
  }, [language]);

  useEffect(() => {
    setDataAndTime(moment().format("dddd YYYY/MM/DD"));
    const controller = new AbortController();
    
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=34.4658&lon=36.0364&appid=ce2bd5542b833da01a799759d3139b93&units=metric",
        {
          signal: controller.signal,
        }
      )
      .then((response) => {
        const name = response.data.name;
        const responseTemp = Math.round(response.data.main.temp);
        const min = Math.round(response.data.main.temp_min);
        const max = Math.round(response.data.main.temp_max);
        const description = response.data.weather[0].description;
        const responseIcon = response.data.weather[0].icon;
        setWeather({
          name: name,
          number: responseTemp,
          min: min,
          max: max,
          description: description,
          icon: responseIcon,
        });
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Request canceled");
        } else if (err.name === "CanceledError") {
          console.log("Request canceled by AbortController");
        } else {
          console.error(err);
        }
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  const cardStyle = {
    width: "100%",
    background: "linear-gradient(135deg, rgba(28, 52, 91, 0.9) 0%, rgba(58, 96, 155, 0.8) 50%, rgba(88, 128, 185, 0.7) 100%)",
    backdropFilter: "blur(10px)",
    color: "white",
    padding: "30px",
    borderRadius: "25px",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3), 0 5px 15px rgba(0, 0, 0, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s ease",
  };

  const backgroundStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    zIndex: -1,
  };

  const tempContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px 0",
    position: "relative",
  };

  const weatherIconStyle = {
    width: "120px",
    height: "120px",
    filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
    animation: "float 3s ease-in-out infinite",
  };

  const minMaxContainerStyle = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "15px",
    padding: "15px",
    margin: "20px 0",
    backdropFilter: "blur(5px)",
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "10px",
  };

  const languageButtonStyle = {
    background: "linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "20px",
    color: "white",
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    textTransform: "none",
  };

  const loadingStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "300px",
    fontSize: "18px",
  };

  // Add floating animation keyframes
  const floatingAnimation = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
  `;

  return (
    <div>
      <style>{floatingAnimation}</style>
      <div style={backgroundStyle}></div>
      <Container maxWidth="sm">
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "20px 0",
          }}
        >
          <div
            style={cardStyle}
            dir={language === "ar" ? "rtl" : "ltr"}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.3), 0 5px 15px rgba(0, 0, 0, 0.2)";
            }}
          >
            {loading ? (
              <div style={loadingStyle}>
                <Typography variant="h6" style={{ opacity: 0.8 }}>
                  {t("Loading weather data...")}
                </Typography>
              </div>
            ) : (
              <div>
                <div style={headerStyle} dir={language === "ar" ? "rtl" : "ltr"}>
                  <div>
                    <Typography 
                      variant="h3" 
                      style={{ 
                        fontWeight: "300", 
                        marginBottom: "5px",
                        textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)" 
                      }}
                    >
                      {t(weather.name)}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      style={{ 
                        opacity: 0.9,
                        fontWeight: "400" 
                      }}
                    >
                      {dateAndTime}
                    </Typography>
                  </div>
                  <CloudIcon 
                    style={{ 
                      fontSize: "60px", 
                      color: "rgba(255, 255, 255, 0.8)",
                      filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))" 
                    }} 
                  />
                </div>

                <div 
                  style={{
                    height: "2px",
                    background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)",
                    margin: "25px 0",
                    borderRadius: "1px",
                  }}
                ></div>

                <div style={tempContainerStyle}>
                  <Typography 
                    variant="h1" 
                    style={{ 
                      fontSize: "4.5rem",
                      fontWeight: "200",
                      textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                      margin: "0 20px 0 0" 
                    }}
                  >
                    {weather.number}°
                  </Typography>
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt="Weather Icon"
                    style={weatherIconStyle}
                  />
                </div>

                <Typography 
                  variant="h5" 
                  style={{ 
                    textAlign: "center", 
                    marginBottom: "20px",
                    fontWeight: "300",
                    textTransform: "capitalize",
                    opacity: 0.95 
                  }}
                >
                  {t(weather.description)}
                </Typography>

                <div style={minMaxContainerStyle}>
                  <div style={{ textAlign: "center" }}>
                    <Typography variant="body2" style={{ opacity: 0.8, marginBottom: "5px" }}>
                      {t("Max")}
                    </Typography>
                    <Typography variant="h5" style={{ fontWeight: "600" }}>
                      {weather.max}°
                    </Typography>
                  </div>
                  
                  <div 
                    style={{ 
                      width: "1px", 
                      height: "40px", 
                      background: "rgba(255, 255, 255, 0.3)" 
                    }}
                  ></div>
                  
                  <div style={{ textAlign: "center" }}>
                    <Typography variant="body2" style={{ opacity: 0.8, marginBottom: "5px" }}>
                      {t("Min")}
                    </Typography>
                    <Typography variant="h5" style={{ fontWeight: "600" }}>
                      {weather.min}°
                    </Typography>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            dir={language === "ar" ? "rtl" : "ltr"}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
              marginTop: "20px",
            }}
          >
            <Button
              style={languageButtonStyle}
              variant="text"
              onClick={handleLanguageClick}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(45deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2))";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))";
                e.currentTarget.style.transform = "translateY(0px)";
              }}
            >
              {language === "ar" ? "English" : "عربي"}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}