import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "./components/ui/card";

const messages = [
  "七転び八起き",
  "一期一会",
  "花鳥風月",
  "初心忘るべからず",
  "雨降って地固まる",
];

const animateClasses = {
  fadeIn: "animate-fade-in",
  fadeOut: "animate-fade-out",
} as const;
type AnimateClasses = (typeof animateClasses)[keyof typeof animateClasses];

function App() {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState<AnimateClasses>(
    animateClasses.fadeOut
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(animateClasses.fadeOut);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % messages.length);
        setAnimate(animateClasses.fadeIn);
      }, 200);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-16">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className={animate}>{messages[index]}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}

export default App;
