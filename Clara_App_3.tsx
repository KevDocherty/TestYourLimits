'use client';

import { useState } from 'react';

export default function Home() {
  const [age, setAge] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const ageNum = parseInt(age, 10);
    
    // Validate that age is a valid number
    if (isNaN(ageNum)) {
      setMessage('Please enter a valid number');
      setStatus('error');
      return;
    }
    
    // Check age constraints
    if (ageNum < 18) {
      setMessage('Access denied. You must be at least 18 years old.');
      setStatus('error');
    } else if (ageNum > 60) {
      setMessage('Access denied. Maximum allowed age is 60.');
      setStatus('error');
    } else {
      setMessage('Access granted. Welcome!');
      setStatus('success');
    }
  };

  const handleReset = () => {
    setAge('');
    setMessage('');
    setStatus('idle');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Title Section */}
        <div className="text-center mb-12">
          <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <span className="text-xl font-bold text-primary-foreground">✓</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Age Verification</h1>
          <p className="text-muted-foreground">Please confirm your age to continue</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-foreground mb-2">
              Enter your age
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g., 25"
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              min="0"
              max="150"
            />
          </div>

          {/* Message Display */}
          {message && (
            <div
              className={`p-4 rounded-lg text-sm font-medium transition-all ${
                status === 'success'
                  ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-destructive/10 text-destructive border border-destructive/20'
              }`}
              role="alert"
            >
              {message}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background transition-all duration-200 active:scale-95"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 px-4 py-3 rounded-lg border border-input bg-background text-foreground font-medium hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background transition-all duration-200 active:scale-95"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Footer Info */}
        <div className="mt-8 p-4 rounded-lg bg-muted/50 text-center">
          <p className="text-xs text-muted-foreground">
            Age must be between 18 and 60 years old to access this content.
          </p>
        </div>
      </div>
    </main>
  );
}
