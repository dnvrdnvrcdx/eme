const avatar = document.getElementById("avatar");
const pixelLayer = document.getElementById("pixelLayer");

if (avatar && pixelLayer) {
  const mainPhoto = avatar.querySelector(".photo-main");
  const altPhoto = avatar.querySelector(".photo-alt");
  const columns = 10;
  const rows = 10;
  const totalTiles = columns * rows;

  let pinned = false;
  let hovering = false;
  let currentState = false;
  let animationTimer;

  // Build 100 tiles automatically: 10 columns × 10 rows.
  const tiles = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const tile = document.createElement("span");
      tile.className = "pixel-tile";
      const x = (col / (columns - 1)) * 100;
      const y = (row / (rows - 1)) * 100;
      tile.style.backgroundPosition = `${x}% ${y}%`;
      pixelLayer.appendChild(tile);
      tiles.push({ element: tile, index: row * columns + col });
    }
  }

  // Give every tile its own randomized position in the dissolve sequence.
  const dissolveOrder = Array.from({ length: totalTiles }, (_, i) => i);
  for (let i = dissolveOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [dissolveOrder[i], dissolveOrder[j]] = [dissolveOrder[j], dissolveOrder[i]];
  }

  const delays = new Array(totalTiles);
  dissolveOrder.forEach((tileIndex, order) => {
    delays[tileIndex] = order * 16;
  });
  tiles.forEach(({ element, index }) => {
    element.style.setProperty("--delay", `${delays[index]}ms`);
  });

  function dissolve(showAlt) {
    const sourcePhoto = showAlt ? mainPhoto : altPhoto;
    const source = sourcePhoto.getAttribute("src");

    // Cancel the previous cleanup so rapid pointer movement stays responsive.
    window.clearTimeout(animationTimer);

    // Each tile shows the matching piece of the photo being replaced.
    tiles.forEach(({ element }) => {
      element.style.backgroundImage = `url("${source}")`;
    });

    // The destination image sits underneath the dissolving tiles.
    avatar.classList.toggle("is-swapped", showAlt);
    avatar.setAttribute("aria-pressed", String(pinned));
    currentState = showAlt;

    pixelLayer.classList.remove("is-dissolving");
    void pixelLayer.offsetWidth; // Force a reflow so the animation can restart.
    pixelLayer.classList.add("is-dissolving");

    // Remove the animation class after the last tile finishes.
    animationTimer = window.setTimeout(() => {
      pixelLayer.classList.remove("is-dissolving");
    }, (totalTiles - 1) * 16 + 300);
  }

  avatar.addEventListener("mouseenter", () => {
    hovering = true;
    if (!pinned && !currentState) dissolve(true);
  });

  avatar.addEventListener("mouseleave", () => {
    hovering = false;
    if (!pinned && currentState) dissolve(false);
  });

  avatar.addEventListener("click", () => {
    pinned = !pinned;
    dissolve(pinned || hovering);
  });

  avatar.addEventListener("focus", () => {
    if (!pinned && !currentState) dissolve(true);
  });

  avatar.addEventListener("blur", () => {
    if (!pinned && !hovering && currentState) dissolve(false);
  });
}
