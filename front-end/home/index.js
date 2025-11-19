
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".h1-cards");
  const speed = 100;

  counters.forEach(counter => {
    const spanPrefix = counter.querySelector("span.marrom"); // pega o span
    const originalText = counter.innerHTML;
    const finalValue = parseInt(originalText.replace(/\D/g, "")); // só números
    const prefix = spanPrefix && originalText.indexOf(spanPrefix.outerHTML) === 0 ? spanPrefix.outerHTML : "";
    const suffix = spanPrefix && originalText.indexOf(spanPrefix.outerHTML) !== 0 ? spanPrefix.outerHTML : "";

    let currentValue = 0;

    const updateCounter = () => {
      currentValue += Math.ceil(finalValue / speed);
      if (currentValue >= finalValue) {
        counter.innerHTML = `${prefix}${finalValue}${suffix}`;
      } else {
        counter.innerHTML = `${prefix}${currentValue}${suffix}`;
        requestAnimationFrame(updateCounter);
      }
    };

    updateCounter();
  });
});
