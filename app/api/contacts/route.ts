import { iItem } from '@/app/interfaces/list.interface';
import { randEmail, randFullName, randGender, randNumber, randPhoneNumber } from '@ngneat/falso';
import { NextRequest, NextResponse } from 'next/server';

function createRandomContact(): iItem {
    return {
        name: randFullName(),
        email: randEmail(),
        phone: randPhoneNumber(),
        gender: randGender(),
    } as iItem;
}

export const GET = async (request: NextRequest, response: NextResponse) => {
    const contacts = [];
    const { searchParams } = request.nextUrl;
    const quantity = parseInt(searchParams.get('q') || '') || randNumber({ max: 100 });

    for (let indx = 0; indx < quantity; indx++) {
        contacts.push(createRandomContact());
    }

    return NextResponse.json(contacts, { status: 200 });
};
