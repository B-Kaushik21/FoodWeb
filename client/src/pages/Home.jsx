import { useNavigate } from "react-router-dom";
import { 
  FaUtensils, FaUsers, FaCalendarAlt, FaStar, 
  FaPhone, FaEnvelope, FaMapMarkerAlt 
} from "react-icons/fa";
import logo from "../assets/logo.png"; // ✅ add logo import

export const Home = () => {
  const navigate = useNavigate();

  const scrollToServices = () => {
    navigate("/dashboard");
  };

  const features = [
    {
      icon: <FaUtensils className="text-4xl text-orange-500" />,
      title: "Professional Chefs",
      desc: "Hire certified chefs with years of culinary experience for your special events.",
    },
    {
      icon: <FaUsers className="text-4xl text-blue-500" />,
      title: "Skilled Waitstaff",
      desc: "Professional serving staff to ensure your event runs smoothly.",
    },
    {
      icon: <FaCalendarAlt className="text-4xl text-green-500" />,
      title: "Easy Booking",
      desc: "Simple and quick booking process with instant confirmation.",
    },
  ];

  const testimonials = [
    {
      name: "Kaushik B",
      role: "Event Planner",
      content: "FoodWeb made our corporate event a huge success. The chef was exceptional!",
      rating: 4,
    },
    {
      name: "Srija C",
      role: "Wedding Couple",
      content: "Our wedding catering was perfect thanks to FoodWeb. Highly recommended!",
      rating: 5,
    },
    {
      name: "Neha",
      role: "Party Host",
      content: "The waitstaff was professional and the food was delicious. Great service!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed w-full top-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <img src={logo} alt="FoodWeb Logo" className="h-10" />
            <span className="text-xl font-bold text-gray-800">FoodWeb</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex gap-8 text-gray-700 font-medium">
            <button onClick={() => navigate("/")} className="hover:text-orange-600 transition">Home</button>
            <button onClick={() => navigate("/menu")} className="hover:text-orange-600 transition">Menu</button>
            <button onClick={() => navigate("/dashboard")} className="hover:text-orange-600 transition">Dashboard</button>
            <button onClick={() => navigate("/login")} className="hover:text-orange-600 transition">Login</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 to-red-600 text-white py-28">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Elevate Your Events
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Connect with top-rated chefs and professional staff for unforgettable dining experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToServices}
              className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105"
            >
              Book Your Chef Now
            </button>
            <button
              onClick={() => navigate('/menu')}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-orange-600 transition duration-300"
            >
              Explore Menu
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose FoodWeb?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We bring together the best culinary talent and professional service to make your events extraordinary
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive solutions for all your event needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Chef Booking',
                desc: 'Hire professional chefs for private events and celebrations.',
                color: 'from-orange-400 to-orange-600'
              },
              {
                title: 'Waitstaff',
                desc: 'Book skilled waiters and serving staff on demand.',
                color: 'from-blue-400 to-blue-600'
              },
              {
                title: 'Catering Management',
                desc: 'End-to-end catering assistance for your events.',
                color: 'from-green-400 to-green-600'
              },
              {
                title: 'Event Planning',
                desc: 'Plan your entire event with staff, food, and decor.',
                color: 'from-purple-400 to-purple-600'
              },
              {
                title: 'Custom Menus',
                desc: 'Get customized menus curated by expert chefs.',
                color: 'from-red-400 to-red-600'
              },
              {
                title: 'Cart & Bookings',
                desc: 'Easily view your cart and previous bookings.',
                color: 'from-indigo-400 to-indigo-600'
              }
            ].map((service, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-90`}></div>
                <div className="relative p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-lg opacity-90">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Do not just take our word for it</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-xl" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">&ldquo;{testimonial.content}&rdquo;</p>
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl opacity-90">Ready to make your event special?</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <FaPhone className="text-3xl mb-4 text-orange-500" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p>+1234567890</p>
            </div>
            <div className="flex flex-col items-center">
              <FaEnvelope className="text-3xl mb-4 text-orange-500" />
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p>hello@foodweb.com</p>
            </div>
            <div className="flex flex-col items-center">
              <FaMapMarkerAlt className="text-3xl mb-4 text-orange-500" />
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p>Badangpet, Hyderabad</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
