import "../css/About.css";
import { Link } from "react-router-dom";
export default function About() {
  return (
    <div className="page-content">
    <div className="about-container" >
      <h1>🧠 About <span className="highlight">iCodeGuru</span>
      </h1>
      <p>
        <strong>iCodeGuru</strong> is a dynamic tutoring platform founded by <strong>Wonder Nxele</strong>, a Computer Science and Information Technology student at the University of KwaZulu-Natal.
        Built on a passion for academic excellence and student empowerment, iCodeGuru specializes in providing high-quality tutoring in programming, IT, statistics, and math modules.
      </p>

      <p>
        We offer personalized, results-driven support for students across various levels, with a strong focus on building both technical skills and academic confidence. Whether you're struggling with your first line of code or prepping for finals, <strong>iCodeGuru</strong> is here to guide you every step of the way.
      </p>

      <p className="quote">
        💡 Our tutoring is more than just lessons — it's mentorship, motivation, and mastery.
      </p>

      <h2>📚 Modules We Cover for the Second Semester</h2>
      <ul>
        <li>Computer Science (<strong>COMP102, COMP201</strong>)</li>
        <li>Mathematics (<strong>MATHS130, MATHS140</strong>)</li>
        <li>Information Systems & Networks (<strong>ISTN212</strong>)</li>
        <li>Statistics (<strong>STATS130, STATS140</strong>)</li>
      </ul>
      <p>Prices range from <strong>R70 to R90</strong> per hour, depending on the module.</p>

      <h2>📜 Rules & Regulations</h2>
      <ol>
        <li><strong>Bookings & Payments</strong><br/>
          - Sessions must be booked at least 24 hours in advance.<br/>
          - Payment must be made before the session begins, unless a prior agreement has been made.<br/>
          - Missed payments may result in suspension of future lessons.
        </li>
        <li><strong>Cancellations & Rescheduling</strong><br/>
          - Cancel or reschedule up to 12 hours before your session.<br/>
          - Late cancellations (less than 12 hours) will be billed at 50% of the session fee.<br/>
          - No-shows will be billed in full.
        </li>
        <li><strong>Conduct & Respect</strong><br/>
          - Maintain respectful communication at all times.<br/>
          - Any form of disrespect, harassment, or inappropriate behavior will lead to a permanent ban.
        </li>
        <li><strong>Academic Integrity</strong><br/>
          - We do not do assignments, tests, or exams on your behalf.<br/>
          - Tutors guide understanding, not academic dishonesty.
        </li>
        <li><strong>Feedback & Support</strong><br/>
          - Feedback is always welcome!<br/>
          - Performance-based incentives (discounts, free sessions) are available based on effort and improvement.
        </li>
        <li><strong>Group Sessions</strong><br/>
          - Available upon request with advance coordination.<br/>
          - Prices vary based on group size.
        </li>
      </ol>

      <p className="footer-note">
        Need help? Questions or suggestions? Contact us anytime — we're here to support your success.
      </p>
    </div>
    </div>
  );
}
