// src/pages/PrivacyPolicy.jsx
import React from 'react';
import '../css/About.css'; // Import the CSS for this page

export default function PrivacyPolicy() {
  return (
    <div className="page-content"> {/* Use page-content for consistent top spacing */}
      <div className="about-container">
        <h1>Privacy Policy for iCodeGuru</h1>
        <p className="effective-date"><strong>Effective Date: July 3, 2025</strong></p>

        <p>This Privacy Policy (the "Policy") describes how iCodeGuru ("we," "us," or "our"), a tutoring website business operating in Westville, KwaZulu-Natal, South Africa, collects, uses, processes, discloses, and protects your personal information. We are committed to safeguarding the privacy of our students, parents, tutors, and all other users of our website and services.</p>
        <p>By accessing or using our website, https://i-code-guru.web.app/, and our tutoring services, you acknowledge that you have read, understood, and agree to be bound by the terms and conditions of this Privacy Policy. If you do not agree with the practices described in this Policy, please do not use our website or services.</p>

        <h2>1. Introduction and Our Commitment to Privacy</h2>
        <p>At iCodeGuru, we understand the importance of privacy and the sensitive nature of personal information, especially when it pertains to educational services and minors. This Privacy Policy is designed to inform you transparently about our data handling practices. We are dedicated to complying with applicable data protection laws in South Africa, including the Protection of Personal Information Act (POPIA), and other relevant international standards where applicable. Our commitment is to ensure that your personal information is collected, processed, and stored responsibly, securely, and only for legitimate purposes.</p>

        <h2>2. Information We Collect</h2>
        <p>We collect various types of information from and about you, depending on how you interact with our website and services. This information can be categorized as follows:</p>

        <h3>2.1. Personal Information (Directly Identifiable):</h3>
        <p>This refers to any information that can be used to identify you directly. We collect this when you voluntarily provide it to us, such as when you:</p>
        <ul>
          <li><strong>Register for an account:</strong>
            <ul>
              <li>Full Name (Student and/or Parent/Guardian)</li>
              <li>Email Address</li>
              <li>Phone Number</li>
              <li>Date of Birth (for students, to determine age appropriateness and parental consent needs)</li>
              <li>Password (encrypted)</li>
              <li>User Role (e.g., Student, Parent, Tutor, Admin)</li>
            </ul>
          </li>
          <li><strong>Book a tutoring session:</strong>
            <ul>
              <li>Student's Academic Level/Grade</li>
              <li>Specific Module(s) or Subject(s) of Interest (e.g., Mathematics, Science)</li>
              <li>Preferred Dates and Times for Sessions</li>
              <li>Learning Objectives or Specific Concepts Requiring Assistance</li>
              <li>Any special learning requirements or notes relevant to the session.</li>
            </ul>
          </li>
          <li><strong>Make a payment:</strong>
            <ul>
              <li>Billing Address</li>
              <li>Payment Card Information (Card Number, Expiration Date, CVV – <strong>Note:</strong> We typically use third-party payment processors, and we do not directly store full credit card details on our servers. See Section 3.2 for more details.)</li>
            </ul>
          </li>
          <li><strong>Communicate with us:</strong>
            <ul>
              <li>Content of your messages, emails, chat conversations, or phone calls with our support, administrative, or tutoring staff.</li>
            </ul>
          </li>
          <li><strong>Apply to be a tutor:</strong>
            <ul>
              <li>Academic Qualifications and Transcripts</li>
              <li>Teaching Experience</li>
              <li>Subject Matter Expertise</li>
              <li>Curriculum Vitae (CV)</li>
              <li>References (contact information for referees)</li>
              <li>Bank Account Details (for payment purposes, if you become a tutor)</li>
              <li>Identity Verification Documents (e.g., ID/Passport copy, for background checks and legal compliance)</li>
            </ul>
          </li>
        </ul>

        <h3>2.2. Non-Personal Information (Automatically Collected):</h3>
        <p>This information does not directly identify you but provides insights into your browsing behavior and device. It is collected automatically when you visit our website:</p>
        <ul>
          <li><strong>Log Data:</strong>
            <ul>
              <li>IP Address</li>
              <li>Browser Type and Version</li>
              <li>Operating System</li>
              <li>Referring/Exit Pages</li>
              <li>Date and Time of Access</li>
              <li>Pages Viewed</li>
              <li>Time Spent on Pages</li>
            </ul>
          </li>
          <li><strong>Device Information:</strong>
            <ul>
              <li>Device Type (e.g., desktop, mobile, tablet)</li>
              <li>Unique Device Identifiers</li>
              <li>Screen Resolution</li>
            </ul>
          </li>
          <li><strong>Usage Data:</strong>
            <ul>
              <li>Clicks, scrolls, and other interactions with our website features.</li>
              <li>Session duration.</li>
              <li>Features used within the platform.</li>
            </ul>
          </li>
          <li><strong>Location Data:</strong>
            <ul>
              <li>General geographical location derived from your IP address (e.g., city, country, particularly Westville, KwaZulu-Natal, South Africa). We do not collect precise GPS location without your explicit consent.</li>
            </ul>
          </li>
        </ul>

        <h3>2.3. Information from Third Parties:</h3>
        <p>In some instances, we may receive information about you from third-party services, such as:</p>
        <ul>
          <li><strong>Payment Processors:</strong> When you make a payment, our payment processor (e.g., Stripe, PayFast) will provide us with confirmation of your payment and limited transaction details (e.g., last four digits of card, transaction ID) but not full card numbers.</li>
          <li><strong>Authentication Providers:</strong> If you choose to log in using third-party services like Google (e.g., <code>signInWithPopup</code> using <code>GoogleAuthProvider</code>), we receive basic profile information (e.g., email address, name, profile picture URL) from these providers.</li>
          <li><strong>Reference Checks:</strong> For tutor applications, we may contact the references you provide to obtain information about your qualifications and suitability.</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>We use the information we collect for various purposes, primarily to provide, maintain, and improve our tutoring services, and to communicate with you. Our legal bases for processing personal information include:</p>
        <ul>
          <li><strong>Performance of a contract:</strong> To fulfill our obligations under a contract with you (e.g., providing tutoring services, processing bookings).</li>
          <li><strong>Legitimate interests:</strong> For our business interests (e.g., improving services, security), provided your rights are not overridden.</li>
          <li><strong>Legal obligation:</strong> To comply with legal requirements (e.g., tax, anti-money laundering).</li>
          <li><strong>Consent:</strong> When you explicitly give us permission (e.g., for marketing communications).</li>
        </ul>
        <p>Specific uses include:</p>

        <h3>3.1. To Provide and Manage Services:</h3>
        <ul>
          <li>To create and manage your user account.</li>
          <li>To process your tutoring session bookings and payments.</li>
          <li>To connect students with appropriate tutors based on subject, level, and availability.</li>
          <li>To facilitate communication between students, parents, and tutors regarding sessions.</li>
          <li>To deliver tutoring sessions (e.g., through integrated virtual classroom tools if applicable).</li>
          <li>To track and manage your booking history and progress.</li>
          <li>To provide customer support and respond to your inquiries.</li>
          <li>To manage tutor applications, conduct background checks, and onboard new tutors.</li>
          <li>To process payments to tutors for their services.</li>
        </ul>

        <h3>3.2. For Communication:</h3>
        <ul>
          <li>To send transactional emails (e.g., booking confirmations, payment receipts, password reset links).</li>
          <li>To send service-related announcements and updates (e.g., changes to our terms, new features).</li>
          <li>To provide information about your account status.</li>
          <li>To send promotional and marketing communications about our services, special offers, or new modules <strong>only if you have opted in to receive such communications.</strong> You can opt out at any time.</li>
        </ul>

        <h3>3.3. For Service Improvement and Development:</h3>
        <ul>
          <li>To understand how users interact with our website and services to identify areas for improvement.</li>
          <li>To personalize your experience (e.g., recommend relevant modules or tutors).</li>
          <li>To develop new features, modules, or services.</li>
          <li>To conduct research and analysis to improve our educational offerings and platform performance.</li>
          <li>To monitor and analyze trends, usage, and activities in connection with our services.</li>
        </ul>

        <h3>3.4. For Safety and Security:</h3>
        <ul>
          <li>To detect, prevent, and address technical issues, fraud, and security vulnerabilities.</li>
          <li>To verify your identity and ensure the integrity of our platform.</li>
          <li>To enforce our Terms of Service and other policies.</li>
        </ul>

        <h3>3.5. For Legal and Compliance Purposes:</h3>
        <ul>
          <li>To comply with applicable laws, regulations, and legal processes (e.g., tax laws in South Africa, POPIA).</li>
          <li>To respond to lawful requests from public and government authorities.</li>
          <li>To protect our rights, privacy, safety, or property, and/or that of our affiliates, you, or others.</li>
        </ul>

        <h2>4. How We Share and Disclose Your Information</h2>
        <p>We do not sell your personal information to third parties. We may share or disclose your information in the following limited circumstances:</p>

        <h3>4.1. With Tutors and Students (for Service Delivery):</h3>
        <ul>
          <li><strong>For Students:</strong> We share your name, academic level, module of interest, and preferred times with tutors to facilitate booking and session delivery. We do <strong>not</strong> share your email or phone number directly with tutors without your explicit consent or unless necessary for direct communication for an ongoing session.</li>
          <li><strong>For Tutors:</strong> We share your name, subject expertise, qualifications, and availability with students and parents to enable them to select and book your services.</li>
        </ul>

        <h3>4.2. Third-Party Service Providers:</h3>
        <p>We engage trusted third-party companies and individuals to perform services on our behalf, such as:</p>
        <ul>
          <li><strong>Payment Processors:</strong> (e.g., PayFast, Stripe) to securely handle payment transactions. We only share the necessary billing information to process your payment. They are contractually obligated to protect your information.</li>
          <li><strong>Cloud Hosting Providers:</strong> (e.g., Google Firebase, AWS) for data storage, database management, and server infrastructure located in secure data centers.</li>
          <li><strong>Communication Services:</strong> (e.g., EmailJS, SendGrid) for sending transactional and marketing emails.</li>
          <li><strong>Analytics Providers:</strong> (e.g., Google Analytics) to help us understand website usage and improve our services. This data is typically aggregated and anonymized.</li>
          <li><strong>Identity Verification Services:</strong> For tutor background checks, with explicit consent.</li>
        </ul>
        <p>These service providers only have access to the personal information necessary to perform their functions and are contractually bound to protect your information and not use it for any other purpose.</p>

        <h3>4.3. Business Transfers:</h3>
        <p>In the event of a merger, acquisition, sale of assets, or other business transaction involving iCodeGuru, your personal information may be transferred as part of that transaction. We will notify you via email or a prominent notice on our website of any such change in ownership or control of your personal information.</p>

        <h3>4.4. Legal Requirements and Law Enforcement:</h3>
        <p>We may disclose your information if required to do so by law or in the good faith belief that such action is necessary to:</p>
        <ul>
          <li>Comply with a legal obligation (e.g., court order, subpoena).</li>
          <li>Protect and defend the rights or property of iCodeGuru.</li>
          <li>Prevent or investigate possible wrongdoing in connection with the Service.</li>
          <li>Protect the personal safety of users of the Service or the public.</li>
          <li>Protect against legal liability.</li>
        </ul>

        <h3>4.5. With Your Consent:</h3>
        <p>We may share your information with other third parties when we have your explicit consent to do so.</p>

        <h2>5. Data Security</h2>
        <p>We implement robust technical, administrative, and physical security measures designed to protect your personal information from unauthorized access, use, alteration, and disclosure. These measures include:</p>
        <ul>
          <li><strong>Encryption:</strong> Data is encrypted both in transit (using SSL/TLS protocols) and at rest (for sensitive data where appropriate).</li>
          <li><strong>Access Controls:</strong> Strict access controls and authentication mechanisms are in place to limit access to personal data to authorized personnel only.</li>
          <li><strong>Regular Security Audits:</strong> We regularly review our security practices and update them as necessary.</li>
          <li><strong>Data Minimization:</strong> We only collect and retain personal information that is necessary for the purposes outlined in this Policy.</li>
          <li><strong>Firebase Security:</strong> As we utilize Firebase for backend services, we leverage Google's robust security infrastructure and practices, including Google Cloud Platform's security features. Our Firestore security rules are configured to restrict access to data based on user authentication and roles.</li>
        </ul>
        <p>While we strive to use commercially acceptable means to protect your Personal Information, no method of transmission over the Internet or method of electronic storage is 100% secure. Therefore, we cannot guarantee its absolute security.</p>

        <h2>6. Data Retention</h2>
        <p>We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements.</p>
        <ul>
          <li><strong>Account Information:</strong> We retain your account information for as long as your account is active or as needed to provide you services. If you close your account, we may retain certain information for a reasonable period to comply with legal obligations, resolve disputes, and enforce our agreements.</li>
          <li><strong>Booking Records:</strong> Booking details are retained for a period necessary for record-keeping, financial auditing, and to comply with tax and other legal obligations in South Africa (e.g., POPIA requirements).</li>
          <li><strong>Communication Records:</strong> We retain records of your communications with us for customer service, dispute resolution, and auditing purposes.</li>
          <li><strong>Tutor Application Data:</strong> If your application is unsuccessful, we will retain your data for a reasonable period for legal compliance and potential future opportunities, unless you request earlier deletion.</li>
        </ul>

        <h2>7. Your Data Protection Rights (POPIA and General Rights)</h2>
        <p>As a data subject, you have certain rights regarding your personal information, which we are committed to upholding:</p>

        <h3>7.1. Right to Access:</h3>
        <p>You have the right to request access to the personal information we hold about you. This includes information about the categories of personal information we process, the purposes of processing, the categories of recipients, and the period for which your personal information will be stored.</p>

        <h3>7.2. Right to Rectification/Correction:</h3>
        <p>You have the right to request that we correct any inaccurate or incomplete personal information we hold about you. You can update much of your account information directly through your user profile settings on our website.</p>

        <h3>7.3. Right to Erasure ("Right to Be Forgotten"):</h3>
        <p>You have the right to request the deletion of your personal information under certain circumstances, for example, if the information is no longer necessary for the purposes for which it was collected, or if you withdraw consent and there is no other legal ground for processing.</p>

        <h3>7.4. Right to Restrict Processing:</h3>
        <p>You have the right to request that we restrict the processing of your personal information under certain conditions, such as if you contest the accuracy of the data, or if the processing is unlawful.</p>

        <h3>7.5. Right to Object to Processing:</h3>
        <p>You have the right to object to the processing of your personal information where we are relying on a legitimate interest (or those of a third party) and there is something about your particular situation which makes you want to object to processing on this ground. You also have the right to object where we are processing your personal information for direct marketing purposes.</p>

        <h3>7.6. Right to Data Portability:</h3>
        <p>You have the right to request a copy of your personal information in a structured, commonly used, and machine-readable format, and to transmit that data to another controller, where technically feasible.</p>

        <h3>7.7. Right to Withdraw Consent:</h3>
        <p>Where we rely on your consent to process your personal information, you have the right to withdraw that consent at any time. Withdrawal of consent will not affect the lawfulness of any processing carried out before you withdraw your consent.</p>

        <h3>7.8. Right to Lodge a Complaint:</h3>
        <p>You have the right to lodge a complaint with the relevant data protection authority in South Africa, which is the Information Regulator.</p>
        <p><strong>Information Regulator (South Africa)</strong></p>
        <ul>
          <li><strong>Website:</strong> <a href="https://www.justice.gov.za/inforeg/" target="_blank" rel="noopener noreferrer">https://www.justice.gov.za/inforeg/</a></li>
          <li><strong>Email:</strong> inforeg@justice.gov.za</li>
        </ul>
        <p>To exercise any of these rights, please contact us using the details provided in Section 11. We may require you to verify your identity before responding to your request.</p>

        <h2>8. Cookies and Tracking Technologies</h2>
        <p>We use cookies and similar tracking technologies (like web beacons and pixels) to track activity on our Service and hold certain information. Cookies are small data files placed on your device.</p>
        <p>We use cookies for various purposes:</p>
        <ul>
          <li><strong>Essential Cookies:</strong> Necessary for the website to function (e.g., session management, user authentication).</li>
          <li><strong>Performance and Analytics Cookies:</strong> To collect information about how you use our website (e.g., pages visited, time spent) to improve performance and user experience.</li>
          <li><strong>Functionality Cookies:</strong> To remember your preferences and choices (e.g., language selection).</li>
          <li><strong>Advertising/Marketing Cookies:</strong> To deliver relevant advertisements and measure the effectiveness of our marketing campaigns.</li>
        </ul>
        <p>You have the option to accept or refuse cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. However, if you choose to decline cookies, you may not be able to use some portions of our Service.</p>

        <h2>9. Children's Privacy</h2>
        <p>Our services are designed for students of various ages, including minors.</p>
        <ul>
          <li><strong>For children under 13 (or the age of consent in South Africa):</strong> We require verifiable parental or guardian consent before collecting any personal information from children under this age. This consent is obtained during the account registration process for minors. Parents/guardians have the right to review the personal information collected from their child, refuse to permit its further collection or use, and request its deletion.</li>
          <li><strong>For children aged 13 and above:</strong> While they may provide their own information, we encourage parental oversight and engagement.</li>
        </ul>
        <p>We do not knowingly collect personal information from children under the age of 13 without obtaining verifiable consent from a parent or guardian. If you believe that we may have inadvertently collected personal information from a child under 13 without proper consent, please contact us immediately, and we will take steps to delete that information.</p>

        <h2>10. Links to Other Websites</h2>
        <p>Our website may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>

        <h2>11. Changes to This Privacy Policy</h2>
        <p>We may update our Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top of this Policy.</p>
        <p>For significant changes, we may provide more prominent notice (e.g., via email or a pop-up notice on our website) prior to the change becoming effective. You are advised to review this Privacy Policy periodically for any changes. Your continued use of the Service after any modifications to the Privacy Policy will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.</p>

        <h2>12. Contact Us</h2>
        <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
        <p><strong>iCodeGuru</strong><br />
        <strong>Email:</strong> nkonzon123@gmail.com<br />
        <strong>Phone:</strong> +27 60 760 1329
        </p>
        <p>We are committed to resolving any complaints about our collection or use of your personal information.</p>
      </div>
    </div>
  );
}