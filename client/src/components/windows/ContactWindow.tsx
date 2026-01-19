import { WindowFrame } from "@/components/WindowFrame";
import { ContactForm } from "@/components/ContactForm";

interface ContactWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactWindow({ isOpen, onClose }: ContactWindowProps) {
  return (
    <WindowFrame
      title="contact"
      isOpen={isOpen}
      onClose={onClose}
      className="w-full max-w-lg"
    >
      <div className="space-y-4">
        <div className="text-center mb-6">
          <p className="text-muted-foreground">
            The easiest way to contact me is through email! 
            Fill out the form below and I'll get back to you soon. ✉️
          </p>
        </div>
        
        <ContactForm />
      </div>
    </WindowFrame>
  );
}
