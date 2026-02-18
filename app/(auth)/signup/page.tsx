// app/(auth)/signup/page.tsx
import AuthPageWrapper from "../AuthPageWrapper";

export default function SignupPage() {
  return (
    <AuthPageWrapper>
      <div className="w-full max-w-md mx-auto">
        <div className="bg-[#0B0F1A] border border-white/10 rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Sign Up</h1>
          {/* Your signup form content here */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input 
                type="email" 
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Create a password"
              />
            </div>
            <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
              Sign Up
            </button>
          </form>
          <p className="text-center mt-6 text-gray-400">
            Already have an account?{' '}
            <a href="/login?modal=true" className="text-blue-400 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </AuthPageWrapper>
  );
}
