import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import TransactionStatus from "../components/TransactionStatus";
/* ----------------------  YOUR SAME PAGE DATA LOGIC  ---------------------- */
function buildPageData(themeKey, base) {
  const common = {
    dinoGameA11yAriaLabel: "",
    dinoGameA11yGameOver: "Game over, your score is $1.",
    dinoGameA11yHighScore: "Your highest score is $1.",
    dinoGameA11yJump: "Jump!",
    dinoGameA11ySpeedToggle: "Start slower",
    dinoGameA11yStartGame: "Game started.",
    errorCode: "",
    fontfamily: "'Segoe UI', Tahoma, sans-serif",
    fontsize: "75%",
    heading: {
      hostName: "dino",
      msg: "Press space to play",
    },
    iconClass: "icon-offline",
    language: "en",
    textdirection: "ltr",
    title: "chrome://dino/",
  };

  const olympicCommonSprites = {
    altGameCommonImage1x:
      base +
      "/images/default_100_percent/offline/100-olympic-firemedal-sprite.png",
    altGameCommonImage2x:
      base +
      "/images/default_200_percent/offline/200-olympic-firemedal-sprite.png",
  };

  switch (themeKey) {
    case "gymnastics":
      return {
        ...common,
        ...olympicCommonSprites,
        altGameSpecificImage1x:
          base +
          "/images/default_100_percent/offline/100-olympics-gymnastics-sprite.png",
        altGameSpecificImage2x:
          base +
          "/images/default_200_percent/offline/200-olympics-gymnastics-sprite.png",
        altGameType: "2",
        enableAltGameMode: true,
      };

    case "surfing":
      return {
        ...common,
        ...olympicCommonSprites,
        altGameSpecificImage1x:
          base +
          "/images/default_100_percent/offline/100-olympics-surfing-sprite.png",
        altGameSpecificImage2x:
          base +
          "/images/default_200_percent/offline/200-olympics-surfing-sprite.png",
        altGameType: "3",
        enableAltGameMode: true,
      };

    case "swimming":
      return {
        ...common,
        ...olympicCommonSprites,
        altGameSpecificImage1x:
          base +
          "/images/default_100_percent/offline/100-olympics-swimming-sprite.png",
        altGameSpecificImage2x:
          base +
          "/images/default_200_percent/offline/200-olympics-swimming-sprite.png",
        altGameType: "4",
        enableAltGameMode: true,
      };

    case "equestrian":
      return {
        ...common,
        ...olympicCommonSprites,
        altGameSpecificImage1x:
          base +
          "/images/default_100_percent/offline/100-olympics-equestrian-sprite.png",
        altGameSpecificImage2x:
          base +
          "/images/default_200_percent/offline/200-olympics-equestrian-sprite.png",
        altGameType: "5",
        enableAltGameMode: true,
      };

    case "dinosaur":
      return { ...common };

    case "hurdling":
    default:
      return {
        ...common,
        ...olympicCommonSprites,
        altGameSpecificImage1x:
          base +
          "/images/default_100_percent/offline/100-olympics-hurdling-sprite.png",
        altGameSpecificImage2x:
          base +
          "/images/default_200_percent/offline/200-olympics-hurdling-sprite.png",
        altGameType: "1",
        enableAltGameMode: true,
      };
  }
}
/* ----------------------  LOAD DINO CORE (UNCHANGED) ---------------------- */
function loadDinoCoreOnce(base = "") {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.__dinoCorePromise) return window.__dinoCorePromise;

  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.body.appendChild(script);
    });

  window.__dinoCorePromise = (async () => {
    await loadScript(base + "/scripts/load_time_data.js");
    await loadScript(base + "/scripts/offline.js");
    if (window.Runner && !window.Runner.__patchedNoAudio) {
      window.Runner.__patchedNoAudio = true;
      window.Runner.prototype.loadSounds = function () {};
    }
    await loadScript(base + "/scripts/offline-sprite-definitions.js");
    await loadScript(base + "/scripts/neterror.slim.js");
  })();

  return window.__dinoCorePromise;
}
/* ----------------------  FIX #1: WAIT FOR CANVAS  ---------------------- */
const waitForCanvas = () =>
  new Promise((resolve) => {
    const check = () => {
      const canvas = document.querySelector(".runner-canvas");
      if (canvas) resolve();
      else requestAnimationFrame(check);
    };
    check();
  });
const waitForOfflineResources = () => {
  return new Promise((resolve) => {
    const check = () => {
      const div = document.getElementById("offline-resources");
      if (div) resolve();
      else requestAnimationFrame(check);
    };
    check();
  });
};

/* ----------------------  FIX #2: WAIT FOR IMAGES ---------------------- */
const waitForSpriteImages = async () =>
  new Promise((resolve) => setTimeout(resolve, 120)); // most stable

/* ========================================================================
   MAIN COMPONENT — FULLY FIXED VERSION
========================================================================= */
function Gamepage() {
  const { themeParam } = useParams() || {};
  const [showGameOverPopup, setShowGameOverPopup] = useState(false);
  const [theme, setTheme] = useState("hurdling");
  const [isLoading, setIsLoading] = useState(true);
  const runnerRef = useRef(null);
  const base = ""; // unchanged
  // const [showGameOverPopup, setShowGameOverPopup] = useState(false);

  useEffect(() => {
    const handler = () => {
      console.log("Dino game over detected");
      setShowGameOverPopup(true);
    };

    window.addEventListener("dino-game-over", handler);

    return () => window.removeEventListener("dino-game-over", handler);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Destroy old runner instance
    const inst = window.Runner?.instance_;
    if (inst) {
      try {
        inst.stop();
      } catch {}
      try {
        inst.stopListening();
      } catch {}

      const outer = inst.outerContainerEl;
      [
        inst.containerEl,
        inst.slowSpeedCheckboxLabel,
        inst.touchController,
      ].forEach((el) => {
        if (el && outer?.contains(el)) outer.removeChild(el);
      });

      window.Runner.instance_ = null;
    }

    // 2. Start new runner instance after small delay
    setTimeout(() => {
      const wrapper = document.querySelector(".interstitial-wrapper");
      if (wrapper && window.Runner) {
        window.Runner.instance_ = new window.Runner(".interstitial-wrapper");
      }
    }, 0);
  }, [themeParam]); // 👈 reload only when URL param changes

  console.log("Theme Param:", themeParam);

  /* Sync theme from URL param */
  useEffect(() => {
    const validThemes = [
      "hurdling",
      "gymnastics",
      "surfing",
      "swimming",
      "equestrian",
      "dinosaur",
    ];

    if (validThemes.includes(themeParam)) {
      setTheme(themeParam);
    }
  }, [themeParam]);

  /* ----------------------  LOAD CSS ONCE (UNCHANGED) ---------------------- */
  useEffect(() => {
    let mounted = true;
    const links = [];

    const loadCSS = (href) =>
      new Promise((resolve) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        link.onload = resolve;
        document.head.appendChild(link);
        links.push(link);
      });

    (async () => {
      await Promise.all([
        loadCSS("/styles/interstitial_core.css"),
        loadCSS("/styles/interstitial_common.css"),
        loadCSS("/styles/neterror.css"),
      ]);
      if (mounted) setIsLoading(false);
    })();

    return () => {
      mounted = false;
      links.forEach((l) => l.remove());
    };
  }, []);

  /* ----------------------  RESOURCE INJECTOR (UNCHANGED) ---------------------- */
  const ensureResourceImages = (pageData) => {
    if (typeof document === "undefined") return;

    const ensureImg = (id, src) => {
      let el = document.getElementById(id);
      if (!el) {
        el = document.createElement("img");
        el.id = id;
        el.alt = "";
        document.getElementById("offline-resources")?.appendChild(el);
      }
      if (src) el.src = src;
    };

    ensureImg(
      "offline-resources-1x",
      base + "/images/default_100_percent/offline/100-offline-sprite.png"
    );
    ensureImg(
      "offline-resources-2x",
      base + "/images/default_200_percent/offline/200-offline-sprite.png"
    );

    ensureImg("altGameCommonImage1x", pageData.altGameCommonImage1x);
    ensureImg("altGameCommonImage2x", pageData.altGameCommonImage2x);
    ensureImg("altGameSpecificImage1x", pageData.altGameSpecificImage1x);
    ensureImg("altGameSpecificImage2x", pageData.altGameSpecificImage2x);
  };

  /* ----------------------  FIXED RUNNER INITIALIZATION  ---------------------- */
  useEffect(() => {
    if (typeof window === "undefined") return;

    let cancelled = false;

    (async () => {
      try {
        // 1. Load scripts
        await loadDinoCoreOnce(base);
        if (cancelled) return;

        // 2. Ensure <div id="offline-resources"> exists
        await waitForOfflineResources();

        // 3. Build updated page data
        const pageData = buildPageData(theme, base);

        // 4. Inject loadTimeData
        window.loadTimeData.data_ = {
          ...(window.loadTimeData.data_ || {}),
          ...pageData,
        };

        // 5. Ensure images exist in DOM
        ensureResourceImages(pageData);

        // 6. Destroy old runner instance
        const old = window.Runner?.instance_;
        if (old) {
          old.stop?.();
          old.stopListening?.();
          window.Runner.instance_ = null;
        }

        // 7. Wait for canvas
        await waitForCanvas();

        // 8. Wait for images to load
        await waitForSpriteImages();

        // 9. Create new runner safely
        if (!cancelled) {
          runnerRef.current = new window.Runner(".interstitial-wrapper");
        }
      } catch (err) {
        console.error("Runner setup error:", err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [theme]);

  if (isLoading) return <Loader />;

  return (
    <>
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 z-50 
               ]px-4 py-2 select-none"
      >
        Tap on screen to jump
      </div>

      <div id="t" className="neterror offline" style={{ fontSize: "75%" }}>
        <div id="main-frame-error" className="interstitial-wrapper">
          <div id="main-content">
            <div
              className="icon icon-offline"
              style={{ visibility: "hidden" }}
            />
            <h1>
              <span id="heading.msg">Press space/up to play</span>
            </h1>
          </div>

          <div role="application" tabIndex={0} className="runner-container">
            <canvas
              className="runner-canvas"
              width="552"
              height="150"
              style={{ width: "552px", height: "150px" }}
            />
          </div>
        </div>

        <div id="offline-resources">
          <template id="audio-resources">{/*  */}</template>
        </div>
      </div>

      {showGameOverPopup && (
        <TransactionStatus
          open={showGameOverPopup}
          status="failed"
          title="Game Over!"
          description="Your dinosaur crashed! If you want to play again, please complete the transaction."
          onClose={() => setShowGameOverPopup(false)}
          // onAction={() => navigate("/payment")}  // optional
        />
      )}
    </>
  );
}

export default Gamepage;
