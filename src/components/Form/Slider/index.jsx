import { useState } from "react";
import Slider from "@mui/base/Slider";

import styles from "./styles.module.sass";

export default function SliderField({ getSliderVal }) {
  const [val, setVal] = useState(0);

  function valuetext(value) {
    setVal(value);
    getSliderVal(value);
  }
  
  function SliderValueLabel({ children }) {
    return <span className="valueLabel">{children}</span>;
  }
  
  return (
    <>
      <Slider
        defaultValue={10}
        className={styles.slider}
        step={1}
        marks
        min={1}
        max={12}
        getAriaValueText={valuetext}
        slots={{ valueLabel: SliderValueLabel }}

      />
    </>
  );
}
