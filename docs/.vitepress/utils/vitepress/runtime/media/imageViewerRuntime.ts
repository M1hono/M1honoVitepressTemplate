import { nextTick } from "vue";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const findNearestHeading = (imgElement: HTMLElement): string => {
    let currentElement: Element | null = imgElement;
    while (currentElement && currentElement !== document.body) {
        let previousSibling: Element | null = currentElement.previousElementSibling;
        while (previousSibling) {
            if (/^H[1-6]$/i.test(previousSibling.tagName)) {
                return (previousSibling.textContent || "")
                    .replace(/\u200B/g, "")
                    .trim();
            }
            previousSibling = previousSibling.previousElementSibling;
        }
        currentElement = currentElement.parentElement;
    }

    return "";
};

export const bindFancybox = () => {
    nextTick(async () => {
        const { Fancybox } = await import("@fancyapps/ui");
        const imgs = document.querySelectorAll(".vp-doc img");
        imgs.forEach((img) => {
            const image = img as HTMLImageElement;
            if (!image.hasAttribute("data-fancybox")) {
                image.setAttribute("data-fancybox", "gallery");
            }
            if (
                !image.hasAttribute("alt") ||
                image.getAttribute("alt") === ""
            ) {
                const heading = findNearestHeading(image);
                image.setAttribute("alt", heading);
            }
            const altString = image.getAttribute("alt") || "";
            image.setAttribute("data-caption", altString);
        });

        Fancybox.bind('[data-fancybox="gallery"]', {
            Hash: false,
            caption: false,
            Thumbs: {
                type: "classic",
                showOnStart: false,
            },
            Images: {
                Panzoom: {
                    maxScale: 4,
                },
            },
            Carousel: {
                transition: "slide",
            },
            Toolbar: {
                display: {
                    left: ["infobar"],
                    middle: [
                        "zoomIn",
                        "zoomOut",
                        "toggle1to1",
                        "rotateCCW",
                        "rotateCW",
                        "flipX",
                        "flipY",
                    ],
                    right: ["slideshow", "thumbs", "close"],
                },
            },
        });
    });
};

export const destroyFancybox = async () => {
    const { Fancybox } = await import("@fancyapps/ui");
    Fancybox.destroy();
};
