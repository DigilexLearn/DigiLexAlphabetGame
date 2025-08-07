import * as Speech from 'expo-speech';
import { useRef, useState } from 'react';
import { Alert, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';

const letters = [
{
  id: 1,
  name: 'a',
  tracePath: [
    { x: 120, y: 180 },  // 1. top of circle
    { x: 100, y: 160 },  // 2. upper left
    { x: 110, y: 130 },  // 3. bottom left
    { x: 130, y: 130 },  // 4. bottom right
    { x: 140, y: 155 },  // 5. upper right
    { x: 120, y: 180 },  // 6. back to top (complete circle)
    { x: 140, y: 190 },  // 7. stem top
    { x: 140, y: 130 }   // 8. stem bottom
  ]
}
,
  {
    id: 2,
    name: 'b',
    tracePath: [
      { x: 100, y: 80 },
      { x: 100, y: 220 },
      { x: 140, y: 160 },
      { x: 100, y: 180 }
    ]
  },
  {
  id: 3,
  name: 'c',
  tracePath: [
    { x: 150, y: 100 },
    { x: 120, y: 80 },
    { x: 90, y: 110 },
    { x: 80, y: 160 },
    { x: 110, y: 190 },
    { x: 140, y: 180 }
  ]
},

{
  id: 4,
  name: 'd',
  tracePath: [
    { x: 140, y: 80 },
    { x: 140, y: 220 },
    { x: 100, y: 160 },
    { x: 140, y: 180 },
    { x: 110, y: 140 },
    { x: 140, y: 120 }
  ]
},
{
  id: 5,
  name: 'e',
  tracePath: [
    { x: 110, y: 160 },  // 1. Start at center bar
    { x: 130, y: 160 },  // 2. Move right on bar
    { x: 140, y: 150 },  // 3. Upper right curve
    { x: 130, y: 130 },  // 4. Downward right side
    { x: 100, y: 130 },  // 5. Bottom left
    { x: 90, y: 150 },   // 6. Curve back up to left
    { x: 110, y: 160 }   // 7. Close loop back to start
  ]
},
{
  id: 6,
  name: 'f',
  tracePath: [
    { x: 120, y: 100 },  // 1. Start top
    { x: 100, y: 120 },  // 2. Curve left
    { x: 120, y: 170 },  // 3. Stem continues down
    { x: 120, y: 200 },  // 4. Stem bottom
    { x: 90, y: 140 },   // 5. Crossbar start
    { x: 150, y: 140 }   // 6. Crossbar end
  ]
}
,
{
  id: 7,
  name: 'g',
  tracePath: [
    { x: 120, y: 100 },
    { x: 90, y: 130 },
    { x: 100, y: 170 },
    { x: 130, y: 180 },
    { x: 150, y: 160 },
    { x: 130, y: 220 }
  ]
},
{
  id: 8,
  name: 'h',
  tracePath: [
    { x: 90, y: 80 },
    { x: 90, y: 220 },
    { x: 90, y: 150 },
    { x: 130, y: 150 },
    { x: 130, y: 220 },
    { x: 130, y: 150 }
  ]
},
{
  id: 9,
  name: 'i',
  tracePath: [
    { x: 110, y: 100 },
    { x: 110, y: 180 },
    { x: 110, y: 200 },
    { x: 110, y: 210 },
    { x: 110, y: 220 },
    { x: 110, y: 230 }
  ]
},
{
  id: 10,
  name: 'j',
  tracePath: [
    { x: 130, y: 100 },
    { x: 130, y: 180 },
    { x: 130, y: 200 },
    { x: 120, y: 220 },
    { x: 100, y: 210 },
    { x: 90, y: 190 }
  ]
},
{
  id: 11,
  name: 'k',
  tracePath: [
    { x: 100, y: 80 },
    { x: 100, y: 220 },
    { x: 100, y: 150 },
    { x: 140, y: 100 },
    { x: 100, y: 150 },
    { x: 140, y: 200 }
  ]
},
{
  id: 12,
  name: 'l',
  tracePath: [
    { x: 120, y: 80 },
    { x: 120, y: 220 },
    { x: 120, y: 220 },
    { x: 120, y: 220 },
    { x: 120, y: 220 },
    { x: 120, y: 220 }
  ]
},
{
  id: 13,
  name: 'm',
  tracePath: [
    { x: 80, y: 150 },
    { x: 80, y: 100 },
    { x: 100, y: 100 },
    { x: 100, y: 150 },
    { x: 120, y: 100 },
    { x: 120, y: 150 }
  ]
},
{
  id: 14,
  name: 'n',
  tracePath: [
    { x: 90, y: 150 },
    { x: 90, y: 100 },
    { x: 110, y: 100 },
    { x: 110, y: 150 }
  ]
},
{
  id: 15,
  name: 'o',
  tracePath: [
    { x: 100, y: 140 },
    { x: 90, y: 120 },
    { x: 100, y: 100 },
    { x: 130, y: 100 },
    { x: 140, y: 120 },
    { x: 130, y: 140 },
    { x: 100, y: 140 }
  ]
},
{
  id: 16,
  name: 'p',
  tracePath: [
    { x: 100, y: 100 },
    { x: 100, y: 220 },
    { x: 100, y: 100 },
    { x: 130, y: 100 },
    { x: 130, y: 130 },
    { x: 100, y: 130 }
  ]
},
{
  id: 17,
  name: 'q',
  tracePath: [
    { x: 110, y: 140 },
    { x: 100, y: 120 },
    { x: 110, y: 100 },
    { x: 140, y: 100 },
    { x: 150, y: 120 },
    { x: 140, y: 140 },
    { x: 110, y: 140 },
    { x: 130, y: 160 }
  ]
},
{
  id: 18,
  name: 'r',
  tracePath: [
    { x: 100, y: 150 },
    { x: 100, y: 100 },
    { x: 120, y: 100 }
  ]
},
{
  id: 19,
  name: 's',
  tracePath: [
    { x: 140, y: 110 },
    { x: 110, y: 100 },
    { x: 100, y: 120 },
    { x: 120, y: 140 },
    { x: 130, y: 160 },
    { x: 100, y: 180 }
  ]
},
{
  id: 20,
  name: 't',
  tracePath: [
    { x: 120, y: 80 },
    { x: 120, y: 180 },
    { x: 100, y: 100 },
    { x: 140, y: 100 }
  ]
},
{
  id: 21,
  name: 'u',
  tracePath: [
    { x: 90, y: 100 },
    { x: 90, y: 150 },
    { x: 110, y: 170 },
    { x: 130, y: 150 },
    { x: 130, y: 100 }
  ]
},
{
  id: 22,
  name: 'v',
  tracePath: [
    { x: 90, y: 100 },
    { x: 110, y: 170 },
    { x: 130, y: 100 }
  ]
},
{
  id: 23,
  name: 'w',
  tracePath: [
    { x: 80, y: 100 },
    { x: 95, y: 170 },
    { x: 110, y: 130 },
    { x: 125, y: 170 },
    { x: 140, y: 100 }
  ]
},
{
  id: 24,
  name: 'x',
  tracePath: [
    { x: 100, y: 100 },
    { x: 140, y: 160 },
    { x: 140, y: 100 },
    { x: 100, y: 160 }
  ]
},
{
  id: 25,
  name: 'y',
  tracePath: [
    { x: 100, y: 100 },
    { x: 120, y: 140 },
    { x: 140, y: 100 },
    { x: 120, y: 140 },
    { x: 120, y: 200 }
  ]
},
{
  id: 26,
  name: 'z',
  tracePath: [
    { x: 100, y: 100 },
    { x: 140, y: 100 },
    { x: 100, y: 160 },
    { x: 140, y: 160 }
  ]
}
  // Add more letters here up to z
];

export default function AlphabetGame() {
  const [currentLetter, setCurrentLetter] = useState(letters[0]);
  const [tracedPoints, setTracedPoints] = useState([]);
  const [stars, setStars] = useState(0);
  const tracingAreaRef = useRef(null);
  const [tracingAreaLayout, setTracingAreaLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const playSound = () => {
    Speech.speak(currentLetter.name.toUpperCase());
  };

  const handleTracingAreaLayout = () => {
    if (tracingAreaRef.current) {
      tracingAreaRef.current.measure((x, y, width, height, pageX, pageY) => {
        setTracingAreaLayout({ x: pageX, y: pageY, width, height });
      });
    }
  };

  const isTraceCorrect = (userTrace, referenceTrace, tolerance = 50) => {
    if (userTrace.length === 0) return false;
    let matchedPoints = 0;
    for (let refPoint of referenceTrace) {
      const closeEnough = userTrace.some(userPoint => {
        const dx = userPoint.x - refPoint.x;
        const dy = userPoint.y - refPoint.y;
        return Math.sqrt(dx * dx + dy * dy) <= tolerance;
      });
      if (closeEnough) matchedPoints++;
    }
    return matchedPoints >= referenceTrace.length * 0.8;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gesture) => {
      const x = gesture.moveX - tracingAreaLayout.x;
      const y = gesture.moveY - tracingAreaLayout.y;
      if (x >= 0 && x <= tracingAreaLayout.width && y >= 0 && y <= tracingAreaLayout.height) {
        setTracedPoints(prev => [...prev, { x, y }]);
      }
    },
    onPanResponderRelease: () => {
      if (isTraceCorrect(tracedPoints, currentLetter.tracePath)) {
        setStars(prev => {
          const newStars = prev + 1;
          Alert.alert('Well done!', `★ You earned star #${newStars}`);
          return newStars;
        });
      } else {
        Alert.alert('Try again', 'Trace the letter more closely.');
      }
      setTracedPoints([]);
    },
  });

  const nextLetter = () => {
    const nextIndex = (letters.findIndex(l => l.id === currentLetter.id) + 1) % letters.length;
    setCurrentLetter(letters[nextIndex]);
    setTracedPoints([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DigiLex Small Letters</Text>

      {/* Big Styled Letter Instead of Image */}
      <Text style={styles.bigLetter}>{currentLetter.name}</Text>

      <View
        ref={tracingAreaRef}
        style={styles.tracingArea}
        {...panResponder.panHandlers}
        onLayout={handleTracingAreaLayout}
      >
        <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
          <Polyline
            points={tracedPoints.map(p => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="blue"
            strokeWidth="4"
          />
        </Svg>

        {currentLetter.tracePath.map((point, i) => (
          <View
            key={`ref-${i}`}
            style={[styles.traceDot, { left: point.x, top: point.y, backgroundColor: 'red' }]}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={playSound}>
        <Text style={styles.buttonText}>Play Sound</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={nextLetter}>
        <Text style={styles.buttonText}>Next Letter</Text>
      </TouchableOpacity>

      <Text style={styles.stars}>{"★".repeat(stars)}</Text>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#34495e',
  },
  bigLetter: {
    fontSize: 180,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  tracingArea: {
    width: 300,
    height: 300,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#3498db',
    borderRadius: 10,
    position: 'relative',
    marginBottom: 30,
  },
  traceDot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    width: 180,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  stars: {
    fontSize: 24,
    color: 'gold',
    marginTop: 20,
  },
});
