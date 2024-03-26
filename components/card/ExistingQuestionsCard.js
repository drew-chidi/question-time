import React, { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Pencil, Trash2 } from "lucide-react"
import AddQuestion from "../modal/AddQuestion"
import { Dialog, DialogTrigger } from "../ui/dialog"
import { deleteQuestion, editQuestion } from "@/util/api"
import toast from "react-hot-toast"
import { SkeletonCard } from "./SkeletonCard"


const ExistingQuestionsCard = ({ data, onQuestionChange, setIsLoading, isLoading }) => {

    const questionId = data.id

    const handleEditQuestion = async (values) => {
        setIsLoading(true);
        try {
            const questionData = {
                question: values.question,
                options: values.options.filter(option => option.trim() !== '')
            };
            await editQuestion(questionId, questionData);
            toast.success('Updated successfully!')
            onQuestionChange()
        } catch (error) {
            toast.error(`This didn't work. ${error}`)
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteQuestion = async () => {
        try {
            await deleteQuestion(questionId);
            setIsLoading(true);
            onQuestionChange()
        } catch (error) {
            toast.error('Error deleting question:', error)
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <SkeletonCard />
        )
    }

    return (
        <Card className="w-[250px] h-[200px] flex flex-col overflow-scroll">
            <CardHeader className='pb-4'>
                <CardTitle className='text-base leading-[1.4rem] font-bold'>{`${data.question}`}</CardTitle>
            </CardHeader>
            <CardContent className='pb-4 flex-grow flex-1'>
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
                        <Button variant="ghost" className='p-0 text-blue-500 w-4 h-4' name='Edit question' role='button' type='button'>
                            <Pencil />
                        </Button>
                    </DialogTrigger>
                    <AddQuestion label='edit' initialValues={{ question: data.question, options: data.options }} onSubmitQuestion={handleEditQuestion} />
                </Dialog>
                <Button variant="ghost" className='text-red-500 p-0 w-4 h-4' onClick={handleDeleteQuestion} name='Delete question' role='button' type='button'>
                    <Trash2 />
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ExistingQuestionsCard