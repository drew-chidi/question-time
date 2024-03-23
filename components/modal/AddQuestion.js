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
import OptionTabs from "../tab/OptionTabs"
import { useState } from "react"
import { Formik, Form, FieldArray, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { X } from "lucide-react"



const AddQuestion = ({ onSubmitQuestion }) => {
    const [selectedTab, setSelectedTab] = useState("three");
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [loading, setLoading] = useState(false);

    // Define Yup validation schema
    const validationSchema = Yup.object().shape({
        newQuestion: Yup.string().required('Question is required'),
        options: Yup.array()
            .of(Yup.string())
            .required('At least one option is required')
            .min(3, 'Minimum 3 options required')
            .max(5, 'Maximum 5 options allowed')
    });

    const handleAddQuestion = () => {
        onSubmitQuestion()
    }

    return (
        <DialogContent className="sm:max-w-[425px]">
            <Formik
                initialValues={{ newQuestion: '', options: ['', '', ''] }}
                validationSchema={validationSchema}
                onSubmit={(values) => handleAddQuestion(values)}
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
                                <Label htmlFor="message">Your question</Label>
                                <Textarea placeholder="Type your message here." id="message" />
                            </div>
                            <div >
                                <label>Options:</label>
                                <FieldArray name="options">
                                    {({ insert, remove }) => (
                                        <div className="grid gap-4 py-4">
                                            {/* <div key={index}>
                                                    <Field name={`options.${index}`} /> */}
                                            {values.options.map((option, index) => (
                                                <div className="grid grid-cols-12 items-center gap-1.5" key={index}>
                                                    <Input
                                                        name={`options.${index}`}
                                                        id={`options.${index}`} placeholder={`option ${index + 1}`}
                                                        className="col-span-11"
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
                                                    onClick={() => insert(values.options.length, '')}
                                                    disabled={values.options.length >= 5}
                                                    className={'bg-blue-800'}
                                                >
                                                    Add Option
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </FieldArray>
                                <ErrorMessage name="options" component="div" className="error" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={loading}>
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
// /* eslint-disable react/no-unescaped-entities */
// import { Button } from "@/components/ui/button"
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "../ui/textarea"
// import OptionTabs from "../tab/OptionTabs"
// import { useState } from "react"
// import { Formik, Form, FieldArray, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';



// const AddQuestion = () => {
//     const [selectedTab, setSelectedTab] = useState("three");
//     const [questions, setQuestions] = useState([]);
//     const [newQuestion, setNewQuestion] = useState('');
//     const [loading, setLoading] = useState(false);


//     // Define Yup validation schema
//     const validationSchema = Yup.object().shape({
//         newQuestion: Yup.string().required('Question is required'),
//         options: Yup.array()
//             .of(Yup.string())
//             .required('At least one option is required')
//             .min(3, 'Minimum 3 options required')
//             .max(5, 'Maximum 5 options allowed')
//     });


//     return (
//         <DialogContent className="sm:max-w-[425px]">
//             <Formik
//                 initialValues={{ newQuestion: '', options: ['', '', ''] }}
//                 validationSchema={validationSchema}
//                 onSubmit={(values) => handleAddQuestion(values)}
//             >
//                 {({ values, handleChange, handleBlur, isSubmitting }) => (
//                     <Form>
//                         <DialogHeader>
//                             <DialogTitle>Add question</DialogTitle>
//                             <DialogDescription>
//                                 Add multichoice question here. Click save when you're done.
//                             </DialogDescription>
//                         </DialogHeader>
//                         <div className="grid gap-4 py-4">
//                             <div className="grid w-full gap-1.5">
//                                 <Label htmlFor="message">Your question</Label>
//                                 <Textarea placeholder="Type your message here." id="message" />
//                             </div>
//                             <div>
//                                 <p className="mb-1.5">
//                                     Options
//                                 </p>
//                                 <OptionTabs onSelect={setSelectedTab} />
//                             </div>
//                             <div className="grid grid-cols-4 items-center gap-1.5">
//                                 {/* <Label htmlFor="option1" className="text-left">
//                         1
//                     </Label> */}
//                                 <Input
//                                     id="option1"
//                                     placeholder="option 1"
//                                     className="col-span-4"
//                                 />
//                             </div>
//                             <div className="grid grid-cols-4 items-center gap-1.5">
//                                 {/* <Label htmlFor="option2" className="text-left">
//                         2
//                     </Label> */}
//                                 <Input
//                                     id="option2"
//                                     placeholder="option 2"
//                                     className="col-span-4"
//                                 />
//                             </div>
//                             <div className="grid grid-cols-4 items-center gap-1.5">
//                                 {/* <Label htmlFor="option3" className="text-left">
//                         3
//                     </Label> */}
//                                 <Input
//                                     id="option3"
//                                     placeholder="option 3"
//                                     className="col-span-4"
//                                 />
//                             </div>
//                             {selectedTab !== 'three' &&
//                                 <div className="grid grid-cols-4 items-center gap-1.5">
//                                     {/* <Label htmlFor="option4" className="text-left">
//                             4
//                         </Label> */}
//                                     <Input
//                                         id="option4"
//                                         placeholder="option 4"
//                                         className="col-span-4"
//                                     />
//                                 </div>
//                             }
//                             {selectedTab !== 'three' && selectedTab !== 'four' &&
//                                 <div className="grid grid-cols-4 items-center gap-1.5">
//                                     {/* <Label htmlFor="option5" className="text-left">
//                             5
//                         </Label> */}
//                                     <Input
//                                         id="option5"
//                                         placeholder="option 5"
//                                         className="col-span-3"
//                                     />
//                                 </div>}
//                         </div>
//                         <DialogFooter>
//                             <Button type="submit" disabled={loading}>
//                                 {loading ? 'Adding...' : 'Add Question'}
//                             </Button>
//                         </DialogFooter>
//                     </Form>
//                 )}
//             </Formik>

//         </DialogContent>
//     )
// }

// export default AddQuestion