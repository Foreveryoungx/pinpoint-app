import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background text-foreground">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tighter text-primary drop-shadow-[0_0_15px_rgba(0,255,157,0.5)]">
          PinPoint
        </h1>
        <p className="text-xl text-gray-400 tracking-wide">
          Arsenal & Oil Manager
        </p>
        <div className="pt-8">
          <Link href="/arsenal">
            <button className="px-6 py-3 bg-secondary border border-primary/30 text-primary rounded-xl hover:bg-primary hover:text-black transition-all duration-300 font-medium">
              Enter Arsenal
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
