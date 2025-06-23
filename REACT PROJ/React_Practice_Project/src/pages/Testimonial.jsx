import "../css/Testimonial.css";

const TESTIMONIALS = [
  {
    name: 'Thabo M.',
    course: 'Introduction To Programming With Python',
    quote: "iCodeGuru's Python sessions turned my confusion into clarity. My assignments have never looked better!"
  },
  {
    name: 'Naledi S.',
    course: 'Calculus and Linear Algebra',
    quote: "I struggled with vectors until iCodeGuru stepped in. The one-on-one coaching made all the difference."
  },
  {
    name: 'Sipho K.',
    course: 'Introduction To Calculus',
    quote: "Concepts that once felt impossible now make sense. My grade jumped from 45% to 80%!"
  },
  {
    name: 'Zanele P.',
    course: 'Java OOP and GUI',
    quote: "Building GUIs was daunting, but the tutor guided me patiently—now I'm coding my own desktop apps!"
  },
  {
    name: 'Lindiwe T.',
    course: 'Databases and Programming',
    quote: "Thanks to iCodeGuru, I aced my SQL queries and backend integration in record time. Highly recommended!"
  },
  {
    name: 'Lucky N.',
    course: 'Introduction to Statistics',
    quote: "Statistics finally clicked for me. The clear examples and practice problems boosted my confidence."
  },
  {
    name: 'Anele W.',
    course: 'FET Mathematics',
    quote: "My FET Math exam was a breeze after these focused tutoring sessions."
  },
  {
    name: 'Precious R.',
    course: 'FET Physical Science',
    quote: "Physics concepts went from abstract to practical—my tutor's passion is contagious!"
  },
  // Additional testimonials
  {
    name: 'Karabo D.',
    course: 'C++ Data Structures',
    quote: "Before iCodeGuru, pointers were a nightmare. Now I can implement linked lists and trees without fear!"
  },
  {
    name: 'Siyabonga Z.',
    course: 'Web Development with PHP',
    quote: "From zero to full CRUD — iCodeGuru helped me build my first full-stack app."
  },
  {
    name: 'Nomvula B.',
    course: 'Final Year Project Support',
    quote: "Their mentorship on my capstone project helped me score distinctions and land interviews!"
  },
  {
    name: 'Ayanda C.',
    course: 'High School Exam Prep',
    quote: "I finally understand algebra and trigonometry. My marks jumped from 50s to 80s!"
  },
];

export default function Testimonials() {
  return (
    <div className="page-content">
      <div className="testimonials-container">
        <h1>📣 What Our Students Say</h1>
        <p className="testimonial-subheading">Real success stories from learners who leveled up with iCodeGuru.</p>
        <div className="testimonial-grid">
          {TESTIMONIALS.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <p className="quote">“{t.quote}”</p>
              <p className="student-name">— {t.name}, <span>{t.course}</span></p>
            </div>
          ))}
        </div>
        <div className="testimonial-cta">
          <h2>Want to be our next success story?</h2>
          <p>Join iCodeGuru today and book your first session. Let’s write your story together.</p>
          <button className="btn-primary" onClick={() => window.location.href='/signup'}>Sign Up Now</button>
        </div>
      </div>
    </div>
  );
}
