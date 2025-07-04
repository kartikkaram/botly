import React from "react";

const FaqCard = ({ data }) => {

    if (!data || data.length === 0) {
        return (
            <div className="w-full max-w-6xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6 tracking-tight">
                    No FAQs available
                </h2>
            </div>
        );
    }
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6 tracking-tight">
        Frequently Asked
      </h2>

      {/* FAQ Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl p-5 bg-[#111111]/70 border border-gray-800 backdrop-blur-md shadow-lg transition-all duration-200 hover:scale-[1.02] hover:border-gray-700"
          >
            <p className="text-lg font-medium text-white leading-snug">
              {item.representative}
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Asked {item.count} {item.count === 1 ? "time" : "times"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqCard;
