import { FaCheckCircle, FaStar } from "react-icons/fa";
import { useState } from "react";
import hero from "./img/heroPics.png";


function Body() {
  return (
    <>
      <div>
        <main className="flex-grow container mx-auto px-4 py-10 relative">
          {/* Hero Section */}
          <section className="relative text-center md:text-left py-40 flex flex-col md:flex-row items-center justify-between overflow-hidden">
            {/* Background Image */}
            <div
              className="absolute top-16 right-0 w-1/2 h-full bg-cover bg-center z-0"
              style={{
                backgroundImage: `url(${hero})`,
                backgroundSize: "cover",
              }}
            ></div>
            <div className="md:w-1/2 space-y-6 z-10 text-blue-700">
              {" "}
              {/* Updated text color */}
              <h2 className="text-5xl font-extrabold mb-4 tracking-wide leading-tight">
                Simplifiez vos rendez-vous médicaux
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto md:mx-0">
                Une plateforme moderne et intuitive pour connecter les patients
                aux professionnels de santé en toute simplicité.
              </p>
              <div className="space-x-4">
                <a
                  href="#book"
                  className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-xl hover:bg-blue-700 transform transition-transform duration-300 hover:scale-105"
                >
                  Prendre un rendez-vous
                </a>
                <a
                  href="#learn-more"
                  className="bg-white text-blue-600 border border-blue-600 py-3 px-6 rounded-lg shadow-xl hover:bg-blue-50 transform transition-transform duration-300 hover:scale-105"
                >
                  En savoir plus
                </a>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-16">
            <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">
              Caractéristiques principales
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                title="Rendez-vous faciles"
                description="Les patients peuvent programmer des rendez-vous en quelques clics."
                icon={<FaCheckCircle className="text-blue-600 text-3xl mb-4" />}
              />
              <FeatureCard
                title="Efficacité administrative"
                description="Les médecins peuvent gérer leurs agendas et réduire la paperasse."
                icon={<FaCheckCircle className="text-blue-600 text-3xl mb-4" />}
              />
              <FeatureCard
                title="Plateforme sécurisée"
                description="Toutes les interactions et données sont cryptées et sécurisées."
                icon={<FaCheckCircle className="text-blue-600 text-3xl mb-4" />}
              />
            </div>
          </section>

          {/* Testimonials Section */}
          <section
            id="testimonials"
            className="block max-w-lgm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">
              Témoignages
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard
                text="Cette plateforme a changé ma façon de prendre des rendez-vous médicaux. Simple et rapide !"
                name="- Jean Dupont"
                rating={5}
              />
              <TestimonialCard
                text="En tant que médecin, j’ai gagné un temps précieux dans la gestion de mon emploi du temps."
                name="- Dr. Marie Lefevre"
                rating={4}
              />
              <TestimonialCard
                text="La sécurité des données est un atout majeur. Je me sens en confiance."
                name="- Sophie Martin"
                rating={5}
              />
              <TestimonialCard
                text="Je peux trouver des médecins spécialisés rapidement et obtenir des conseils avisés."
                name="- Claire Bernard"
                rating={4}
              />
              <TestimonialCard
                text="La synchronisation avec mon calendrier personnel est un vrai plus !"
                name="- Dr. Luc Morel"
                rating={5}
              />
              <TestimonialCard
                text="Une expérience utilisateur fluide et pratique, je recommande à 100%."
                name="- Nicolas Petit"
                rating={4}
              />
            </div>
          </section>

          {/* FAQ Section */}

          <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="bg-cyan-300">sadoasidapdkapdkapdskpdad</div>
            <div class="p-5">
              <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2021
                </h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
              <a
                href="#"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Read more
                <svg
                  class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>

          <section id="faq" className="py-16">
            <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">
              Questions Fréquemment Posées
            </h3>
            <div className="space-y-6">
              <FaqCard
                question="Comment fonctionne la prise de rendez-vous ?"
                answer="Il vous suffit de choisir un professionnel de santé, de sélectionner une date et une heure, et de confirmer votre rendez-vous."
              />
              <FaqCard
                question="Mes données personnelles sont-elles en sécurité ?"
                answer="Oui, toutes vos données sont cryptées et conformes aux normes de sécurité en vigueur."
              />
              <FaqCard
                question="Puis-je annuler ou modifier un rendez-vous ?"
                answer="Bien sûr, vous pouvez annuler ou modifier votre rendez-vous directement depuis votre espace utilisateur."
              />
            </div>
          </section>

          {/* Call to Action Section */}
          <section
            id="cta"
            className="bg-blue-600 text-white py-16 text-center rounded-lg shadow-xl"
          >
            <h3 className="text-4xl font-bold mb-6">
              Prêt à moderniser votre expérience de santé ?
            </h3>
            <a
              href="#signup"
              className="bg-white text-blue-600 py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transform transition-transform duration-300 hover:scale-105"
            >
              Commencez maintenant
            </a>
          </section>
        </main>

        <footer className="bg-gray-800 text-gray-300 py-3">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Mediconnect. Tous droits réservés.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

const FeatureCard = ({ title, description, icon }) => (
  <div className="bg-white shadow-lg rounded-lg p-8 text-center transform transition-transform duration-300 hover:scale-105">
    <div className="mb-4">{icon}</div>
    <h4 className="text-xl font-semibold text-blue-600 mb-4">{title}</h4>
    <p className="text-gray-600">{description}</p>
  </div>
);

const TestimonialCard = ({ text, name, rating }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 transform transition-transform duration-300 hover:scale-105">
    <p className="text-gray-600 mb-4">{text}</p>
    <div className="flex items-center mb-4">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={`text-yellow-400 ${
            index < rating ? "text-yellow-500" : "text-gray-300"
          }`}
        />
      ))}
    </div>
    <h4 className="text-blue-600 font-semibold">{name}</h4>
  </div>
);

const FaqCard = ({ question, answer }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h4 className="text-blue-600 font-semibold mb-2">{question}</h4>
    <p className="text-gray-600">{answer}</p>
  </div>
);

export default Body;
