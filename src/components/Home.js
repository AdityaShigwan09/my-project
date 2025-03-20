import React, { useState, useEffect } from 'react';
import { getCurrentUserRole } from '../services/AuthService';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/Home.css';

// Import images directly from src/images
import slider1 from '../img/slide2.jpg';
import slider2 from '../img/slide3.jpg';
import slider3 from '../img/slide1.avif';
// import logo from '../img/slide1.avif'; // Import the logo image

const SliderClip = () => {
  const slides = [
    {
      title: "",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      link: "#about",
      linkText: "More about us",
      image: slider1, // Assign image import
    },
    {
      title: "",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      link: "#",
      linkText: "View Issues",
      image: slider2,
    },
    {
      title: "",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      link: "#",
      linkText: "View Issues",
      image: slider3,
    },
  ];

  const [current, setCurrent] = useState(0);
  const totalSlides = slides.length;
  const autoPlay = true;
  const timeTrans = 4000; // transition time in milliseconds

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
    }, timeTrans);
    return () => clearInterval(interval);
  }, [autoPlay, totalSlides]);

  return (
    <section className="slider-container">
      <ul className="slider">
        {slides.map((slide, index) => (
          <li 
            key={index} 
            className={`slide ${index === current ? 'current' : ''}`} 
            style={{
              backgroundImage: `linear-gradient(300deg, rgba(1,1,1,1) 10%, rgba(1,1,1,0.8) 50%, rgba(1,1,1,0.2) 60%), url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <article className="center-y padding_2x">
              <h3 className="big title">{slide.title}</h3>
              <p>{slide.text}</p>
              <a href={slide.link} className="btn btn_3 btn1">
                {slide.linkText}
              </a>
            </article>
          </li>
        ))}
      </ul>
      <aside className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={index === current ? "current_dot" : ""}
            onClick={() => setCurrent(index)}
          />
        ))}
      </aside>
    </section>
  );
};

const Home = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const userRole = getCurrentUserRole();
    if (userRole === 'admin') {
      setMessage('Admin logged in');
    } else if (userRole === 'customer') {
      setMessage('Customer logged in');
    }
  }, []);

  return (
    <div className="back-yellow">
      <header>
        <SliderClip />
      </header>
      <div className="jumbotron">
        <div className="text-container">
          <h1 className="display-4 welcome">Welcome to the Online Pet Shop</h1>
          <p className="lead">Browse and buy pets online!</p>
          {message && <p>{message}</p>}
        </div>
        <div className="image-container">
          {/* <img src={logo} alt="logo" /> */}

        </div>
      </div>
    </div>
  );
};

export default Home;
