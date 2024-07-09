import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input"; // Import shadcn components

function Contact() {
  const { toast } = useToast();
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-[hsl(var(--card))] rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-[hsl(var(--foreground))] mb-6 text-center">
          Contact Us
        </h2>
        <form
          className="space-y-6"
          onSubmit={(ev) => {
            ev.preventDefault();
            toast({
              variant: "success",
              title: "Message Sent!",
              description: "Thanks! Our Team Will Contact You Soon!",
            });
          }}
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[hsl(var(--foreground))]"
            >
              Name
            </label>
            <Input
              type="text"
              name="name"
              id="name"
              className="mt-1 block w-full rounded-md border-[hsl(var(--border))] shadow-sm focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))] sm:text-sm"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[hsl(var(--foreground))]"
            >
              Email
            </label>
            <Input
              type="email"
              name="email"
              id="email"
              className="mt-1 block w-full rounded-md border-[hsl(var(--border))] shadow-sm focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))] sm:text-sm"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-[hsl(var(--foreground))]"
            >
              Subject
            </label>
            <Input
              type="text"
              name="subject"
              id="subject"
              className="mt-1 block w-full rounded-md border-[hsl(var(--border))] shadow-sm focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))] sm:text-sm"
              placeholder="Subject"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-[hsl(var(--foreground))]"
            >
              Message
            </label>
            <Input
              type="textarea"
              name="message"
              id="message"
              rows="4"
              className="mt-1 block w-full rounded-md border-[hsl(var(--border))] shadow-sm focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))] sm:text-sm"
              placeholder="Your Message"
            />
          </div>
          <div className="text-center">
            <Button className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--primary))]">
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
