// https://loading.io/css/
import PropTypes from "prop-types";
console.log("loading spinner");
function LoadingSpinner({ message = "" }) {
  return (
    <div className="loading-spinner">
      {message && (
        <strong className="loading-spinner__message">{message}</strong>
      )}
      <div className="loading-spinner__animation lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

LoadingSpinner.propTypes = {
  message: PropTypes.string,
};

export default LoadingSpinner;
