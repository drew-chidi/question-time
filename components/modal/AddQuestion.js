/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"
import { useState } from "react"
import { Formik, Form, FieldArray, Field, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { X } from "lucide-react"
import { DialogClose } from "@radix-ui/react-dialog"



const AddQuestion = ({ onSubmitQuestion, ...props }) => {
    // const [selectedTab, setSelectedTab] = useState("three");
    // const [questions, setQuestions] = useState([]);
    // const [newQuestion, setNewQuestion] = useState('');
    const [loading, setLoading] = useState(false);

    const { initialValues } = props

    // Define Yup validation schema
    const validationSchema = Yup.object().shape({
        question: Yup.string()
            .required('Question is required')
            .min(5, 'Minimum 5 characters required'),
        options: Yup.array()
            .of(Yup.string())
            .required('At least 3 options are required')
            .min(3, 'Minimum 3 options required')
            .max(5, 'Maximum 5 options allowed')
    });

    const handleAddQuestion = (values) => {
        onSubmitQuestion(values)
    }

    return (
        <DialogContent className="sm:max-w-[425px]">
            <Formik
                initialValues={{
                    question: initialValues?.question || '',
                    options: initialValues?.options || ['', '', '']
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    handleAddQuestion(values);
                    resetForm()
                }}
            >
                {({ values, handleChange, handleBlur, isSubmitting }) => (
                    <Form>
                        <DialogHeader>
                            <DialogTitle>Add question</DialogTitle>
                            <DialogDescription>
                                Add multichoice question here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid w-full gap-1.5">
                                <Label htmlFor="question">Your question</Label>
                                <Textarea placeholder="Type your question here." id="question" name="question"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.question}
                                />
                                <ErrorMessage name="question" component="div" className="error text-red-600 text-xs" />
                            </div>
                            <div>
                                <label className="text-sm leading-4">Options:</label>
                                <FieldArray name="options" value={values.options}>
                                    {({ push, insert, remove }) => (
                                        <div className="grid gap-4 pt-2 pb-4">
                                            {values?.options.map((option, index) => (
                                                <div className="grid grid-cols-12 items-center gap-1.5" key={index}>
                                                    <Input
                                                        name={`options.${index}`}
                                                        id={`options.${index}`} placeholder={`option ${index + 1}`}
                                                        className="col-span-11"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.options[index]}
                                                    />
                                                    <Button
                                                        variant="ghost" size="icon"
                                                        onClick={() => remove(index)}
                                                        disabled={values.options.length <= 3}
                                                    >
                                                        <X />
                                                    </Button>
                                                </div>
                                            ))}
                                            <div>
                                                <Button
                                                    type="button"
                                                    // onClick={() => insert(values.options.length, '')}
                                                    onClick={() => push('')}
                                                    disabled={values.options.length >= 5}
                                                    // className={'bg-blue-800'}
                                                    variant='outline'
                                                >
                                                    Add Option
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </FieldArray>
                                <ErrorMessage name="options" component="div" className="error text-red-600" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={loading} className={'bg-blue-800'}
                            >
                                {loading ? 'Adding...' : 'Add Question'}
                            </Button>
                        </DialogFooter>
                    </Form>
                )}
            </Formik>

        </DialogContent>
    )
}

export default AddQuestion