import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const OptionTabs = ({ onSelect }) => {

    return (
        <Tabs defaultValue="account" className="">
            <TabsList>
                <TabsTrigger value="three" onClick={() => onSelect("three")}>3</TabsTrigger>
                <TabsTrigger value="four" onClick={() => onSelect("four")}>4</TabsTrigger>
                <TabsTrigger value="five" onClick={() => onSelect("five")}>5</TabsTrigger>
            </TabsList>
            {/* <TabsContent value="three">3</TabsContent>
            <TabsContent value="four">4</TabsContent>
            <TabsContent value="five">5</TabsContent> */}
        </Tabs>
    )
}

export default OptionTabs