import React, { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Pencil, Trash2 } from "lucide-react"
import AddQuestion from "../modal/AddQuestion"
import { Dialog, DialogTrigger } from "../ui/dialog"
import { deleteQuestion, editQuestion } from "@/services/api"
import toast from "react-hot-toast"


const ExistingQuestionsCard = ({ data, onQuestionChange }) => {
    const [loading, setLoading] = useState(false);

    const questionId = data.id
    const handleEditQuestion = async (values) => {
        setLoading(true);
        try {
            const questionData = {
                question: values.question,
                options: values.options.filter(option => option.trim() !== '')
            };
            await editQuestion(questionId, questionData);
            toast.success('Updated successfully!')

            // Refresh questions list after adding new question
            onQuestionChange()
        } catch (error) {
            toast.error(`This didn't work. ${error}`)
        } finally {
            setLoading(false);
        }
    };
    // Function to handle deleting a question
    const handleDeleteQuestion = async () => {
        try {
            await deleteQuestion(questionId);
            onQuestionChange()
        } catch (error) {
            console.error('Error deleting question:', error);
            // Handle error (e.g., display error message)
        }
    };

    return (
        // <Card className="">
        <Card className="w-[300px]">
            <CardHeader className='pb-4'>
                <CardTitle className='text-lg'>{data.question}</CardTitle>
            </CardHeader>
            <CardContent className='pb-4'>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <ol className="list-decimal list-inside">
                            {data.options.map((option, index) => (
                                <li key={index} className="">{option}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-1">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" className='p-0 text-blue-500 w-4 h-4'>
                            <Pencil />
                        </Button>
                    </DialogTrigger>
                    <AddQuestion label='edit' initialValues={{ question: data.question, options: data.options }} onSubmitQuestion={handleEditQuestion} />
                </Dialog>
                <Button variant="ghost" className='text-red-500 p-0 w-4 h-4' onClick={handleDeleteQuestion}>
                    <Trash2 />
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ExistingQuestionsCard