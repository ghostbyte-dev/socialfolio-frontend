"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    question: "What is Socialfolio?",
    answer:
      "Socialfolio is a platform to showcase all your social profiles, projects, and links in one elegant profile.",
  },
  {
    question: "Is Socialfolio free?",
    answer:
      "Yes! Socialfolio is completely free to use. Also the whole code is open source and can be found on Github.",
  },
  {
    question: "Can I customize my page?",
    answer:
      "Absolutely! You can change layouts, colors, and widget styles to fit your personal brand.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mt-40 w-full">
      <div className="content-wrapper max-w-3xl flex flex-col items-center space-y-4">
        <h2 className="text-4xl font-bold mb-8">FAQ</h2>

        {faqData.map((item, index) => (
          <button
            key={index}
            type="button"
            className="w-full wrapper py-5 px-5"
            onClick={() => toggle(index)}
          >
            <div className="flex justify-between items-center w-full">
              <p className="font-semibold">{item.question}</p>

              {openIndex === index ? (
                <ChevronUp size={22} />
              ) : (
                <ChevronDown size={22} />
              )}
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ease-out ${
                openIndex === index
                  ? "max-h-96 opacity-100 pt-2"
                  : "max-h-0 opacity-0 py-0"
              }`}
            >
              <p className="text-sm text-left">{item.answer}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
