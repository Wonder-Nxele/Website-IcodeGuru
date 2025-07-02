import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "../css/QAPage.css";
import { Timestamp } from "firebase/firestore";

export default function QAPage() {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [answerInputs, setAnswerInputs] = useState({});
  const [questionTitleInput, setQuestionTitleInput] = useState(""); // New state for question title
  const [questionInput, setQuestionInput] = useState("");
  const [user, setUser] = useState(null);

  // Track logged-in user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return unsub;
  }, []);

  // Fetch questions in real-time
  useEffect(() => {
    const q = query(collection(db, "questions"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, async (snapshot) => {
      const questionsWithAnswers = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const question = { id: docSnap.id, ...docSnap.data(), answers: [] };

          // Fetch answers subcollection
          const answersSnap = await getDocs(
            collection(db, "questions", docSnap.id, "answers")
          );
          question.answers = answersSnap.docs.map((d) => d.data());

          return question;
        })
      );

      setQuestions(questionsWithAnswers);
    });

    return unsub;
  }, []);

  // Add a new question
  const handlePostQuestion = async () => {
    if (!user) return alert("Please log in to post a question.");
    // Ensure both title and question text are provided
    if (!questionTitleInput.trim() || !questionInput.trim()) {
      return alert("Please fill in both the question title and description.");
    }

    await addDoc(collection(db, "questions"), {
      title: questionTitleInput.trim(), // Save the title
      text: questionInput.trim(),
      createdAt: Timestamp.now(),
      asked_by: user.displayName || user.email,
      user_id: user.uid,
      upvotes: 0,
      downvotes: 0,
    });

    setQuestionTitleInput(""); // Clear title input
    setQuestionInput("");
  };

  // Submit answer to subcollection
  const handleAnswerSubmit = async (questionId) => {
    const answer = answerInputs[questionId]?.trim();
    if (!user) return alert("Log in to answer.");
    if (!answer) return;

    await addDoc(collection(db, "questions", questionId, "answers"), {
      text: answer,
      createdAt: Timestamp.now(),
      answered_by: user.displayName || user.email,
      user_id: user.uid,
    });

    setAnswerInputs((prev) => ({ ...prev, [questionId]: "" }));
  };

  // Handle upvote/downvote
  const handleVote = async (id, type) => {
    if (!user) return alert("Log in to vote.");

    const qRef = doc(db, "questions", id);
    const q = questions.find((q) => q.id === id);

    await updateDoc(qRef, {
      upvotes: type === "up" ? q.upvotes + 1 : q.upvotes,
      downvotes: type === "down" ? q.downvotes + 1 : q.downvotes,
    });
  };

  // Filter questions by both title and text
  const filteredQuestions = questions.filter((q) =>
    (q.title?.toLowerCase().includes(searchTerm.toLowerCase()) || // Search by title
     q.text.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="qa-container">
      <h2 className="qa-title">  Questions & Answers - Ask Questions, Get Answers, Share Expertise!</h2>
      <div className="qa-search">
        <input
          type="text"
          placeholder="Search questions by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
        
      <div className="qa-ask-form">
        <input // New input for question title
          type="text"
          value={questionTitleInput}
          onChange={(e) => setQuestionTitleInput(e.target.value)}
          placeholder="Enter question title..."
          className="question-title-input" // Add a class for styling if needed
        />
        <textarea
          value={questionInput}
          onChange={(e) => setQuestionInput(e.target.value)}
          placeholder="Describe your question in detail..."
        ></textarea>
        <button onClick={handlePostQuestion}>Post Question</button>
      </div>

        <h2 className="qa-title">💬 Questions & Answers</h2>
      {filteredQuestions.length === 0 ? (
        <p className="no-questions-message">No questions found. Be the first to ask!</p>
      ) : (
        filteredQuestions.map((q) => (
          <div key={q.id} className="question-card">
            <div className="question-header">
              {/* Display the question title */}
              <h3 className="question-card-title">{q.title}</h3>
              <span>{q.asked_by}</span>
              <span>
                {q.createdAt?.toDate
                  ? q.createdAt.toDate().toLocaleString()
                  : "Unknown date"}
              </span>
              <span className="answer-count">Answers: {q.answers?.length || 0}</span>
            </div>

            <div className="question-body">{q.text}</div>

            <div className="qa-actions">
              <button className="vote-btn" onClick={() => handleVote(q.id, "up")}>
                👍 {q.upvotes}
              </button>
              <button className="vote-btn" onClick={() => handleVote(q.id, "down")}>
                👎 {q.downvotes}
              </button>
            </div>

            <div className="answer-form">
              <textarea
                value={answerInputs[q.id] || ""}
                onChange={(e) =>
                  setAnswerInputs((prev) => ({
                    ...prev,
                    [q.id]: e.target.value,
                  }))
                }
                placeholder="Write your answer..."
              ></textarea>
              <button onClick={() => handleAnswerSubmit(q.id)}>Submit Answer</button>
            </div>

            {q.answers?.length > 0 && (
              <div className="answer-list">
                <h4>Answers:</h4>
                {q.answers.map((a, idx) => (
                  <p key={idx} style={{ fontSize: "14px", marginBottom: "6px" }}>
                    ➤ {a.text}
                    <br />
                    <span style={{ fontSize: "12px", color: "#ccc" }}>
                      — {a.answered_by}
                    </span>
                  </p>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}