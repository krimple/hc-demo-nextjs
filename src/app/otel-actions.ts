'use server';

export async function getHoneycombKey() {
    return process.env.HONEYCOMB_API_KEY;
}