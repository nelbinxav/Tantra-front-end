'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Mail, CheckCircle2, RefreshCw, AlertCircle } from 'lucide-react'

export default function EmailVerification() {
  const [verificationStage, setVerificationStage] = useState<'initial' | 'waiting' | 'success'>('initial')
  const [emailSent, setEmailSent] = useState(false)
  
  // This would typically come from the previous step or be passed as a prop
  const userEmail = 'user@example.com'

  const handleSendEmail = () => {
    setEmailSent(true)
    setTimeout(() => {
      setEmailSent(false)
      setVerificationStage('waiting')
    }, 5000) // Move to waiting stage after 5 seconds
  }

  const handleResendEmail = () => {
    setEmailSent(true)
    setTimeout(() => setEmailSent(false), 5000) // Reset after 5 seconds
  }

  const renderInitialVerification = () => (
    <Card>
      <CardHeader>
        <CardTitle>Verify Your Email Address</CardTitle>
        <CardDescription>
          Please verify your email address {userEmail} to continue with the setup process.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Verification Instructions</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Click the "Send Verification Email" button below.</li>
            <li>Open the email inbox associated with {userEmail}.</li>
            <li>Look for an email from us with the subject "Verify Your Email Address."</li>
            <li>Click the link in the email to verify and complete the process.</li>
          </ol>
        </div>
        {emailSent && (
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Email Sent</AlertTitle>
            <AlertDescription>
              A verification email has been sent to your inbox.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button onClick={handleSendEmail} className="w-full">
          <Mail className="mr-2 h-4 w-4" /> Send Verification Email
        </Button>
        <Button variant="outline" className="w-full">
          Change Email Address
        </Button>
      </CardFooter>
    </Card>
  )

  const renderWaitingVerification = () => (
    <Card>
      <CardHeader>
        <CardTitle>Your Email is Not Yet Verified</CardTitle>
        <CardDescription>
          We've sent a verification email to {userEmail}. Please check your inbox and click the verification link to confirm your email address before proceeding.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Verification Required</AlertTitle>
          <AlertDescription>
            Your email address needs to be verified to access all features of our platform.
          </AlertDescription>
        </Alert>
        <div>
          <h3 className="font-semibold mb-2">Next Steps:</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Check your email inbox for the verification link</li>
            <li>Click on the verification link in the email</li>
            <li>Return to this page and refresh to continue</li>
          </ol>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button onClick={handleResendEmail} className="w-full">
          <Mail className="mr-2 h-4 w-4" /> Resend Verification Email
        </Button>
        <Button variant="outline" className="w-full" onClick={() => setVerificationStage('success')}>
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh Page
        </Button>
      </CardFooter>
    </Card>
  )

  const renderSuccessVerification = () => (
    <>
      <Card className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <CheckCircle2 className="text-green-500 w-8 h-8" />
          <h2 className="text-xl font-semibold">Email Verification Successful</h2>
        </div>
        <p className="mb-6">Your email address {userEmail} has been successfully verified. You can now proceed with using our services.</p>
        <p className="mb-6">With your email verified, you have full access to all features of our platform. You can start creating campaigns, managing your senders, and optimizing your email marketing strategy.</p>
        <div className="space-y-4">
          <Button className="w-full">Go to Campaign Builder</Button>
          <Button variant="outline" className="w-full">View Senders</Button>
        </div>
      </Card>
      <Card className="p-6 mt-6">
        <h3 className="text-lg font-semibold mb-2">Next Steps</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Set up your first campaign in the Campaign Builder</li>
          <li>Add and manage your sender profiles</li>
          <li>Customize your email templates to match your brand identity</li>
          <li>Check out our knowledge base for best practices and tips</li>
        </ul>
      </Card>
    </>
  )

  return (
    <div className="container mx-auto px-4 py-8 h-full flex flex-col">
      <div className="flex-grow flex flex-col lg:flex-row lg:space-x-8">
        <div className="w-full lg:w-2/3 mb-8 lg:mb-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black">
              Step 4 of 4: Email Verification
            </h1>
            <Progress value={100} className="h-2 mt-4" />
          </div>
          
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={verificationStage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {verificationStage === 'initial' && renderInitialVerification()}
                {verificationStage === 'waiting' && renderWaitingVerification()}
                {verificationStage === 'success' && renderSuccessVerification()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        <div className="w-full lg:w-1/3">
          <div className="w-full space-y-4 bg-gray-50 p-4 rounded-lg text-sm">
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Why Verify Your Email?</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  <li className="flex items-start">
                    <CheckCircle2 className="mr-2 h-3 w-3 mt-0.5 text-green-500 flex-shrink-0" />
                    <span>Access All Features: Unlock full functionality of our platform.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="mr-2 h-3 w-3 mt-0.5 text-green-500 flex-shrink-0" />
                    <span>Enhanced Security: Protect your account from unauthorized access.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="mr-2 h-3 w-3 mt-0.5 text-green-500 flex-shrink-0" />
                    <span>Stay Informed: Receive important updates and notifications.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="mr-2 h-3 w-3 mt-0.5 text-green-500 flex-shrink-0" />
                    <span>Seamless Experience: Enjoy uninterrupted use of our services.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Troubleshooting Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  <li className="flex items-start">
                    <AlertCircle className="mr-2 h-3 w-3 mt-0.5 text-yellow-500 flex-shrink-0" />
                    <span>Check Spam Folder: Our email might be in your spam or junk folder.</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="mr-2 h-3 w-3 mt-0.5 text-yellow-500 flex-shrink-0" />
                    <span>Whitelist Our Email: Add our email address to your contacts.</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="mr-2 h-3 w-3 mt-0.5 text-yellow-500 flex-shrink-0" />
                    <span>Be Patient: It may take a few minutes for the email to arrive.</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="mr-2 h-3 w-3 mt-0.5 text-yellow-500 flex-shrink-0" />
                    <span>Contact Support: Still having issues? Our support team is here to help.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}