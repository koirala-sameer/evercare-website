import React from "react";
import { motion, useMotionValue, animate } from "framer-motion";

const useCountUp = (to: number, duration = 2) => {
  const count = useMotionValue(0);
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const controls = animate(count, to, { duration });
    const unsub = count.on("change", v => setValue(v));
    return () => { controls.stop(); unsub(); };
  }, [to, duration]);

  return Math.round(value);
};

const ImpactCounters: React.FC = () => {
  const fam = useCountUp(45000, 2.4);
  const market = useCountUp(11, 2.8);
  return (
    <div className="grid grid-cols-2 gap-8 text-left max-w-3xl mx-auto">
      <div>
        <div className="text-5xl font-semibold">{fam.toLocaleString()}</div>
        <div className="text-white/80 mt-2">Families by 2030</div>
      </div>
      <div>
        <div className="text-5xl font-semibold">${market}B</div>
        <div className="text-white/80 mt-2">Remittance Market</div>
      </div>
    </div>
  );
};

export default ImpactCounters;
