import MemoryCard from "../MemoryCard/MemoryCard";
import "./MemoryCardsGrid.css";

function MemoryCardsGrid({ cardsData, handleCardClick, gameOver }) {
  return (
    <div className="cards-container">
      {cardsData.map((cardItem, index) => (
        <MemoryCard
          // Using index as key (therefore re-rendering every card when cardsData is reordered)
          // somehow fixed the page jumping around when the cardsData was shuffled (restart, click on card)
          key={index}
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
