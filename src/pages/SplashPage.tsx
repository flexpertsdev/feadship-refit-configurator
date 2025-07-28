// ==================================================
// AI EXPLANATION: SplashPage.tsx
// ==================================================
// WHAT: Landing splash page with yacht configurator branding and navigation options to sign in or browse as guest
// WHY: Without this, users have no entry point to the application - it's the first page users see when accessing the app
// USED BY: App.tsx (default route /), entry point for all users
// CRITICAL: YES - Application entry point, breaking this prevents all access to the configurator
// ==================================================


import { Link } from "react-router-dom";

const SplashPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-white">
      <h1 className="text-5xl font-black mb-8">YACHT CONFIGURATOR</h1>
      <p className="text-xl mb-12 max-w-md text-center">
        Design your custom yacht with our interactive configurator
      </p>
      <div className="flex gap-6">
        <Link
          to="/auth"
          className="px-8 py-4 bg-accent hover:bg-accent-hover transition-colors rounded-md font-medium"
        >
          Sign In
        </Link>
        <Link
          to="/home"
          className="px-8 py-4 border-2 border-white hover:bg-white hover:text-primary transition-colors rounded-md font-medium"
        >
          Browse as Guest
        </Link>
      </div>
    </div>
  );
};

export default SplashPage;
