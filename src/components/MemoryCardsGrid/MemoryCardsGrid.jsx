import MemoryCard from "../MemoryCard/MemoryCard";
import "./MemoryCardsGrid.css";

function MemoryCardsGrid({ cardsData, handleCardClick, gameOver }) {
  return (
    <div className="cards-container">
      {cardsData.map((cardItem) => (
        <MemoryCard
          key={cardItem.id}
          id={cardItem.id}
          disabled={gameOver}
          heading={cardItem.name}
          imageUrl={cardItem.imageUrl}
          onClick={handleCardClick}
        />
      ))}
    </div>
  );
}

export default MemoryCardsGrid;
