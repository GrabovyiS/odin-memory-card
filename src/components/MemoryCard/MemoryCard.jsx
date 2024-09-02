import "./MemoryCard.css";

function MemoryCard({ id, heading, imageUrl, onClick }) {
  return (
    <button onClick={onClick} id={id} className="memory-card">
      <img src={imageUrl} alt="" />
      <h3>{heading}</h3>
    </button>
  );
}

export default MemoryCard;
