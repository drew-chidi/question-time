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
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchQuestionsData = async () => {
    setLoading(true);
    try {
      const questionsData = await getQuestions();
      const questionsArray = Object.keys(questionsData).map(key => ({
        id: key,
        ...questionsData[key]
      }));
      setQuestions(questionsArray);
    } catch (error) {
      toast.error('Error fetching questions:', error)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchQuestionsData();
    const token = localStorage.getItem('qt_token');
    if (!token) {
      router.push('/token');
    }
  }, []);

  const handleAddQuestion = async (values) => {
    setLoading(true);
    try {
      const questionData = {
        question: values.question,
        options: values.options.filter(option => option.trim() !== '')
      };
      const response = await addQuestion(questionData);
      // Refresh questions list after adding new question
      if (response) {
        console.log('add question response', response)
        fetchQuestionsData()
        setOpen(false)
      }
    } catch (error) {
      // console.error('Error adding question:', error);
      toast.error('Error adding question:', error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${inter.className}`}
    >
      <div className="mt-10">
        {/* <h1 className="text-center">Question Management</h1> */}
        {/* Display existing questions */}
        <div className="flex justify-end my-4 mb-10">
          <Dialog open={open} onOpenChange={setOpen}>
            <div className="inline-flex gap-3 items-center">

              <DialogTrigger asChild>
                <Button variant="outline" size="icon" className='w-8 h-8'>
                  <Plus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <span>Add question</span>
            </div>
            <AddQuestion initialValues={{ question: '', options: ['', '', ''] }} onSubmitQuestion={handleAddQuestion} />
          </Dialog>
        </div>
        <div >
          {questions?.length > 0 ?
            <ul>
              <li className="flex gap-4 flex-wrap justify-center">
                {questions.map(question => (
                  <ExistingQuestionsCard
                    data={question}
                    key={question.id}
                    onQuestionChange={fetchQuestionsData}
                    isLoading={loading}
                    setIsLoading={setLoading} />
                ))}
              </li>
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
