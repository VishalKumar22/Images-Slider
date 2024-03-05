import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./style.css";

// Functional component for ImageSlider
export default function ImageSlider({ url, limit = 5, page = 1 }) {
  // State variables initialization
  const [images, setImages] = useState([]); // State to hold the fetched images
  const [currentSlide, setCurrentSlide] = useState(0); // State to track the index of the current slide
  const [errorMsg, setErrorMsg] = useState(null); // State to hold error message if any
  const [loading, setLoading] = useState(false); // State to track loading state

  // Function to fetch images from the provided URL
  const fetchImages = async (getUrl) => {
    try {
      setLoading(true); // Set loading state to true while fetching data
      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`); // Fetching data from URL
      const data = await response.json(); // Parsing response data to JSON

      if (data) {
        setImages(data); // Setting fetched images to state
        setLoading(false); // Setting loading state to false after data is fetched
      }
    } catch (error) {
      setErrorMsg(error.message); // Setting error message if an error occurs during data fetching
      setLoading(false); // Setting loading state to false
    }
  };

  // Function to handle click event for previous arrow button
  const handlePrevious = () => {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1); // Decrementing current slide index or setting to last slide if already at first slide
  };

  // Function to handle click event for next arrow button
  const handleNext = () => {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1); // Incrementing current slide index or setting to first slide if already at last slide
  };

  // Effect hook to fetch images when URL changes
  useEffect(() => {
    if (url !== " ") fetchImages(url); // Fetch images only if URL is provided
  }, [url]); // Dependency array containing 'url'

  console.log(images); // Logging images to console for debugging

  // Conditional rendering based on loading and error states
  if (loading) {
    return <div>Loading data! Please wait...</div>; // Render loading message if data is being fetched
  }

  if (errorMsg !== null) {
    return <div>Error occurred! {errorMsg}</div>; // Render error message if an error occurred during data fetching
  }

  // Render image slider
  return (
    <>
      <div className="title">Image Slider</div>
      <div className="container">
        {/* Previous arrow button */}
        <BsArrowLeftCircleFill
          onClick={handlePrevious}
          className="arrow arrow-left"
        />

        {/* Image slides */}
        {images && images.length
          ? images.map((imageItem, index) => (
              <img
                download_url
                key={imageItem.id}
                alt={imageItem.download_url}
                src={imageItem.download_url}
                className={
                  currentSlide === index
                    ? "current-image"
                    : "current-image hide-current-image"
                }
              />
            ))
          : null}

        {/* Next arrow button */}
        <BsArrowRightCircleFill
          onClick={handleNext}
          className="arrow arrow-right"
        />

        {/* Circle indicators for slides */}
        <span className="circle-indicator">
          {images && images.length
            ? images.map((_, index) => (
                <button
                  key={index}
                  className={
                    currentSlide === index
                      ? "current-indicator"
                      : "current-indicator inactive-indicator"
                  }
                  onClick={() => setCurrentSlide(index)}
                ></button>
              ))
            : null}
        </span>
      </div>
    </>
  );
}
