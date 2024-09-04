const smoothScroll = (container: HTMLElement, targetOffset: number) => {
    const start = container.scrollTop;
    const change = targetOffset - start;
    const duration = 600; // duration of the scroll in milliseconds
    const startTime = performance.now();

    const easeInOutQuad = (time: number, begin: number, change: number, duration: number) => {
        let t = time / (duration / 2);
        if (t < 1) return (change / 2) * t * t + begin;
        t -= 1;
        return (-change / 2) * (t * (t - 2) - 1) + begin;
    };

    const animateScroll = () => {
        const currentTime = performance.now();
        const time = Math.min(1, (currentTime - startTime) / duration);
        const easedTime = easeInOutQuad(time, 0, 1, 1);
        const scrollPosition = start + change * easedTime;
        container.scrollTo({ top: scrollPosition });

        if (time < 1) {
            requestAnimationFrame(animateScroll);
        }
    };

    animateScroll();
};

export default smoothScroll;
