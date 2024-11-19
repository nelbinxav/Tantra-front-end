'use client'

import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"

export default function EmailProviderSelection() {
  const [selectedProvider, setSelectedProvider] = useState('')
  const [domain, setDomain] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [submissionStatus, setSubmissionStatus] = useState('')

  const validateDomain = (domain: string) => {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/
    return domainRegex.test(domain)
  }

  const handleAuthenticate = async () => {
    if (selectedProvider === 'custom' && !domain) {
      setError('Please enter a domain.')
      return
    }

    setIsLoading(true)
    setError('')

    // Simulating an API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    if (selectedProvider === 'custom' && !validateDomain(domain)) {
      setError('The domain you entered appears to be invalid. Please check and try again.')
      setIsLoading(false)
      return
    }

    // Show "Domain Submitted" for 1 second
    setSubmissionStatus('Domain Submitted')
    setIsLoading(false)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Move to the DNS setup step (this would be handled by the parent component in a real app)
    console.log('Moving to DNS setup step')
  }

  return (
    <div className="container mx-auto px-4 py-8 h-full flex flex-col">
      <div className="flex-grow flex flex-col lg:flex-row lg:space-x-8">
        <div className="w-full lg:w-2/3 mb-8 lg:mb-0">
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold">
              Step 1 of 4: Select Your Email Provider
            </h1>
            <Progress value={25} className="h-2 mt-4" />
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-heading font-bold mb-4">Choose your email provider</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Select your preferred email provider to set up your account.
            </p>
            <div className="space-y-4">
              <Button
                variant={selectedProvider === 'gmail' ? 'default' : 'secondary'}
                onClick={() => setSelectedProvider('gmail')}
                className="w-full justify-start text-left"
              >
                Gmail
              </Button>
              <Button
                variant={selectedProvider === 'outlook' ? 'default' : 'secondary'}
                onClick={() => setSelectedProvider('outlook')}
                className="w-full justify-start text-left"
              >
                Outlook
              </Button>
              <Button
                variant={selectedProvider === 'custom' ? 'default' : 'secondary'}
                onClick={() => setSelectedProvider('custom')}
                className="w-full justify-start text-left"
              >
                Custom Domain
              </Button>
            </div>

            {selectedProvider === 'custom' && (
              <div className="mt-6">
                <label htmlFor="domain" className="font-medium mb-2 block">Enter Your Domain:</label>
                <div className="relative mb-6">
                  <Input
                    id="domain"
                    type="text"
                    placeholder="yourdomain.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className={`w-full text-lg transition-all duration-300 ease-in-out ${
                      error ? 'border-destructive focus:ring-destructive' : ''
                    }`}
                  />
                </div>
              </div>
            )}

            {error && (
              <p className="text-destructive text-sm mb-4">
                {error}
              </p>
            )}
            
            <Button
              onClick={handleAuthenticate}
              disabled={isLoading || !selectedProvider}
              className="w-full text-lg py-6 mt-6"
            >
              {isLoading ? (
                <span className="animate-pulse">Processing...</span>
              ) : submissionStatus ? (
                <span>{submissionStatus}</span>
              ) : (
                <>
                  Continue
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </div>
        
        <div className="w-full lg:w-1/3">
          <Card className="h-full">
            <CardContent className="p-6">
              <h3 className="text-2xl font-heading font-bold mb-6">
                Email Provider Details
              </h3>
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-heading font-bold mb-2">Gmail</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Easy setup with Google account</li>
                      <li>• 15 GB free storage</li>
                      <li>• Advanced spam filtering</li>
                      <li>• Integration with Google Workspace</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-heading font-bold mb-2">Outlook</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Seamless Microsoft 365 integration</li>
                      <li>• 15 GB free storage</li>
                      <li>• Advanced security features</li>
                      <li>• Focused inbox for important emails</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-heading font-bold mb-2">Custom Domain</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Professional email addresses</li>
                      <li>• Full control over email settings</li>
                      <li>• Improved brand credibility</li>
                      <li>• Flexible storage options</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}