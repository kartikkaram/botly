
import React, { useRef } from "react";



const testimonials = [{
  content: "Botly transformed our customer support overnight. Our website visitors now get instant, intelligent responses 24/7. Customer satisfaction increased by 40% in just two months.",
  author: "Sarah Chen",
  role: "Head of Customer Success, TechStart Inc.",
  gradient: "from-blue-700 via-indigo-800 to-purple-900",
  backgroundImage: "/background-section1.png"
}, {
  content: "Implementation was incredibly simple with Botly. Our e-commerce site now handles customer inquiries automatically, reducing our support workload by 60% while improving response times.",
  author: "Michael Rodriguez",
  role: "CTO, ShopSmart Solutions",
  gradient: "from-indigo-900 via-purple-800 to-orange-500",
  backgroundImage: "/background-section2.png"
}, {
  content: "The RAG technology in Botly is impressive. Our chatbot understands our product documentation perfectly and provides accurate answers that feel natural and helpful to our users.",
  author: "Dr. Amara Patel",
  role: "Lead Developer, HealthTech Pro",
  gradient: "from-purple-800 via-pink-700 to-red-500",
  backgroundImage: "/background-section3.png"
}, {
  content: "As a small business, we thought AI chatbots were out of reach. Botly made it accessible and affordable. Our lead generation improved by 150% within the first month.",
  author: "Jason Lee",
  role: "Founder, Local Services Hub",
  gradient: "from-orange-600 via-red-500 to-purple-600",
  backgroundImage: "/background-section1.png"
}];

const TestimonialCard = ({
  content,
  author,
  role,
  backgroundImage = "/background-section1.png"
}) => {
  return <div className="bg-cover bg-center rounded-lg p-8 h-full flex flex-col justify-between text-white transform transition-transform duration-300 hover:-translate-y-2 relative overflow-hidden" style={{
    backgroundImage: `url('${backgroundImage}')`
  }}>
      <div className="absolute top-0 right-0 w-24 h-24 bg-white z-10"></div>
      
      <div className="relative z-0">
        <p className="text-xl mb-8 font-medium leading-relaxed pr-20">{`"${content}"`}</p>
        <div>
          <h4 className="font-semibold text-xl">{author}</h4>
          <p className="text-white/80">{role}</p>
        </div>
      </div>
    </div>;
};

const Testimonials = () => {
  const sectionRef = useRef(null);

  return <section className="py-12 bg-white relative" id="testimonials" ref={sectionRef}>
      <div className="section-container opacity-0 animate-on-scroll">
        <div className="flex items-center gap-4 mb-6">
          <div className="orange-chip">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 text-white mr-2">04</span>
            <span>Success Stories</span>
          </div>
        </div>
        
        <h2 className="text-5xl font-display font-bold mb-12 text-left">What Our Users Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => <TestimonialCard key={index} content={testimonial.content} author={testimonial.author} role={testimonial.role} gradient={testimonial.gradient} backgroundImage={testimonial.backgroundImage} />)}
        </div>
      </div>
    </section>;
};

export default Testimonials;
