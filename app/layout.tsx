import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
    title: 'Ivan Grimaldo Test',
    description: 'Contact List',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="bg-slate-200">{children}</body>
        </html>
    );
}
