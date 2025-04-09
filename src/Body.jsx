import React from "react";
import {
  FaUserMd,
  FaHospital,
  FaAmbulance,
  FaClock,
  FaStethoscope,
  FaHeartbeat,
  FaBrain,
  FaTooth,
  FaLungs,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaMicroscope,
  FaWheelchair,
  FaFlask,
} from "react-icons/fa";
import { BiPulse } from "react-icons/bi";
import { RiMentalHealthFill, RiMedicineBottleLine } from "react-icons/ri";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";

function Body() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const features = [
    {
      icon: <FaHeartbeat className="w-12 h-12 text-blue-600 mx-auto" />,
      title: "Cardiologie Spécialisée",
      description:
        "Une équipe de cardiologues experts dédiée à votre santé cardiaque.",
    },
    {
      icon: <FaStethoscope className="w-12 h-12 text-blue-600 mx-auto" />,
      title: "Suivi Personnalisé",
      description:
        "Surveillance continue et ajustement de votre traitement cardiaque.",
    },
    {
      icon: <FaAmbulance className="w-12 h-12 text-blue-600 mx-auto" />,
      title: "Urgences Cardiaques 24/7",
      description:
        "Intervention rapide en cas d'urgence cardiaque à tout moment.",
    },
    {
      icon: <FaMicroscope className="w-12 h-12 text-blue-600 mx-auto" />,
      title: "Diagnostics Cardiaques",
      description: "Tests cardiaques avancés et diagnostics précis.",
    },
  ];

  const specialties = [
    {
      icon: <FaHeartbeat />,
      name: "Cardiologie Générale",
      description: "Consultation et suivi des maladies cardiovasculaires",
    },
    {
      icon: <FaStethoscope />,
      name: "Rythmologie",
      description: "Traitement des troubles du rythme cardiaque",
    },
    {
      icon: <BiPulse />,
      name: "Hypertension",
      description: "Prise en charge de l'hypertension artérielle",
    },
    {
      icon: <FaHeartbeat />,
      name: "Insuffisance Cardiaque",
      description: "Suivi spécialisé de l'insuffisance cardiaque",
    },
    {
      icon: <FaMicroscope />,
      name: "Examens Cardiaques",
      description: "Échographies, ECG, tests d'effort",
    },
    {
      icon: <FaUserMd />,
      name: "Cardiologie Interventionnelle",
      description: "Procédures cardiaques mini-invasives",
    },
  ];

  const stats = [
    {
      icon: <FaUserMd />,
      number: "25+",
      text: "Cardiologues Spécialistes",
    },
    {
      icon: <BiPulse />,
      number: "5000+",
      text: "Patients Cardiaques Suivis",
    },
    {
      icon: <FaHeartbeat />,
      number: "20+",
      text: "Années d'Expertise",
    },
    {
      icon: <FaClock />,
      number: "24/7",
      text: "Urgences Cardiaques",
    },
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Patiente",
      image: "/images/patient1.jpg",
      quote:
        "L'équipe médicale est exceptionnelle. Les soins reçus étaient de très haute qualité et le personnel est vraiment à l'écoute.",
    },
    {
      name: "Pierre Martin",
      role: "Patient",
      image: "/images/patient2.jpg",
      quote:
        "Des installations modernes et un personnel très professionnel. Je recommande vivement ce centre médical.",
    },
    {
      name: "Sophie Laurent",
      role: "Patiente",
      image: "/images/patient3.jpg",
      quote:
        "Un service d'urgence rapide et efficace. Les médecins sont très compétents et attentionnés.",
    },
    {
      name: "Jean Moreau",
      role: "Patient",
      image: "/images/patient4.jpg",
      quote:
        "Excellente expérience avec l'équipe de cardiologie. Un suivi médical de grande qualité.",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[600px]"
      >
        <Slider {...sliderSettings}>
          {[
            "../public/images/slider.jpg",
            "../public/images/slider2.jpg",
            "../public/images/slider3.jpg",
          ].map((image, index) => (
            <div key={index}>
              <div
                className="relative h-[600px] bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url("${image}")`,
                }}
              >
                <div className="relative container mx-auto px-6 py-32 text-left max-w-full">
                  <div className="max-w-3xl pl-5">
                    <div class="text-center lg:text-left">
                        <h1 class="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:leading-tight lg:text-6xl font-pj">Votre Sante, <br/>Notre Priorite.</h1>
                    <p className="text-xl md:text-xl mb-12 text-blue-500">
                      Une prise en charge cardiologique experte!
                    </p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 justify-start items-start">
                      <button className="bg-white border-2 border-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-600 hover:border-white hover:text-white transition duration-300">
                        Prendre Rendez-vous
                      </button>
                      <button className="bg-blue-600 border-2 border-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition duration-300">
                        Nos Services
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </motion.div>

      {/* Welcome Section */}
      <motion.div {...fadeIn} className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img
                src="/images/doctor-team.jpg"
                alt="Équipe Médicale"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Bienvenue chez MediConnect Cardio
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Chez MediConnect Cardio, nous nous spécialisons dans le
                diagnostic, le traitement et le suivi des maladies
                cardiovasculaires. Notre équipe de cardiologues experts utilise
                les technologies les plus avancées pour prendre soin de votre
                santé cardiaque.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <FaUserMd className="text-blue-600 text-2xl mr-2" />
                  <span>Médecins Experts</span>
                </div>
                <div className="flex items-center">
                  <FaHospital className="text-blue-600 text-2xl mr-2" />
                  <span>Équipements Modernes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="bg-white py-16"
      >
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </motion.div>

      {/* Services Section */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="bg-gray-50 py-16"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Nos Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Specialties Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Our Medical Specialties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialties.map((specialty, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl text-blue-600 mb-4">
                  {specialty.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{specialty.name}</h3>
                <p className="text-gray-600">{specialty.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <motion.h2
            {...fadeIn}
            className="text-3xl font-bold text-center mb-12 text-gray-800"
          >
            Témoignages de nos Patients
          </motion.h2>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Location Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Notre Emplacement
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <FaMapMarkerAlt className="text-2xl text-blue-600" />
                  <h3 className="text-xl font-semibold">Adresse</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  123 Rue de la Santé
                  <br />
                  75000 Paris, France
                </p>
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <FaPhoneAlt className="text-blue-600" />
                    <span>+33 1 23 45 67 89</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaClock className="text-blue-600" />
                    <span>Lun-Ven: 8h-20h</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 h-[400px]">
              <div className="w-full h-full rounded-lg shadow-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624...."
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-blue-600 py-16"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="container mx-auto px-6 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Urgence Cardiaque ?
          </h2>
          <p className="text-white text-xl mb-8">
            Notre équipe de cardiologues est disponible 24/7
          </p>
          <div className="text-4xl font-bold text-white mb-8">15</div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition duration-300"
          >
            Nous Contacter
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

const StatCard = ({ icon, number, text }) => (
  <motion.div
    className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <motion.div
      className="text-4xl text-blue-600 mb-4 flex justify-center"
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.6 }}
    >
      {icon}
    </motion.div>
    <motion.div
      className="text-3xl font-bold text-gray-800 mb-2"
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
    >
      {number}
    </motion.div>
    <div className="text-gray-600">{text}</div>
  </motion.div>
);

const FeatureCard = ({ title, description, icon }) => (
  <motion.div
    className="bg-white shadow-lg rounded-lg p-8 text-center"
    whileHover={{
      scale: 1.05,
      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
    }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <motion.div
      className="mb-6"
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.6 }}
    >
      {icon}
    </motion.div>
    <h4 className="text-xl font-semibold text-gray-800 mb-4">{title}</h4>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

export default Body;
