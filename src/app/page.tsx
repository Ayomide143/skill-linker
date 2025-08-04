"use client";
export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-50 to-indigo-200 overflow-hidden">
      {/* Decorative blurred circles */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-indigo-300 opacity-30 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-blue-200 opacity-30 rounded-full blur-3xl z-0" />

      <div className="relative z-10 max-w-2xl w-full px-8 py-14 bg-white/90 rounded-2xl shadow-2xl flex flex-col items-center backdrop-blur-md border border-indigo-100">
        <div className="flex items-center gap-3 mb-4">
          <img
            src="/logo2.png"
            alt="Skill Linker Logo"
            className="h-19"
          />
          <h1 className="text-5xl font-extrabold text-indigo-700 tracking-tight drop-shadow-sm">
            Skill Linker
          </h1>
        </div>
        <p className="text-xl text-gray-700 mb-10 text-center font-medium">
          The modern freelance platform for clients, freelancers.<br />
          <span className="text-indigo-600 font-semibold">
            Connect. Collaborate. Succeed. Grow
          </span>
        </p>
        <div className="flex gap-6 mb-6">
          <a
            href="/auth/signup"
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg font-bold shadow-lg hover:scale-105 hover:from-indigo-700 hover:to-blue-600 transition-all duration-200"
          >
            Get Started
          </a>
          <a
            href="/auth/login"
            className="px-8 py-3 border-2 border-indigo-600 text-indigo-700 rounded-lg font-bold bg-white hover:bg-indigo-50 hover:border-indigo-700 transition-all duration-200"
          >
            Sign In
          </a>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-2 text-gray-500 text-sm">
          <span>For Freelancers</span>
          <span className="hidden sm:inline">|</span>
          <span>For Clients</span>
        </div>
      </div>
      <footer className="relative z-10 mt-16 text-gray-400 text-xs text-center">
        &copy; {new Date().getFullYear()} Skill Linker. All rights reserved.
      </footer>
    </main>
  );
}
