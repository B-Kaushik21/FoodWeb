import { useNavigate } from "react-router-dom";

// src/pages/Home.jsx
export const Home = () => {
  const navigate = useNavigate();

  const scrollToServices = () => {
    navigate('/dashboard'); //redirect to dashboard
  };

  return (
    <>
      <section className="bg-green-100 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to FoodWeb</h1>
        <p className="text-lg mb-6">
          Your go-to platform for booking top-rated chefs and staff for events,
          parties, and special occasions.
        </p>
        <button
          onClick={scrollToServices}
          className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
        >
          Book Now
        </button>
      </section>

      <section id="services" className="py-10 px-6 bg-green-100">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Chef Booking',
              desc: 'Hire professional chefs for private events and celebrations.'
            },
            {
              title: 'Waitstaff',
              desc: 'Book skilled waiters and serving staff on demand.'
            },
            {
              title: 'Catering Management',
              desc: 'End-to-end catering assistance for your events.'
            },
            {
              title: 'Event Planning',
              desc: 'Plan your entire event with staff, food, and decor.'
            },
            {
              title: 'Custom Menus',
              desc: 'Get customized menus curated by expert chefs.'
            },
            {
              title: 'Cart & Bookings',
              desc: 'Easily view your cart and previous bookings.'
            }
          ].map((service, i) => (
            <div
              key={i}
              className="p-4 border rounded shadow hover:shadow-md bg-white"
            >
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
