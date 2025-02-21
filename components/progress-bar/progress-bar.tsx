"use client";

import * as React from "react";
import { Progress } from "@/components/ui/progress";

export function ProgressDemo({ durationInSeconds }:any) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + durationInSeconds * 1000;

    const updateProgress = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const percentage = Math.min((elapsed / (endTime - startTime)) * 100, 100);
      setProgress(percentage);

      if (percentage < 100) {
        requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();

    return () => {};
  }, [durationInSeconds]);

  return <Progress value={progress} className="w-[60%]" />;
}
