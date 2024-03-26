import Image from "next/image";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Inter } from "next/font/google";
import { addQuestion, getQuestions } from "@/util/api";
import { FilePlus, Mail, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddQuestion from "@/components/modal/AddQuestion";
import ExistingQuestionsCard from "@/components/card/ExistingQuestionsCard";
import { SkeletonCard } from "@/components/card/SkeletonCard";
import toast from "react-hot-toast";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuestionsData = async () => {
    // setLoading(true);
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
        fetchQuestionsData()
        setOpen(false)
      }
    } catch (error) {
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
          {loading ? (
            <SkeletonCard />
          ) : questions.length > 0 ? (
            <ul>
              <li className="flex gap-4 flex-wrap justify-center">
                {questions.map(question => (
                  <ExistingQuestionsCard
                    data={question}
                    key={question.id}
                    onQuestionChange={fetchQuestionsData}
                    isLoading={loading}
                    setIsLoading={setLoading}
                  />
                ))}
              </li>
            </ul>
          ) :
            <div className="flex flex-col justify-center items-center">
              <p className="text-center mb-4">no questions added yet</p>
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className='bg-blue-500'>
                      <FilePlus className="mr-2 h-4 w-4" /> Add Question
                    </Button>
                  </DialogTrigger>
                  <AddQuestion initialValues={{ question: '', options: ['', '', ''] }} onSubmitQuestion={handleAddQuestion} />
                </Dialog>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
