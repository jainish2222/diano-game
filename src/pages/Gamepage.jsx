import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

// import "./styles/interstitial_core.css";
// import "./styles/interstitial_common.css";
// import "./styles/neterror.css";
// -------- Helper: build pageData for a given theme --------
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
      return {
        ...common,
      };

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
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.body.appendChild(script);
    });

  window.__dinoCorePromise = (async () => {
    await loadScript(base + "/scripts/load_time_data.js");
    await loadScript(base + "/scripts/offline.js");

    // disable audio to avoid issues
    if (window.Runner && !window.Runner.__patchedNoAudio) {
      window.Runner.__patchedNoAudio = true;
      window.Runner.prototype.loadSounds = function () {
        // no-op
      };
    }

    await loadScript(base + "/scripts/offline-sprite-definitions.js");
    await loadScript(base + "/scripts/neterror.slim.js");
  })();

  return window.__dinoCorePromise;
}
const waitForSpriteImages = async () => {
  const required = [
    "offline-resources-1x",
    "offline-resources-2x",
    "altGameCommonImage1x",
    "altGameCommonImage2x",
    "altGameSpecificImage1x",
    "altGameSpecificImage2x"
  ];

  // Wait until all elements exist
  await new Promise((resolve) => {
    const check = () => {
      const ok = required.every(id => document.getElementById(id));
      if (ok) resolve();
      else requestAnimationFrame(check);
    };
    check();
  });

  // Now wait until images are loaded
  await Promise.all(
    required.map(id => {
      const img = document.getElementById(id);
      if (!img) return Promise.resolve(); // ignore optional ones
      if (img.complete) return Promise.resolve();
      return new Promise(res => img.onload = res);
    })
  );
};

function App() {
  const [theme, setTheme] = useState("hurdling");
  const [isLoading, setIsLoading] = useState(true);
  const { themeParam } = useParams() || {};
  const runnerRef = useRef(null);
  const base = ""; // base left empty, public/ is root

  useEffect(() => {
    if (!themeParam) return;
    const validThemes = [
      "hurdling",
      "gymnastics",
      "surfing",
      "swimming",
      "equestrian",
      "dinosaur",
    ];
    if (validThemes.includes(themeParam)) setTheme(themeParam);
  }, [themeParam]);

  // Load CSS only once and from /styles in public
  // useEffect(() => {
  //   let mounted = true;
  //   if (typeof window === "undefined") return;

  //   const loadCSS = (href) =>
  //     new Promise((resolve, reject) => {
  //       // avoid duplicate links
  //       const existing = document.querySelector(`link[href="${href}"]`);
  //       if (existing) return resolve(existing);

  //       const link = document.createElement("link");
  //       link.rel = "stylesheet";
  //       link.href = href;
  //       link.onload = () => resolve(link);
  //       link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`));
  //       document.head.appendChild(link);
  //     });

  //   async function loadAllCSS() {
  //     try {
  //       if (!window.__cssLoaded) {
  //         await Promise.all([
  //           loadCSS("/styles/interstitial_core.css"),
  //           loadCSS("/styles/interstitial_common.css"),
  //           loadCSS("/styles/neterror.css"),
  //         ]);
  //         window.__cssLoaded = true;
  //       }
  //     } catch (err) {
  //       console.error("CSS load error:", err);
  //     } finally {
  //       if (mounted) setIsLoading(false);
  //     }
  //   }

  //   loadAllCSS();

  //   return () => {
  //     mounted = false;
  //   };
  // }, []);
  // sol-2

  useEffect(() => {
  let mounted = true;
  const links = [];
  const loadCSS = (href) =>
    new Promise((resolve, reject) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;

      link.onload = () => resolve(link);
      link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`));

      document.head.appendChild(link);
      links.push(link);
    });

  async function loadAllCSS() {
    try {
      await Promise.all([
        loadCSS("/styles/interstitial_core.css"),
        loadCSS("/styles/interstitial_common.css"),
        loadCSS("/styles/neterror.css"),
      ]);
    } catch (err) {
      console.error("CSS load error:", err);
    } finally {
      if (mounted) setIsLoading(false);
    }
  }

  loadAllCSS();

  return () => {
    mounted = false;

    // remove all injected CSS when leaving
    links.forEach((link) => {
      if (link && link.parentNode) {
        link.parentNode.removeChild(link);
      }
    });
  // window.location.reload();

  };
}, []);

  // Small helper to inject the required image elements for Runner
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

    // always ensure the base offline sprites
    ensureImg(
      "offline-resources-1x",
      base + "/images/default_100_percent/offline/100-offline-sprite.png"
    );
    ensureImg(
      "offline-resources-2x",
      base + "/images/default_200_percent/offline/200-offline-sprite.png"
    );

    // Olympic/alt game images - only set src if provided
    ensureImg("altGameCommonImage1x", pageData.altGameCommonImage1x);
    ensureImg("altGameCommonImage2x", pageData.altGameCommonImage2x);
    ensureImg("altGameSpecificImage1x", pageData.altGameSpecificImage1x);
    ensureImg("altGameSpecificImage2x", pageData.altGameSpecificImage2x);
  };

  // load dino core and (re)start Runner whenever theme changes
useEffect(() => {
  if (typeof window === "undefined") return;

  let cancelled = false;

  (async () => {
    try {
      // Load core scripts once
      await loadDinoCoreOnce(base);

      if (cancelled) return;
      if (!window.loadTimeData || !window.Runner) return;

      // Build page data
      const newPageData = buildPageData(theme, base);
      const altKeys = [
        "enableAltGameMode",
        "altGameType",
        "altGameCommonImage1x",
        "altGameCommonImage2x",
        "altGameSpecificImage1x",
        "altGameSpecificImage2x",
      ];

      const wantsAltGame = Boolean(newPageData.enableAltGameMode);
      const sanitizedPageData = { ...newPageData };
      if (!wantsAltGame) altKeys.forEach((k) => delete sanitizedPageData[k]);

      const ld = window.loadTimeData;
      ld.data_ = { ...(ld.data_ || {}), ...sanitizedPageData };

      ensureResourceImages(newPageData);

      // ---- TEARDOWN OLD INSTANCE ----
      const teardown = () => {
        const inst = window.Runner?.instance_;
        if (!inst) return;

        try { inst.stop?.(); } catch {}
        try { inst.stopListening?.(); } catch {}

        const outer = inst.outerContainerEl;
        [inst.containerEl, inst.slowSpeedCheckboxLabel, inst.touchController].forEach(
          (n) => n && outer?.contains(n) && outer.removeChild(n)
        );

        window.Runner.instance_ = null;
      };
      teardown();

      // ---- WAIT UNTIL DOM IS READY ----
      // Wait for #offline-resources
      await new Promise((resolve) => {
        const check = () => {
          if (document.getElementById("offline-resources")) resolve();
          else requestAnimationFrame(check);
        };
        check();
      });

      // Wait 2 frames for .interstitial-wrapper & canvas to exist
      await new Promise((r) => requestAnimationFrame(r));
      await new Promise((r) => requestAnimationFrame(r));

      const wrapper = document.querySelector(".interstitial-wrapper");
      if (!wrapper) {
        console.error("Wrapper missing. Cannot start Runner.");
        return;
      }

      // ---- SAFE START NEW RUNNER ----await waitForSpriteImages();   // ⬅️ IMPORTANT FIX

      await waitForSpriteImages();   // ⬅️ IMPORTANT FIX
     const newInstance = new window.Runner(".interstitial-wrapper");
      runnerRef.current = newInstance;

    } catch (err) {
      console.error("Runner setup error:", err);
    }
  })();

  return () => {
    cancelled = true;
  };
}, [theme, base]);


  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  // Small touch: update message on touch devices
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouchEnabled = () =>
      "ontouchstart" in window || (navigator && navigator.maxTouchPoints > 0);
    if (isTouchEnabled()) {
      const box = document.getElementById("heading.msg");
      if (box) box.innerHTML = "Touch the dino to play";
    }
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div id="t" className="neterror offline" style={{ fontSize: "75%" }}>
      <div id="main-frame-error" className="interstitial-wrapper">
        <div id="main-content">
          <div className="icon icon-offline" style={{ visibility: "hidden" }} />
          <div id="main-message">
            <h1>
              <span id="heading.msg">Press space/up to play</span>
            </h1>
            <h2>
              Change theme:{" "}
              <select id="themeDino" onChange={handleThemeChange} value={theme}>
                <option value="hurdling">Olympic hurdling</option>
                <option value="gymnastics">Olympic gymnastics</option>
                <option value="surfing">Olympic surfing</option>
                <option value="swimming">Olympic swimming</option>
                <option value="equestrian">Olympic equestrian</option>
                <option value="default">Original</option>
              </select>
              <br />
              (No page refresh needed)
            </h2>
          </div>
        </div>

        <div role="application" tabIndex={0} className="runner-container">
          <canvas
            className="runner-canvas"
            width="552"
            height="150"
            style={{ width: "552px", height: "150px" }}
          />
          <span className="offline-runner-live-region" aria-live="assertive">
            Dino game. A pixelated dinosaur dodges cacti and pterodactyls as it
            runs across a desolate landscape. When you hear an audio cue, press
            space to jump over obstacles.
          </span>
        </div>
      </div>

      <div id="sub-frame-error">
        <div className="icon" />
        <div
          id="sub-frame-error-details"
          jsselect="summary"
          jsvalues=".innerHTML:msg"
          style={{ display: "none" }}
        />
      </div>

      <div id="offline-resources">
        {/* Offline resources are dynamically ensured by JS (see ensureResourceImages) */}
        <template id="audio-resources">
          {/* Keep your base64 audio placeholders if you need them, or leave empty to disable audio */}
          <audio id="offline-sound-press" />
          <audio id="offline-sound-hit" />
          <audio id="offline-sound-reached" />
        </template>
      </div>
    </div>
  );
}

export default App;
