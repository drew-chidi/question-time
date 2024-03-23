import Image from "next/image";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Inter } from "next/font/google";
import { addQuestion, getQuestions } from "@/services/api";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '']);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuestionsData = async () => {
      try {
        const questionsData = await getQuestions();
        setQuestions(questionsData);
      } catch (error) {
        console.error('Error fetching questions:', error);
        // Handle error (e.g., display error message)
      }
    };

    fetchQuestionsData();

    // Check if token exists on component mount
    const token = localStorage.getItem('qt_token');
    if (token) {
      router.push('/token'); // Redirect to /token if token doesn't exist
    }
  }, []);

  const handleAddQuestion = async () => {
    setLoading(true);
    try {
      const questionData = {
        question: newQuestion,
        options: options.filter(option => option.trim() !== '') // Remove empty options
      };
      await addQuestion(questionData);
      // Refresh questions list after adding new question
      const updatedQuestionsData = await getQuestions();
      setQuestions(updatedQuestionsData);
      setNewQuestion('');
      setOptions(['', '', '']);
    } catch (error) {
      console.error('Error adding question:', error);
      // Handle error (e.g., display error message)
    } finally {
      setLoading(false);
    }
  };

  // Other functions for editing and deleting questions

  return (
    <main
      className={`${inter.className}`}
    >
      <div>
        <h1>Question Management</h1>
        {/* Display existing questions */}
        {questions?.length > 0 ?
          <ul>
            {questions.map(question => (
              <li key={question.id}>
                <strong>{question.question}</strong>
                <ul>
                  {question.options.map((option, index) => (
                    <li key={index}>{option}</li>
                  ))}
                </ul>
                {/* Add buttons for editing and deleting questions */}
              </li>
            ))}
          </ul>
          :
          <p>no questions added yet</p>
        }

        {/* Form for adding new question */}
        <h2>Add New Question</h2>
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Enter new question"
        />
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[index] = e.target.value;
              setOptions(newOptions);
            }}
            placeholder={`Option ${index + 1}`}
          />
        ))}
        <button onClick={handleAddQuestion} disabled={loading}>
          {loading ? 'Adding...' : 'Add Question'}
        </button>
      </div>
    </main>
  );
}
