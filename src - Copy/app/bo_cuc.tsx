import './toan_cuc.css'

export default function BoCuc({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <header className="bg-[var(--overwatch-dark-blue)] text-white">
        {/* Thanh điều hướng sẽ được thêm vào đây */}
      </header>
      
      <main>
        {children}
      </main>

      <footer className="bg-[var(--overwatch-black)] text-white">
        {/* Footer sẽ được thêm vào đây */}
      </footer>
    </div>
  )
}

/* File layout chính */ 