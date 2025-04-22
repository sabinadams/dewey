interface PublicLayoutProps {
    children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <div className="flex flex-1 h-screen bg-background text-foreground">
            <main className="flex-1 p-2 h-full overflow-hidden flex items-center justify-center">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </main>
        </div>
    );
} 