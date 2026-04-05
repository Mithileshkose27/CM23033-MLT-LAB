async function detect() {
  ctx.clearRect(0,0,640,480);

  const poses = await detector.estimatePoses(video);

  if (poses.length > 0) {
    const kp = poses[0].keypoints;
    drawPose(kp);

    // Right leg
    const hipR = kp[12];
    const kneeR = kp[14];
    const ankleR = kp[16];

    // Left leg
    const hipL = kp[11];
    const kneeL = kp[13];
    const ankleL = kp[15];

    if (
      hipR.score > 0.4 && kneeR.score > 0.4 && ankleR.score > 0.4 &&
      hipL.score > 0.4 && kneeL.score > 0.4 && ankleL.score > 0.4
    ) {
      const angleR = getAngle(hipR, kneeR, ankleR);
      const angleL = getAngle(hipL, kneeL, ankleL);

      const avgAngle = (angleR + angleL) / 2;

      // Debug display
      ctx.fillStyle = "yellow";
      ctx.fillText("Angle: " + avgAngle.toFixed(0), 20, 40);

      console.log("Angle:", avgAngle);

      // Standing detection (more flexible)
      if (avgAngle > 150) {
        statusText.innerText = "Standing detected ✅";

        if (!captured && !timerRunning) {
          captured = true;
          timerRunning = true;

          let timeLeft = 3;

          const countdown = setInterval(() => {
            statusText.innerText = "Capturing in " + timeLeft + "...";
            timeLeft--;

            if (timeLeft < 0) {
              clearInterval(countdown);
              statusText.innerText = "Captured!";
              takeScreenshot();
              timerRunning = false;
            }
          }, 1000);
        }
      }

      // Reset when bending
      if (avgAngle < 130) {
        captured = false;
        statusText.innerText = "Waiting for pose...";
      }
    }
  }

  requestAnimationFrame(detect);
}