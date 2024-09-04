import { useEffect } from "react";
import "./Overlay.css";

function adjustOverlayPosition() {
  const overlay = document.querySelector(".overlay");
  const overlayContent = document.querySelector(".overlay .overlay-content");
  const anchor = document.querySelector(".memory-cards-grid header");

  const anchorRect = anchor.getBoundingClientRect();

  if (anchorRect.bottom < 0) {
    overlay.style.transform = "none";
    overlayContent.style.transform = "none";
  } else {
    overlay.style.transform = `translateY(${anchorRect.bottom}px)`;
    overlayContent.style.transform = `translateY(-${anchorRect.bottom}px)`;
  }
}

function Overlay({ text, buttons, animation }) {
  useEffect(() => {
    console.log("adding event listener");
    if (!animation) {
      adjustOverlayPosition();
      window.addEventListener("scroll", adjustOverlayPosition);
    }
    return () => {
      if (!animation) {
        window.removeEventListener("scroll", adjustOverlayPosition);
      }
    };
  }, []);

  return (
    <div className={"overlay " + animation}>
      <div className="overlay-content">
        <p>{text}</p>
        <div className="overlay-buttons">
          {buttons.map((button) => {
            return (
              <button key={button.text} onClick={button.onClick}>
                {button.text}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Overlay;
