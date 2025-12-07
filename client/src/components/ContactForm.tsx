"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.length < 2) newErrors.name = "Name must be at least 2 characters";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email address";

    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.length < 10) newErrors.message = "Message must be at least 10 characters";
    else if (formData.message.length > 1500) newErrors.message = "Message must be less than 1500 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Credentials from environment variables
    const serviceId = import.meta.env.VITE_EMAIL_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAIL_USER_ID;

    try {
      await emailjs.send(serviceId, templateId, {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      }, publicKey);

      setSuccess(true);
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
      
      // Reset success state after a delay to allow sending another message
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const inputClasses = "w-full bg-transparent border-b border-primary/20 py-3 text-foreground placeholder:text-transparent focus:outline-none focus:border-primary transition-colors duration-300 resize-none";
  const labelClasses = (fieldName: string) => cn(
    "absolute left-0 transition-all duration-300 pointer-events-none text-muted-foreground",
    (focusedField === fieldName || formData[fieldName as keyof typeof formData]) 
      ? "-top-3 text-xs text-primary font-medium" 
      : "top-3 text-sm"
  );
  
  const ErrorMessage = ({ error }: { error?: string }) => {
    if (!error) return null;
    return (
      <div className="flex items-center gap-1 mt-1 text-xs text-red-500 animate-in fade-in slide-in-from-top-1">
        <AlertCircle className="w-3 h-3" />
        <span>{error}</span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto relative group"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
      
      <div className="relative px-8 py-10 bg-background/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden text-left">
        
        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4"
                >
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </motion.div>
                <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">Thank you for getting in touch.</p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="mt-6 text-sm text-primary hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className={cn(inputClasses, errors.name && "border-red-500 focus:border-red-500")}
                    />
                    <label htmlFor="name" className={labelClasses("name")}>
                      Name
                    </label>
                    <ErrorMessage error={errors.name} />
                  </div>
                  
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className={cn(inputClasses, errors.email && "border-red-500 focus:border-red-500")}
                    />
                    <label htmlFor="email" className={labelClasses("email")}>
                      Email
                    </label>
                    <ErrorMessage error={errors.email} />
                  </div>
                </div>

                <div className="relative mt-2">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    rows={4}
                    maxLength={1500}
                    className={cn(inputClasses, errors.message && "border-red-500 focus:border-red-500")}
                  />
                  <label htmlFor="message" className={labelClasses("message")}>
                    Your Message
                  </label>
                  <div className="flex justify-between items-start mt-1">
                    <ErrorMessage error={errors.message} />
                    <span className={cn(
                      "text-xs ml-auto transition-colors", 
                      formData.message.length > 1400 ? "text-yellow-500" : "text-muted-foreground/50",
                      formData.message.length === 1500 && "text-red-500"
                    )}>
                      {formData.message.length}/1500
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  type="submit"
                  className="w-full relative group overflow-hidden rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 p-[1px]"
                >
                  <div className="relative flex items-center justify-center gap-2 bg-background/90 group-hover:bg-transparent transition-colors duration-300 rounded-lg py-3 px-6">
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin text-white" />
                    ) : (
                      <span className="font-medium text-foreground group-hover:text-white transition-colors">Send Message</span>
                    )}
                  </div>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </motion.div>
  );
}
