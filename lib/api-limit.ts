import prismadb from "@/lib/prismadb";
import { MAX_FREE_COUNTS } from "@/constants";
import { auth } from "@clerk/nextjs";

export async function increaseApiLimit() {
    const { userId } = auth();

    if(!userId) {
        return;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userID: userId
        }
    });

    if(userApiLimit) {
        await prismadb.userApiLimit.update({
            where: {
                userID: userId
            },
            data: {
                count: userApiLimit.count + 1
            }
        });
    } else {
        await prismadb.userApiLimit.create({
            data: {
                userID: userId,
                count: 1
            }
        })
    }
};

export async function checkApiLimit() {
    const { userId } = auth();
    if(!userId) {
        return false;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userID: userId
        }
    });

    if(!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
        return true;
    } else {
        return false;
    }
}