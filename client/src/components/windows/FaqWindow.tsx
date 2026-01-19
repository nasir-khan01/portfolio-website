import { WindowFrame } from "@/components/WindowFrame";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FaqWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const faqs = [
  {
    question: "What technologies do you specialize in?",
    answer: "I specialize in Node.js, TypeScript, React, Next.js, PostgreSQL, Redis, and cloud infrastructure with AWS and Docker. I focus on building scalable backend systems and modern frontend applications."
  },
  {
    question: "Are you available for freelance work?",
    answer: "Yes! I'm open to freelance opportunities, especially for backend development, system architecture, and full-stack projects. Feel free to reach out via email to discuss your project."
  },
  {
    question: "What's your development process?",
    answer: "I follow an iterative approach: understand requirements, design architecture, implement with clean code practices, write tests, and continuously refine based on feedback. I prioritize maintainability and scalability."
  },
  {
    question: "Do you work with remote teams?",
    answer: "Absolutely! I have extensive experience working with distributed teams across different time zones. I'm comfortable with async communication and collaborative tools."
  },
];

export function FaqWindow({ isOpen, onClose }: FaqWindowProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <WindowFrame
      title="faq"
      isOpen={isOpen}
      onClose={onClose}
      className="w-full max-w-lg"
    >
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-border rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
            >
              <span className="font-medium text-foreground pr-4">
                {faq.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-muted-foreground text-sm leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </WindowFrame>
  );
}
