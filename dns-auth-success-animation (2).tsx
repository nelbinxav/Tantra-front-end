'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

export default function DNSAuthSuccessAnimation({ onAnimationComplete }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center z-50"
      onAnimationComplete={onAnimationComplete}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white rounded-lg p-8 shadow-2xl flex flex-col items-center relative overflow-hidden"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ times: [0, 0.5, 1], duration: 1.5, ease: "easeInOut" }}
          className="relative z-10"
        >
          <CheckCircle2 className="text-green-500 w-24 h-24 mb-4" />
        </motion.div>
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-2xl font-bold text-gray-800 mb-2 relative z-10"
        >
          DNS Verification Successful!
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-gray-600 text-center mb-4 relative z-10"
        >
          Your DNS records have been verified. You're all set to move forward!
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="h-1 bg-green-500 w-full rounded-full relative z-10"
        />
        {/* Animated background elements */}
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: [0, 1.5, 1], rotate: 360 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-200 rounded-full opacity-20"
        />
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: [0, 1.2, 0.8], rotate: -180 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.7 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-200 rounded-full opacity-20"
        />
        {/* Confetti effect */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 400 - 200,
              y: Math.random() * 400 - 200,
              scale: 0,
              rotate: Math.random() * 360
            }}
            animate={{
              y: [null, Math.random() * 200 + 100],
              scale: [0, 1, 0.5],
              rotate: Math.random() * 360 + 360
            }}
            transition={{ duration: 2, delay: Math.random() * 0.5, repeat: Infinity, repeatDelay: 3 }}
            className={`absolute w-3 h-3 rounded-full ${
              ['bg-yellow-400', 'bg-green-400', 'bg-pink-400', 'bg-blue-400'][Math.floor(Math.random() * 4)]
            }`}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}