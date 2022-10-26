export default function MainContent({children}) {
    return (
        <main className="main-content" style={{ position: 'relative' }}>
            {children}
        </main>
    )
}