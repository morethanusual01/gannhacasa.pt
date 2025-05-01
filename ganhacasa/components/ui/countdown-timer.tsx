"use client";

import React, { useState, useEffect, useRef } from 'react';
import '@/styles/countdown.css';

interface CountdownTimerProps {
  endDate: string; // Expecting a valid ISO 8601 string (e.g., "2024-12-31T23:59:59Z")
  onComplete?: () => void;
  completionMessage?: React.ReactNode;
}

// Calculates time remaining.
const calculateTimeLeft = (targetDate: Date): { days: number; hours: number; minutes: number; seconds: number; total: number } => {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    total: difference,
  };
};

// Formats numbers with leading zeros.
const formatNumber = (num: number) => num.toString().padStart(2, '0');

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  endDate,
  onComplete,
  completionMessage = "Ended!",
}) => {
  // Initialize timeLeft as undefined to clearly indicate it hasn't been calculated yet
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number; total: number } | undefined>(undefined);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef(onComplete);
  const hasCompletedCallbackFired = useRef(false);

  // Update onComplete ref
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Main effect for all timer logic, runs only when endDate changes
  useEffect(() => {
    // Always clear previous interval when effect runs (due to endDate change)
    if (intervalRef.current) clearInterval(intervalRef.current);
    hasCompletedCallbackFired.current = false; // Reset completion flag

    const targetDate = new Date(endDate);

    if (isNaN(targetDate.getTime())) {
      console.error("CountdownTimer: Invalid endDate provided:", endDate);
      setTimeLeft(undefined); // Set to undefined on invalid date
      return; // Stop
    }

    // Perform the initial calculation *inside* the effect
    let initialTime = calculateTimeLeft(targetDate);
    setTimeLeft(initialTime); // Set initial state

    // Check initial completion state
    if (initialTime.total <= 0) {
         if (!hasCompletedCallbackFired.current && onCompleteRef.current) {
            onCompleteRef.current();
            hasCompletedCallbackFired.current = true;
        }
      return; // Don't start interval if already ended
    }

    // Set interval only if initial calculation shows time remaining
    intervalRef.current = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetDate);
      setTimeLeft(newTimeLeft); // Update state every second

      if (newTimeLeft.total <= 0) {
        if (intervalRef.current) clearInterval(intervalRef.current);
         if (!hasCompletedCallbackFired.current && onCompleteRef.current) {
            onCompleteRef.current();
            hasCompletedCallbackFired.current = true;
        }
      }
    }, 1000);

    // Cleanup interval on unmount or endDate change
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

  }, [endDate]); // Strictly depend on endDate

  // --- Rendering ---
  // Render nothing until the initial calculation is done (timeLeft is set)
  if (timeLeft === undefined) {
    return null;
  }

  // Render "Ended!" message if completed
  if (timeLeft.total <= 0) {
    return <span>{completionMessage}</span>;
  }

  // Render countdown
  return (
    <span className="font-bold font-mono inline-block countdown-glow">
      {formatNumber(timeLeft.days)}d {formatNumber(timeLeft.hours)}h {formatNumber(timeLeft.minutes)}m {formatNumber(timeLeft.seconds)}s
    </span>
  );
};

export default CountdownTimer; 