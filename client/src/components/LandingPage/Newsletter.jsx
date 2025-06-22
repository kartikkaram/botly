import React, { useState } from "react";
import { toast } from "@/components/LandingPage/ui/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: "Thank you for subscribing!",
        description: "You'll receive updates about Atlas soon."
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="newsletter" className="bg-white py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex items-center px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 text-white text-xs mr-2">
              05
            </span>
            Newsletter
          </div>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
          Subscribe to the newsletter
        </h2>
        <p className="text-base sm:text-lg text-gray-700 mb-8">
          Be first to hear about breakthroughs, partnerships, and deployment opportunities
        </p>

<form
  onSubmit={handleSubmit}
  className="w-full flex sm:flex-row items-stretch sm:items-center gap-4"
>
  <div className="w-full sm:flex-1">
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email address"
      className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 placeholder-gray-500"
      required
    />
  </div>
  <div>
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full sm:w-auto px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full transition-all duration-300 whitespace-nowrap"
    >
      {isSubmitting ? "Submitting..." : "Submit"}
    </button>
  </div>
</form>

      </div>
    </section>
  );
};

export default Newsletter;
