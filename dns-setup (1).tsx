'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CheckCircle2, Server, Globe, UserCheck, Mail } from 'lucide-react'

export default function Component({ onNext }: { onNext: () => void }) {
  const [recordsAdded, setRecordsAdded] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const dnsRecords = [
    { host: "em1234.yourdomain.com", value: "u98765432.yourdomain.dnsprovider.net" },
    { host: "s1._domainkey.yourdomain.com", value: "s1.dns.yourdomain.net" },
    { host: "s2._domainkey.yourdomain.com", value: "s2.dns.yourdomain.net" },
    { host: "_dmarc.yourdomain.com", value: "v=DMARC1; p=none", type: "TXT" }
  ]

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    setTimeout(() => setCopiedText(null), 2000)
  }

  const handleVerify = () => {
    setIsVerifying(true)
    // Simulating verification process
    setTimeout(() => {
      setIsVerifying(false)
      onNext()
    }, 5000) // 5 seconds verification simulation
  }

  return (
    <div className="container mx-auto px-4 py-8 h-full flex flex-col">
      <div className="flex-grow flex flex-col lg:flex-row lg:space-x-8">
        <div className="w-full lg:w-2/3 mb-8 lg:mb-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black">
              Step 2 of 4: DNS Records Setup
            </h1>
            <Progress value={50} className="h-2 mt-4" />
          </div>
          
          <h2 className="text-xl font-semibold mb-6">Install DNS Records</h2>
          <p className="text-sm text-gray-600 mb-8">
            Add the DNS records provided below to your domain's DNS settings. This will authenticate your domain for email sending. Click on any host or value to copy it to your clipboard.
          </p>

          <div className="border rounded-lg p-3 mb-8 bg-gray-50">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Host</TableHead>
                  <TableHead className="text-xs">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dnsRecords.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell className="py-2">
                      <button
                        onClick={() => handleCopy(record.host)}
                        className="font-medium text-xs min-w-[200px] text-left hover:bg-gray-100 p-2 rounded transition-colors"
                      >
                        {record.host}
                      </button>
                    </TableCell>
                    <TableCell className="py-2">
                      <button
                        onClick={() => handleCopy(record.value)}
                        className="text-xs min-w-[200px] text-left hover:bg-gray-100 p-2 rounded transition-colors"
                      >
                        {record.value}
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center space-x-3 mb-4">
            <Checkbox
              id="terms"
              checked={recordsAdded}
              onCheckedChange={setRecordsAdded}
              className="w-5 h-5 rounded-md border-2 border-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors data-[state=checked]:bg-black data-[state=checked]:border-black"
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none cursor-pointer select-none"
            >
              Pinky promise, I've added these records!
            </label>
          </div>

          <div className="mt-8">
            {isVerifying && (
              <div className="text-center mt-8">
                <h3 className="text-lg font-semibold mb-4">Verification in Progress</h3>
                <div className="relative w-24 h-24 mx-auto">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full border-t-4 border-b-4 border-pink-500 animate-[spin_1s_linear_infinite]" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-t-4 border-b-4 border-purple-500 animate-[spin_1s_linear_infinite_reverse]" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-pink-500 animate-pulse" />
                  </div>
                </div>
              </div>
            )}
            {!isVerifying && (
              <Button
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white transition-all duration-300"
                onClick={handleVerify}
                disabled={!recordsAdded}
              >
                Verify DNS Setup
              </Button>
            )}
          </div>
        </div>
        
        <div className="w-full lg:w-1/3">
          <div className="bg-gray-50 p-6 rounded-lg h-full">
            <h3 className="text-2xl font-bold text-black mb-6 flex items-center">
              How It Works
            </h3>
            <div className="space-y-6">
              <p className="text-sm text-gray-600 mb-4">
                DNS records act as a bridge between your domain and email service, ensuring proper authentication and delivery.
              </p>

              <Accordion type="single" collapsible>
                <AccordionItem value="faq">
                  <AccordionTrigger className="text-sm font-medium">Frequently Asked Questions</AccordionTrigger>
                  <AccordionContent className="text-sm">
                    <div className="space-y-2">
                      <div>
                        <p className="font-medium">What if DNS records are incorrect?</p>
                        <p>This may lead to email delivery issues.</p>
                      </div>
                      <div>
                        <p className="font-medium">How long for DNS changes to propagate?</p>
                        <p>Usually 24-48 hours, often within a few hours.</p>
                      </div>
                      <div>
                        <p className="font-medium">What is SPF, DKIM, and DMARC?</p>
                        <p>Email authentication protocols to prevent spoofing.</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="troubleshooting">
                  <AccordionTrigger className="text-sm font-medium">Troubleshooting Tips</AccordionTrigger>
                  <AccordionContent className="text-sm">
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Double-check 'Host' and 'Value' fields for typos</li>
                      <li>Ensure you're updating the correct domain's DNS</li>
                      <li>Allow time for DNS propagation before verifying</li>
                      <li>Clear your DNS cache if you've made recent changes</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-sm mb-2">Email Authentication Process</h3>
                <div className="space-y-4">
                  {[
                    { icon: Server, title: "DNS Setup", description: "Add authentication records to your domain" },
                    { icon: CheckCircle2, title: "Verification", description: "Confirm DNS records are correctly set up" },
                    { icon: UserCheck, title: "Sender Identity", description: "Create your sender profile for recognition" },
                    { icon: Mail, title: "Improved Delivery", description: "Enjoy better email deliverability rates" }
                  ].map((step, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        index === 0 ? "bg-blue-100 text-blue-500" :
                          index === 1 ? "bg-green-100 text-green-500" :
                            index === 2 ? "bg-purple-100 text-purple-500" :
                              "bg-yellow-100 text-yellow-500"
                      }`}>
                        <step.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-sm font-medium">{index + 1}. {step.title}</h4>
                        <p className="text-xs text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-sm mb-2">Additional Resources</h3>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li><a href="#" className="hover:underline">Understanding DNS Records</a></li>
                  <li><a href="#" className="hover:underline">Email Authentication Best Practices</a></li>
                  <li><a href="#" className="hover:underline">Troubleshooting DNS Issues</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}