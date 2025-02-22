"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface CorporateInquiryFormProps {
  className?: string;
}

export function CorporateInquiryForm({ className }: CorporateInquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement form submission
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Company Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <label htmlFor="contact" className="block text-sm font-medium mb-2">
          Contact Person
        </label>
        <input
          type="text"
          id="contact"
          name="contact"
          required
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div>
        <label htmlFor="orderType" className="block text-sm font-medium mb-2">
          Type of Order
        </label>
        <select
          id="orderType"
          name="orderType"
          required
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Select order type</option>
          <option value="corporate">Corporate Events</option>
          <option value="wedding">Wedding</option>
          <option value="bulk">Bulk Order</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Please provide details about your order, including quantity, preferred delivery date, and any special requirements."
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-black text-white py-3 rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "Sending..." : "Send Inquiry"}
      </button>
    </form>
  );
}
