import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs'
import Replicate from "replicate";
import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit';

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!,
})


export async function POST(
    req: Request
) {
    try{

        const { userId } = auth();
        const body = await req.json();
        const { prompt } = body;

        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 });
        }


        if(!prompt) {
            return new NextResponse("Prompt are required", { status: 400});
        }

        const freeTrial = await checkApiLimit();
        if(!freeTrial) {
            return new NextResponse("Free trial is expired", {status: 403})
        }


        const response = await replicate.run(
            "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
            {
              input: {
                prompt_a: prompt
              }
            }
          );

        await increaseApiLimit();
        
        return NextResponse.json(response);

    }
    catch (error){
        console.log('[MUSIC ERROR]', error)
        return new NextResponse("Internal Error", { status: 500 });
    }
}