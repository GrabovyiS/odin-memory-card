import "./MemoryCard.css";

function MemoryCard({ id, heading, disabled, imageUrl, onClick }) {
  return (
    <button
      id={id}
      disabled={disabled}
      onClick={onClick}
      className="memory-card"
    >
      <img src={imageUrl} alt="" />
      <h3>{heading}</h3>
    </button>
  );
}

export default MemoryCard;
