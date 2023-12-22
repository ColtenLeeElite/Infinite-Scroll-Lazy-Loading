import { useEffect, useRef } from 'react';

export default function Card({
  creditUrl,
  imgAlt = 'placeholder',
  imgSrc = '/placeholder.jpg',
  shotBy,
  newLimit,
  isLast,
}) {
  /**
   * Select the Card component with useRef
   */
  const cardRef = useRef();

  /**
   * Implement Intersection Observer to check if the last Card in the array is visible on the screen, then set a new limit
   */
  useEffect(() => {
    if (!cardRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        newLimit();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(cardRef.current);
  }, [isLast]);

  return (
    <div className="shadow-lg rounded-xl p-2 w-full bg-white" ref={cardRef}>
      <a href={creditUrl} target="_blank">
        <div className="w-full h-96 relative overflow-hidden rounded-xl">
          <img
            src={imgSrc}
            alt={imgAlt}
            className={`w-full h-full object-cover`}
          />
        </div>
        <div className="rounded-b-xl p-4">
          Credit:<span className="font-semibold"> {shotBy}</span>
        </div>
      </a>
    </div>
  );
}
