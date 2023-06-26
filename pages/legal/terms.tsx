// Essentials

import Link from "next/link";

const termsAndConditions = () => {
  return (
    <div className="p-legal">
      <h1>Terms and Conditions</h1>

      <p>
        Welcome to the website of Viserion Wick (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). These
        terms and conditions (&quot;Terms&quot;) and our privacy policy located at
        <Link href="/legal/privacy" className="link">
          https://www.viserionwick.vercel.app/legal/privacy
        </Link>
        (&quot;Privacy Policy&quot;) govern your use of our website located at
        <Link href="/" className="link">
          https://www.viserionwick.vercel.app/
        </Link>
        (&quot;Website&quot;) and any services provided therein. By accessing or using the
        Website, you agree to be bound by these Terms. If you do not agree with
        any part of these Terms, please refrain from using the Website.
      </p>
      
      
      <h2>1. Intellectual Property</h2>

      <p>
        All content on this Website, including blog posts, logos, text, images,
        graphics, and multimedia displayed on the Website are the exclusive
        intellectual property of Viserion Wick. These materials are protected by
        applicable intellectual property laws. You may not reproduce,
        distribute, modify, or use any content from this Website without our
        prior written consent.
      </p>

      <h2>2. User Conduct</h2>

      <p>
        When using the Website, you agree to comply with all applicable laws and
        refrain from engaging in any unlawful activities. You must not upload or
        transmit any viruses, malware, or other harmful code. Additionally, you
        agree not to engage in spamming, harassment, or any behavior that
        disrupts or interferes with the functioning of the Website or the
        experience of other users.
      </p>

      <h2>3. Privacy and Data Collection</h2>

      <p>
        Your privacy is important to us. Our Privacy Policy explains how we
        collect, use, and protect your personal information when you use our
        Website. By using our Website, you consent to our collection and use of
        your personal information as described in our Privacy Policy.
      </p>

      <h2>4. External Links</h2>

      <p>
        Our Website may contain links to external websites that are not owned or
        controlled by us. We have no control over the content or privacy
        practices of these websites and disclaim any responsibility for them. We
        encourage you to review the terms and privacy policies of any
        third-party websites you visit.
      </p>

      <h2>5. Disclaimer of Liability</h2>

      <p>
        While we strive to provide accurate and up-to-date information on the
        Website, we make no representations or warranties of any kind, express
        or implied, regarding the accuracy, completeness, or reliability of the
        information. You acknowledge and agree that your use of the Website is
        at your own risk. We shall not be liable for any errors, omissions, or
        damages arising from the use of the Website or reliance on its content.
      </p>

      <h2>6. Changes to the Terms and Conditions</h2>

      <p>
        We reserve the right to update or modify these Terms at any time without
        prior notice. Any changes will be effective immediately upon posting on
        the Website. It is your responsibility to review these Terms
        periodically for any updates or modifications.
      </p>

      <h2>7. Limitations of Liability</h2>

      <p>
        Your use of this Website is at your own risk. Viserion Wick, its
        affiliates, and its partners shall not be held liable for any direct,
        indirect, incidental, consequential, or punitive damages resulting from
        your access to or use of the Website.
      </p>

      <h2>8. Contact Information</h2>

      <p>
        For any questions, comments, or concerns regarding these Terms, please
        contact our support team at
        <a href="mailto:viserionwick@gmail.com" className="link">
          viserionwick@gmail.com
        </a>
        .
      </p>
    </div>
  );
};

export default termsAndConditions;
