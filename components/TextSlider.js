import cx from 'clsx';
import { useState } from 'react';
import { useInterval } from 'react-use';

import styles from '@/styles/TextSlider.module.css';

export const TextSlider = ({ slides, delay = 2000 }) => {
  const [currentSlide, setSlide] = useState(0);

  const totalSlides = slides.length;

  useInterval(() => {
    if (totalSlides - 1 === currentSlide) {
      setSlide(0);
    } else {
      setSlide(currentSlide + 1);
    }
  }, delay);

  return (
    <>
      {slides.map((text, index) => {
        return (
          <span key={text} className={styles.textSlider}>
            <span
              className={cx(styles.textSpan, {
                [styles.opacity0]: currentSlide === index,
                [styles.opacity100]: currentSlide !== index
              })}
              aria-hidden={true}
            >
              {text}
            </span>

            <span
              className={cx(styles.gradientSpan, {
                [styles.fromGreenToBlue]: index === 0,
                [styles.fromPurpleViaPinkToRed]: index === 1,
                [styles.fromYellowViaPinkToRed]: index === 2
              })}
            >
              {text}
            </span>
          </span>
        );
      })}
    </>
  );
};
