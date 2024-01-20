import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs'
import { Configuration, OpenAIapi } from 'openai';
import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIapi(configuration);

export async function POST(
    req: Request
) {
    try{

        const { userId } = auth();
        const body = await req.json();
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

        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();
        if(!freeTrial && !isPro) {
            return new NextResponse("Free trial is expired", {status: 403})
        }

        const response = await openai.chat.completions.create(
            {
                model: "gpt-3.5-turbo",
                messages
            });
        
        if(!isPro) {
            await increaseApiLimit();
        }
        

        return NextResponse.json(response.choices[0].message);

    }
    catch (error){
        console.log('[CONVERSATION ERROR]', error)
        return new NextResponse("Internal Error", { status: 500 });
    }
}