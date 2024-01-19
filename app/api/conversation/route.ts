import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs'
import { Configuration, OpenAIapi } from 'openai';
import { use } from 'react';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIapi(configuration);

export async function POST(
    req: Request
) {
    try{

        const { userId } = auth();
        const body = req.json();
        const { messages } = body;

        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!configuration) {
            return new NextResponse("OpenAi api key not configured", { status: 500});
        }

        if(!messages) {
            return new NextResponse("Message are required", { status: 400});
        }

        const response = await openai.chat.completions.create(
            {
                model: "gpt-3.5-turbo",
                messages
            });

        return NextResponse.json(response.choices[0].message);

    }
    catch (error){
        console.log('[CONVERSATION ERROR]', error)
        return new NextResponse("Internal Error", { status: 500 });
    }
}