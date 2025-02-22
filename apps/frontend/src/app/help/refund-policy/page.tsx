import { PolicyLayout } from "@/components/layout/policy-layout";

const refundPolicySections = [
  {
    title: "Facing issues with our cookies?",
    content: [
      "Not Up to the Mark? If your treats don't arrive in the pristine condition you deserve (broken, or defective), please reach out to us within 2 hours of receiving them. Snap a clear photo or video showing the issue and send it over to +60118085375.",
      "Oops, Wrong Cookie? Something you didn't order? Let us know within 2 hours with a photo of the mix-up, alongside your order number. To qualify for a swift refund or replacement, please keep the items untouched, just as you received them.",
    ],
  },
  {
    title: "Cancellations",
    content: [
      "Need to Cancel? Life happens! We understand. To cancel, please reach out to us at +60118085375.",
      "For Website Orders: Cancellation will be accepted up to 24 hours prior to the scheduled pickup/delivery date.",
      "For Bulk Orders below RM1000: Cancellation will be accepted up to one week prior to the scheduled pickup/delivery date.",
      "For Bulk Orders above RM1000: Cancellation will be accepted up to two weeks prior to the scheduled pickup/delivery date.",
      "Too Late to Cancel? We're unable to offer refunds for cancellations made after the notice periods mentioned above. We appreciate your understanding and cooperation with our cancellation policy.",
    ],
  },
  {
    title: "Exceptions",
    content: [
      "Delayed Deliveries: We won't be able to refund for delays outside our control, but we promise to keep you informed.",
      "Out of Cookies? If we run out of your chosen delight and can't fulfill your order, we'll let you know ASAP. You'll have the option to opt for a full refund, either as store credit or back to your original payment method, based on your preference.",
    ],
  },
  {
    title: "Addressing Your Concerns",
    content:
      "Please don't hesitate to reach out at +60118085375 for further assistance. We'll dive deep into the details of your case and decide on the best way to make things right, whether that's a full or partial refund, store credit, or a replacement, based solely on our discretion.",
  },
  {
    title: "Thank You",
    content:
      "We truly appreciate your understanding and cooperation with our policy. At CakeryCan, we're all about spreading joy, one cookie at a time.",
  },
];

export default function RefundPolicyPage() {
  return (
    <PolicyLayout
      title="Refund policy"
      description="At CakeryCan, your satisfaction lights up our world. We pour our hearts into ensuring each cookie brings you joy. Though we strive for perfection, we understand that sometimes, the cookie may crumble unexpectedly. Here's how we address such situations."
      sections={refundPolicySections}
    />
  );
}
