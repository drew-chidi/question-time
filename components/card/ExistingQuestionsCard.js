import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2 } from "lucide-react"
import AddQuestion from "../modal/AddQuestion"
import { Dialog, DialogTrigger } from "../ui/dialog"
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"

const ExistingQuestionsCard = ({ data }) => {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>{data.question}</CardTitle>
            </CardHeader>
            <CardContent>
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
            <CardFooter className="flex justify-end">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost"><Pencil /></Button>
                    </DialogTrigger>
                    <AddQuestion label='edit' data={data} />
                </Dialog>
                <Button variant="ghost" className='text-red-500'><Trash2 /></Button>
            </CardFooter>
        </Card>
    )
}

export default ExistingQuestionsCard