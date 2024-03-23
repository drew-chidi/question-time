import Image from "next/image";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Inter } from "next/font/google";
import { addQuestion, getQuestions } from "@/services/api";
import { FilePlus, Mail, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddQuestion from "@/components/modal/AddQuestion";
import ExistingQuestionsCard from "@/components/card/ExistingQuestionsCard";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '']);
  const [loading, setLoading] = useState(false);

  console.log('questions', questions)

  useEffect(() => {
    const fetchQuestionsData = async () => {
      try {
        const questionsData = await getQuestions();
        // Convert object into array of objects
        const questionsArray = Object.keys(questionsData).map(key => ({
          id: key,
          ...questionsData[key]
        }));
        setQuestions(questionsArray);
      } catch (error) {
        console.error('Error fetching questions:', error);
        // Handle error (e.g., display error message)
      }
    };

    fetchQuestionsData();

    const token = localStorage.getItem('qt_token');
    if (!token) {
      router.push('/token');
    }
  }, []);

  const handleAddQuestion = async (values) => {
    console.log('values', values)
    setLoading(true);
    try {
      const questionData = {
        question: values.question,
        options: values.options.filter(option => option.trim() !== '') // Remove empty options
      };
      await addQuestion(questionData);
      // Refresh questions list after adding new question
      const updatedQuestionsData = await getQuestions();
      console.log('updated questions', updatedQuestionsData)
      setQuestions(updatedQuestionsData);
      // setNewQuestion('');
      // setOptions(['', '', '']);
    } catch (error) {
      console.error('Error adding question:', error);
      // Handle error (e.g., display error message)
    } finally {
      setLoading(false);
    }
  };

  // Other functions for editing and deleting questions
  return (
    <div
      className={`${inter.className}`}
    >
      <div className="mt-10">
        <h1 className="text-center">Question Management</h1>
        {/* Display existing questions */}
        <div className="flex justify-end my-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <AddQuestion initialValues={{ question: '', options: ['', '', ''] }} onSubmitQuestion={handleAddQuestion} />
          </Dialog>
        </div>
        <div >
          {/* <h2 className="border-b-2 inline-block mb-8">Existing Questions</h2> */}
          {questions?.length > 0 ?
            <ul>
              {questions.map(question => (
                <li key={question.id}>
                  <ExistingQuestionsCard data={question} />
                </li>
              ))}
            </ul>
            :
            <div className="flex flex-col justify-center items-center">
              <p className="text-center mb-4">no questions added yet</p>
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <FilePlus className="mr-2 h-4 w-4" /> Add Question
                    </Button>
                  </DialogTrigger>
                  <AddQuestion initialValues={{ question: '', options: ['', '', ''] }} onSubmitQuestion={handleAddQuestion} />
                </Dialog>
              </div>
            </div>
          }
        </div>

        {/* Form for adding new question */}
        {/* <h2>Add New Question</h2>
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
        </button> */}
      </div>
    </div>
  );
}
