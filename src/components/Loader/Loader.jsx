import "./Loader.css";

function Loader({ text }) {
  return (
    <div className="loader">
      <div className="loader-spinner"></div>
      <p>{text}</p>
    </div>
  );
}

export default Loader;
