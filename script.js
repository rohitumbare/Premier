
const PreloaderConfig = {
    totalVideos: 1,
    totalImages: 8,

    imageBasePath: 'Assets/Images/',
    videoBasePath: 'Assets/Videos/',

    imagePrefix: 'model-',
    videoPrefix: 'vid',

    imageFileExtension: '.jpg',
    videoFileExtension: '.mp4',

    mainPreloaderSelector: '.preloader',

    progressBarSelector: '.progress',
    progressBarStyle: 'width',

    progressTextSelector: '.progress-text span',

    videoList: [],
    imageList: [],

    videosLoaded: 0,
    imagesLoaded: 0,
};

function disableScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
    };
}

function enableScroll() {
    window.onscroll = function () { };
}

function updateProgressBar(element, style, progressValue) {
    const progressBar = document.querySelector(element);
    progressBar.style[style] = `${progressValue}%`;
}

function updatePercentageText(element, progressValue) {
    const progressText = document.querySelector(element);
    progressText.textContent = `${Math.round(progressValue)}%`;
}

function updatePreloader() {
    const totalAssets = PreloaderConfig.totalVideos + PreloaderConfig.totalImages;
    const loadedAssets = PreloaderConfig.videosLoaded + PreloaderConfig.imagesLoaded;
    const progress = (loadedAssets / totalAssets) * 100;

    updateProgressBar(PreloaderConfig.progressBarSelector, PreloaderConfig.progressBarStyle, progress);
    updatePercentageText(PreloaderConfig.progressTextSelector, progress);

    if (loadedAssets === totalAssets) {
        setTimeout(() => {
            animatePageEntry();
            const preloader = document.querySelector(PreloaderConfig.mainPreloaderSelector);
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                enableScroll();
            }, 500);
        }, 1000);
    }
}

function animatePageEntry() {
    gsap.from("main", {
        duration: 1,
        x: "-100%",
        ease: "power3.out"
    });
}

function generateVideoUrl(index) {
    if (!PreloaderConfig.videoBasePath.endsWith('/')) {
        console.warn(`Warning: videoBasePath should end with a '/'. Automatically adding it.`);
        PreloaderConfig.videoBasePath += '/';
    }

    if (!PreloaderConfig.videoFileExtension.startsWith('.')) {
        console.warn(`Warning: videoFileExtension should start with a '.'. Automatically adding it.`);
        PreloaderConfig.videoFileExtension = '.' + PreloaderConfig.videoFileExtension;
    }

    return `${PreloaderConfig.videoBasePath}${PreloaderConfig.videoPrefix}${index}${PreloaderConfig.videoFileExtension}`;
}

function generateImageUrl(index) {
    if (!PreloaderConfig.imageBasePath.endsWith('/')) {
        console.warn(`Warning: imageBasePath should end with a '/'. Automatically adding it.`);
        PreloaderConfig.imageBasePath += '/';
    }

    if (!PreloaderConfig.imageFileExtension.startsWith('.')) {
        console.warn(`Warning: imageFileExtension should start with a '.'. Automatically adding it.`);
        PreloaderConfig.imageFileExtension = '.' + PreloaderConfig.imageFileExtension;
    }

    return `${PreloaderConfig.imageBasePath}${PreloaderConfig.imagePrefix}${index}${PreloaderConfig.imageFileExtension}`;
}

function preloadVideos() {
    for (let i = 1; i <= PreloaderConfig.totalVideos; i++) {
        const videoUrl = generateVideoUrl(i);
        const video = document.createElement('video');
        video.src = videoUrl;
        video.preload = 'auto';
        PreloaderConfig.videoList.push(video);

        video.onloadeddata = () => {
            PreloaderConfig.videosLoaded++;
            updatePreloader();
            if (PreloaderConfig.videosLoaded === PreloaderConfig.totalVideos) {
                console.info("All videos loaded");
            }
        }
    }
}

function preloadImages() {
    for (let i = 1; i <= PreloaderConfig.totalImages; i++) {
        const imgUrl = generateImageUrl(i);
        const img = new Image();
        img.src = imgUrl;
        PreloaderConfig.imageList.push(img);

        img.onload = () => {
            PreloaderConfig.imagesLoaded++;
            updatePreloader();
            if (PreloaderConfig.imagesLoaded === PreloaderConfig.totalImages) {
                console.info("All images loaded");
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    disableScroll();
    preloadImages();
    preloadVideos();
});

function createCircularText() {
    const paraContent =
        "Follow me and be in touch  Interested in quality design? ";
    const para = document.querySelector("#circ-text");

    window.onload = () => {
        for (let i = 0; i < paraContent.length; i++) {
            const span = document.createElement("span");
            span.innerText = paraContent[i];
            para.appendChild(span);
            span.style.transformOrigin = `0 ${para.offsetWidth / 2}px`;
            span.style.rotate = `${(360 / paraContent.length) * i}deg`;
        }
    };
}
createCircularText();

(function disableRtCl() {
    const images = document.querySelectorAll("img");
    images.forEach((image) => {
        image.addEventListener("contextmenu", function (e) {
            e.preventDefault();
        });
    });
})();

gsap.from("#page2-top-left img", {
    y: 20,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: "#page2-top-left img",
        start: "-30% center",
        end: "top center",
        scrub: 2,
    },
});

gsap.from("#page2-top-right img", {
    y: 30,
    opacity: 0,
    duration: .5,
    scrollTrigger: {
        trigger: "#page2-top-right img",
        start: "top center",
    },
});

gsap.from("#page2-center-right img", {
    y: 20,
    opacity: 0,
    duration: .5,
    scrollTrigger: {
        trigger: "#page2-center-left-top",
        start: "10% center",
    },
});

gsap.from("#page2-bottom", {
    opacity: 0,
    duration: .7,
    scrollTrigger: {
        trigger: "#page2-bottom",
        start: "top center",
    },
});

const page3Heading = document.querySelector("#page3>h1");
page3HeadingContent = "UPDATES";
for (let i = 0; i < page3HeadingContent.length; i++) {
    const span = document.createElement("span");
    span.innerText = page3HeadingContent[i];
    page3Heading.appendChild(span);
}


gsap.from("#page3>h1 span", {
    y: 40,
    opacity: 0,
    duration: .2,
    stagger: 0.05,
    scrollTrigger: {
        trigger: "#page2-bottom",
        start: "center+=100px center",
        end: "bottom-=120px center",
        scrub: 1.3,
    },
})

gsap.from("#page4-left img", {
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: "#page3",
        start: "center+=250px center",
    },
});

gsap.from("#page4-right img", {
    opacity: 0,
    duration: 1,
    delay: .3,
    scrollTrigger: {
        trigger: "#page3",
        start: "center+=250px center",
    },
});

gsap.from("#page5-center img", {
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger: "#page5",
        start: "top center",
    },
});

gsap.from("#page5-right img", {
    opacity: 0,
    duration: 1,
    delay: .5,
    scrollTrigger: {
        trigger: "#page5",
        start: "top center",
    },
});