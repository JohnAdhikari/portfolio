import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaWrench, FaRocket, FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io5";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import profileImage from './assets/profileImage.png';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const bgColor = darkMode ? 'bg-black' : 'bg-gray-50';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const secondaryText = darkMode ? 'text-gray-300' : 'text-gray-600';
  const cardBg = darkMode ? 'bg-gray-900' : 'bg-white';
  const borderColor = darkMode ? 'border-white' : 'border-gray-900';

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} transition-colors duration-300`}>
      {/* Header */}
      <nav className={`fixed top-0 w-full z-50 ${darkMode ? 'bg-black/90' : 'bg-white/90'} backdrop-blur-sm px-8 py-4 shadow-lg`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold">Portfolio</div>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8">
            <li onClick={() => scrollToSection('home')} className="cursor-pointer transition-colors hover:text-blue-500">Home</li>
            <li onClick={() => scrollToSection('about')} className="cursor-pointer transition-colors hover:text-blue-500">About</li>
            <li onClick={() => scrollToSection('services')} className="cursor-pointer transition-colors hover:text-blue-500">Services</li>
            <li onClick={() => scrollToSection('contact')} className="cursor-pointer transition-colors hover:text-blue-500">Contact</li>
          </ul>

          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${darkMode ? 'bg-yellow-400 text-black' : 'bg-gray-800 text-yellow-400'} transition-all hover:scale-110`}
            >
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>

            <button className="hidden md:block px-6 py-2 bg-green-600 text-white rounded-lg font-bold shadow-lg transition-transform hover:scale-105">
              Hire Me
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden mt-4 pb-4 ${cardBg} rounded-lg`}>
            <ul className="flex flex-col gap-4 px-4">
              <li onClick={() => scrollToSection('home')} className="cursor-pointer py-2 border-b border-gray-700">Home</li>
              <li onClick={() => scrollToSection('about')} className="cursor-pointer py-2 border-b border-gray-700">About</li>
              <li onClick={() => scrollToSection('services')} className="cursor-pointer py-2 border-b border-gray-700">Services</li>
              <li onClick={() => scrollToSection('contact')} className="cursor-pointer py-2">Contact</li>
            </ul>
          </div>
        )}
      </nav>

      {/* Home Section */}
      <section id="home" className={`pt-24 px-8 min-h-screen flex items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16 w-full">
          <div className="flex-1 max-w-2xl">
            <h3 className="text-xl mb-2 animate-fade-in">Hi, I'm</h3>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-delay-1">John Adhikari</h1>
            <h2 className="text-2xl md:text-3xl mb-6 animate-fade-in-delay-2">Front End Web Developer</h2>
            <p className={`${secondaryText} mb-8 leading-relaxed animate-fade-in-delay-3`}>
              Motivated and self-taught Web Developer with strong fundamentals 
              in JavaScript, React, HTML, CSS, and Tailwind.
            </p>

            {/* Social Media */}
<div className="flex items-center gap-6 animate-fade-in-delay-4">
  <a
    href="https://www.facebook.com/jack.septiceye.31945"
    target="_blank"
    rel="noopener noreferrer"
    className={`w-12 h-12 border-2 ${borderColor} rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 ${darkMode ? 'hover:bg-white hover:text-black' : 'hover:bg-black hover:text-white'}`}
  >
    <FaFacebookF />
  </a>

  <a
    href="https://www.instagram.com/john_adhikarii/"
    target="_blank"
    rel="noopener noreferrer"
    className={`w-12 h-12 border-2 ${borderColor} rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 ${darkMode ? 'hover:bg-white hover:text-black' : 'hover:bg-black hover:text-white'}`}
  >
    <FaInstagram />
  </a>

  <a
    href="https://www.linkedin.com/in/your_profile"
    target="_blank"
    rel="noopener noreferrer"
    className={`w-12 h-12 border-2 ${borderColor} rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 ${darkMode ? 'hover:bg-white hover:text-black' : 'hover:bg-black hover:text-white'}`}
  >
    <FaLinkedinIn />
  </a>

  <a
    href="https://github.com/JohnAdhikari"
    target="_blank"
    rel="noopener noreferrer"
    className={`w-12 h-12 border-2 ${borderColor} rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 ${darkMode ? 'hover:bg-white hover:text-black' : 'hover:bg-black hover:text-white'}`}
  >
    <IoLogoGithub />
  </a>
</div>

          </div>

          {/* Profile Image */}
          <div className="flex-shrink-0 animate-fade-in-delay-2">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full shadow-2xl overflow-hidden border-4 border-white/20">
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>  
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`px-8 py-20 min-h-screen flex items-center ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-4xl font-bold mb-12 text-center">About Me</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Technical Skills */}
            <div className={`${cardBg} p-8 rounded-xl shadow-xl`}>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FaWrench className="text-blue-400" />
                Technical Skills
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg mb-2">Frontend</h4>
                  <p className={secondaryText}>HTML, CSS, Tailwind CSS, JavaScript (ES6+), React (learning)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Tools & Others</h4>
                  <p className={secondaryText}>Git & GitHub, VS Code, NPM</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Soft Skills</h4>
                  <p className={secondaryText}>Problem-solving, collaboration, communication, adaptability</p>
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className={`${cardBg} p-8 rounded-xl shadow-xl`}>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FaRocket className="text-purple-400" />
                Projects
              </h3>
              <div className="space-y-4">
                <div className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg hover:scale-105 transition-transform`}>
                  <a href="#" className="text-purple-400 hover:text-purple-300 text-lg font-medium">
                    E-commerce UI
                  </a>
                  <p className={`${secondaryText} text-sm mt-1`}>Work in Progress</p>
                </div>
                <div className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg hover:scale-105 transition-transform`}>
                  <a 
                    href="https://johnadhikari.github.io/Calculator-App/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 text-lg font-medium"
                  >
                    Calculator App
                  </a>
                  <p className={`${secondaryText} text-sm mt-1`}>Functional calculator built with HTML, CSS, JS</p>
                </div>
                <div className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg hover:scale-105 transition-transform`}>
                  <a 
                    href="https://johnadhikari.github.io/Quote-App/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 text-lg font-medium"
                  >
                    Quote App
                  </a>
                  <p className={`${secondaryText} text-sm mt-1`}>Random quote generator application</p>
                </div>
                <div className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg hover:scale-105 transition-transform`}>
                  <a href="#" className="text-purple-400 hover:text-purple-300 text-lg font-medium">
                    Social Media Clone
                  </a>
                  <p className={`${secondaryText} text-sm mt-1`}>Work in Progress</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="px-8 py-20 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-4xl font-bold mb-12 text-center">My Services</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`${cardBg} p-8 rounded-xl shadow-xl hover:scale-105 transition-transform`}>
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold mb-4">Web Design</h3>
              <p className={secondaryText}>
                Creating beautiful, modern, and responsive web designs that capture your brand's essence and engage your audience.
              </p>
            </div>

            <div className={`${cardBg} p-8 rounded-xl shadow-xl hover:scale-105 transition-transform`}>
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-2xl font-bold mb-4">Web Development</h3>
              <p className={secondaryText}>
                Building functional and efficient websites using modern technologies like React, JavaScript, and Tailwind CSS.
              </p>
            </div>

            <div className={`${cardBg} p-8 rounded-xl shadow-xl hover:scale-105 transition-transform`}>
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-2xl font-bold mb-4">Responsive Design</h3>
              <p className={secondaryText}>
                Ensuring your website looks perfect and functions flawlessly on all devices, from mobile phones to desktop computers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`px-8 py-20 min-h-screen flex items-center ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl font-bold mb-12 text-center">Get In Touch</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className={`${cardBg} p-6 rounded-xl shadow-lg flex items-center gap-4`}>
                <div className="text-3xl text-blue-400">
                  <MdEmail />
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className={secondaryText}>johnadhikari99@gmail.com</p>
                </div>
              </div>

              <div className={`${cardBg} p-6 rounded-xl shadow-lg flex items-center gap-4`}>
                <div className="text-3xl text-green-400">
                  <MdPhone />
                </div>
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className={secondaryText}>+977 9849099677</p>
                </div>
              </div>

              <div className={`${cardBg} p-6 rounded-xl shadow-lg flex items-center gap-4`}>
                <div className="text-3xl text-purple-400">
                  <MdLocationOn />
                </div>
                <div>
                  <h4 className="font-semibold">Location</h4>
                  <p className={secondaryText}>Kathmandu, Nepal</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={`${cardBg} p-8 rounded-xl shadow-xl`}>
              <form className="space-y-4">
                <div>
                  <label className="block mb-2 font-medium">Name</label>
                  <input 
                    type="text" 
                    className={`w-full px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Email</label>
                  <input 
                    type="email" 
                    className={`w-full px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Message</label>
                  <textarea 
                    rows="4"
                    className={`w-full px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-black' : 'bg-gray-900'} text-white py-8 text-center`}>
        <p>© {new Date().getFullYear()} John Adhikari. All rights reserved.</p>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-fade-in-delay-1 {
          animation: fadeIn 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }
        
        .animate-fade-in-delay-2 {
          animation: fadeIn 0.6s ease-out 0.4s forwards;
          opacity: 0;
        }
        
        .animate-fade-in-delay-3 {
          animation: fadeIn 0.6s ease-out 0.6s forwards;
          opacity: 0;
        }
        
        .animate-fade-in-delay-4 {
          animation: fadeIn 0.6s ease-out 0.8s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

export default App;