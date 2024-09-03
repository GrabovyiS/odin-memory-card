import MemoryCard from "../MemoryCard/MemoryCard";
import "./MemoryCardsGrid.css";

function MemoryCardsGrid({ cardsData, handleCardClick }) {
  return (
    <div className="cards-container">
      {cardsData.map((cardItem) => (
        <MemoryCard
          key={cardItem.id}
          id={cardItem.id}
          heading={cardItem.name}
          imageUrl={cardItem.imageUrl}
          onClick={handleCardClick}
        />
      ))}
    </div>
  );
}

export default MemoryCardsGrid;
