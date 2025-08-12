import React, { useEffect, useState } from 'react';

import { Text } from './texts/Text';

interface TimerProps {
  timestamp: number;
}

export const Timer: React.FC<TimerProps> = ({ timestamp }) => {
  const [timeString, setTimeString] = useState<string>('');

  const calculateTimeDifference = (timestamp: number) => {
    const now = Date.now();
    const diffInSeconds = Math.floor((timestamp - now) / 1000);

    if (diffInSeconds <= 0) return 'Time is up!';

    const parts: string[] = [];
    let remaining = diffInSeconds;

    // Calculate years
    const years = Math.floor(remaining / (365 * 24 * 60 * 60));
    if (years > 0) {
      parts.push(`${years}y`);
      remaining %= 365 * 24 * 60 * 60;
    }

    // Calculate months (approximate - assuming 30 days per month)
    const months = Math.floor(remaining / (30 * 24 * 60 * 60));
    if (months > 0 || years > 0) {
      parts.push(`${months}m`);
      remaining %= 30 * 24 * 60 * 60;
    }

    // Calculate weeks
    const weeks = Math.floor(remaining / (7 * 24 * 60 * 60));
    if (weeks > 0 || months > 0 || years > 0) {
      parts.push(`${weeks}w`);
      remaining %= 7 * 24 * 60 * 60;
    }

    // Calculate days
    const days = Math.floor(remaining / (24 * 60 * 60));
    if (days > 0 || weeks > 0 || months > 0 || years > 0) {
      parts.push(`${days}d`);
      remaining %= 24 * 60 * 60;
    }

    // Calculate hours
    const hours = Math.floor(remaining / (60 * 60));
    if (hours > 0 || days > 0 || weeks > 0 || months > 0 || years > 0) {
      parts.push(`${hours}h`);
      remaining %= 60 * 60;
    }

    // Calculate minutes
    const minutes = Math.floor(remaining / 60);
    if (
      minutes > 0 ||
      hours > 0 ||
      days > 0 ||
      weeks > 0 ||
      months > 0 ||
      years > 0
    ) {
      parts.push(`${minutes}m`);
      remaining %= 60;
    }

    // Remaining seconds
    if (
      remaining > 0 ||
      minutes > 0 ||
      hours > 0 ||
      days > 0 ||
      weeks > 0 ||
      months > 0 ||
      years > 0
    ) {
      parts.push(`${remaining}s`);
    }

    return parts.join(' ');
  };

  useEffect(() => {
    const updateTimer = () => {
      setTimeString(calculateTimeDifference(timestamp));
    };

    // Initial update
    updateTimer();

    // Update every second
    const interval = setInterval(updateTimer, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [timestamp]);

  return <Text>{timeString}</Text>;
};
