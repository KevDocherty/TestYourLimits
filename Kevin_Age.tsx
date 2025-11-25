"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AgeValidationPage() {
  const [age, setAge] = useState("")
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"error" | "success" | "">("")

  /**
   * Validates the entered age according to the following rules:
   * - Age < 18: Access denied (too young)
   * - Age > 60: Access denied (exceeds maximum)
   * - Age 18-60 (inclusive): Access granted
   */
  const handleSubmit = (e: React.FormEvent) => {
    // Prevent form submission and page reload
    e.preventDefault()

    // Convert string input to number
    const ageValue = Number.parseInt(age)

    // Validate that a valid number was entered
    if (isNaN(ageValue) || age.trim() === "") {
      setMessage("Please enter a valid age.")
      setMessageType("error")
      return
    }

    // Check if age is less than 18
    if (ageValue < 18) {
      setMessage("Access denied. You must be at least 18 years old.")
      setMessageType("error")
      return
    }

    // Check if age is greater than 60
    if (ageValue > 60) {
      setMessage("Access denied. Maximum allowed age is 60.")
      setMessageType("error")
      return
    }

    // Age is between 18 and 60 (inclusive) - grant access
    setMessage("Access granted. Welcome!")
    setMessageType("success")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo/Title Placeholder */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 mb-4">
            <svg className="h-10 w-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Age Verification</h1>
          <p className="text-muted-foreground">Please verify your age to continue</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-card border border-border rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="age" className="text-sm font-medium text-foreground">
                Enter your age
              </label>
              <Input
                id="age"
                type="number"
                placeholder="e.g., 25"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="text-base h-12"
                min="0"
                max="120"
              />
            </div>

            <Button type="submit" className="w-full h-12 text-base font-medium">
              Submit
            </Button>

            {/* Dynamic validation message display */}
            {message && (
              <div
                className={`mt-4 p-4 rounded-lg border text-sm font-medium transition-all ${
                  messageType === "error"
                    ? "bg-destructive/10 border-destructive text-destructive"
                    : "bg-green-50 dark:bg-green-950/20 border-green-600 dark:border-green-500 text-green-700 dark:text-green-400"
                }`}
                role="alert"
              >
                <div className="flex items-center gap-2">
                  {messageType === "error" ? (
                    <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <span>{message}</span>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer info */}
        <p className="text-center text-sm text-muted-foreground">Access is restricted to users aged 18-60 years</p>
      </div>
    </div>
  )
}
