import { useEffect, useRef } from "react";

export function useScrollReveal<T extends HTMLElement>() {
    const ref = useRef<T>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
        );

        const observe = () => {
            const targets = el.querySelectorAll(".reveal:not(.visible)");
            targets.forEach((target) => observer.observe(target));
        };

        observe();

        // Re-observe when children change (e.g. after async data loads)
        const mutation = new MutationObserver(observe);
        mutation.observe(el, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            mutation.disconnect();
        };
    }, []);

    return ref;
}
