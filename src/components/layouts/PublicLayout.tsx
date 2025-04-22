interface PublicLayoutProps {
    children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
    console.log('Rendering PublicLayout');
    return (
        <div className="flex flex-1 h-screen bg-background text-foreground transition-colors duration-200">
            <main className="flex-1 p-2 h-full overflow-hidden flex items-center justify-center">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </main>
        </div>
    );
} 