"use client"

import * as z from "zod";
import Heading from "@/components/heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import { Empty } from "@/components/empty";

export default function ConversationPage() {
    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;
    const submit = async (values: z.infer<typeof formSchema>) => {
        try{
            const userMessages: ChatCompletionRequestMessage = {
                role: "user",
                content: values.prompt,
            }

            const newMessage = [...messages, userMessages];
            const response = await axios.post('/api/conversation', {
                messages: newMessage
            });

            setMessages((current) => [...current, userMessages, response.data]);

            form.reset();
        } 
        catch (error: any) {
            //TODO: open pro model
            console.log(error);
        } 
        finally {
            router.refresh();
        }
    }

    return (
        <div>
            <Heading 
                title="Conversation"
                description="Our most advanced conversation page"
                icon={MessageSquare}
                iconColor="text-violet-500"
                bgColor="bg-vio;et-500/10"
            />
            <div className="px-4 lg:px-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submit)} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                        <FormField name="prompt"
                        render={({ field }) =>  (
                            <FormItem className="col-span-12 lg:col-span-10">
                                <FormControl className="m-0 p-0">
                                    <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" disabled={isLoading} placeholder="Suggest some business ideas." {...field}/>
                                </FormControl>
                            </FormItem>
                        )}
                        />
                        <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading} >
                            Generate
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="space-y-4 mt-4">
                <div className="flex flex-col-reverse gap-y-4">
                    {messages.length === 0 && !isLoading && (
                        <Empty label="Conversation not started yet" />
                    )}
                    {messages.map((message) => (
                        <div key={message.content}>
                            {message.content}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}