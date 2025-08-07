import * as Speech from 'expo-speech';
import { useRef, useState } from 'react';
import { Alert, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';

const letters = [
  {
  id: 1,
  name: 'A',
  tracePath: [
    { x: 100, y: 200 },  // Bottom left
    { x: 120, y: 100 },  // Top point
    { x: 140, y: 200 },  // Bottom right
    { x: 110, y: 150 },  // Mid bar start
    { x: 130, y: 150 }   // Mid bar end
  ]
},
  {
  id: 2,
  name: 'B',
  tracePath: [
    { x: 100, y: 100 },  // Top of spine
    { x: 100, y: 220 },  // Bottom of spine
    { x: 100, y: 100 },  // Back to top
    { x: 140, y: 120 },  // Top curve outward
    { x: 100, y: 140 },  // Back to spine (middle)
    { x: 140, y: 180 },  // Bottom curve outward
    { x: 100, y: 220 }   // Back to bottom spine
  ]
},
  {
    id: 3,
    name: 'C',
    tracePath: [
      { x: 140, y: 100 },
      { x: 120, y: 80 },
      { x: 90, y: 110 },
      { x: 80, y: 160 },
      { x: 110, y: 190 },
      { x: 140, y: 180 }
    ]
  },
  {
    id: 4,
    name: 'D',
    tracePath: [
      { x: 100, y: 100 },
      { x: 100, y: 220 },
      { x: 140, y: 160 },
      { x: 100, y: 180 }
    ]
  },
  // E
  {
    id: 5,
    name: 'E',
    tracePath: [
      { x: 140, y: 100 },
      { x: 100, y: 100 },
      { x: 100, y: 220 },
      { x: 140, y: 220 },
      { x: 100, y: 160 },
      { x: 130, y: 160 }
    ],
  },
  // F
  {
    id: 6,
    name: 'F',
    tracePath: [
      { x: 140, y: 100 },
      { x: 100, y: 100 },
      { x: 100, y: 220 },
      { x: 130, y: 160 }
    ],
  },
  // G
  {
    id: 7,
    name: 'G',
    tracePath: [
      { x: 140, y: 150 },
      { x: 120, y: 100 },
      { x: 90, y: 110 },
      { x: 80, y: 160 },
      { x: 110, y: 190 },
      { x: 140, y: 180 },
      { x: 140, y: 140 },
      { x: 120, y: 140 }
    ],
  },
  // H
  {
    id: 8,
    name: 'H',
    tracePath: [
      { x: 100, y: 100 },
      { x: 100, y: 220 },
      { x: 100, y: 160 },
      { x: 140, y: 160 },
      { x: 140, y: 100 },
      { x: 140, y: 220 }
    ],
  },
  // I
  {
    id: 9,
    name: 'I',
    tracePath: [
      { x: 120, y: 100 },
      { x: 120, y: 220 },
    ],
  },
  // J
  {
    id: 10,
    name: 'J',
    tracePath: [
      { x: 140, y: 100 },
      { x: 140, y: 200 },
      { x: 120, y: 220 },
      { x: 100, y: 210 },
    ],
  },
  // K
  {
    id: 11,
    name: 'K',
    tracePath: [
      { x: 100, y: 100 },
      { x: 100, y: 220 },
      { x: 100, y: 160 },
      { x: 140, y: 100 },
      { x: 100, y: 160 },
      { x: 140, y: 220 }
    ],
  },
  // L
  {
    id: 12,
    name: 'L',
    tracePath: [
      { x: 100, y: 100 },
      { x: 100, y: 220 },
      { x: 140, y: 220 }
    ],
  },
  // M
  {
    id: 13,
    name: 'M',
    tracePath: [
      { x: 100, y: 220 },
      { x: 100, y: 100 },
      { x: 120, y: 160 },
      { x: 140, y: 100 },
      { x: 140, y: 220 }
    ],
  },
  // N
  {
    id: 14,
    name: 'N',
    tracePath: [
      { x: 100, y: 220 },
      { x: 100, y: 100 },
      { x: 140, y: 220 },
      { x: 140, y: 100 }
    ],
  },
  // O
  {
    id: 15,
    name: 'O',
    tracePath: [
      { x: 120, y: 100 },
      { x: 90, y: 140 },
      { x: 120, y: 180 },
      { x: 150, y: 140 },
      { x: 120, y: 100 }
    ],
  },
  // P
  {
    id: 16,
    name: 'P',
    tracePath: [
      { x: 100, y: 220 },
      { x: 100, y: 100 },
      { x: 140, y: 100 },
      { x: 140, y: 140 },
      { x: 100, y: 140 }
    ],
  },
  // Q
  {
    id: 17,
    name: 'Q',
    tracePath: [
      { x: 120, y: 100 },
      { x: 90, y: 140 },
      { x: 120, y: 180 },
      { x: 150, y: 140 },
      { x: 120, y: 100 },
      { x: 140, y: 200 }
    ],
  },
  // R
  {
    id: 18,
    name: 'R',
    tracePath: [
      { x: 100, y: 220 },
      { x: 100, y: 100 },
      { x: 140, y: 100 },
      { x: 140, y: 140 },
      { x: 100, y: 140 },
      { x: 140, y: 220 }
    ],
  },
  // S
  {
    id: 19,
    name: 'S',
    tracePath: [
      { x: 140, y: 110 },
      { x: 110, y: 100 },
      { x: 100, y: 140 },
      { x: 130, y: 160 },
      { x: 140, y: 200 },
      { x: 110, y: 220 }
    ],
  },
  // T
  {
    id: 20,
    name: 'T',
    tracePath: [
      { x: 90, y: 100 },
      { x: 150, y: 100 },
      { x: 120, y: 100 },
      { x: 120, y: 220 }
    ],
  },
  // U
  {
    id: 21,
    name: 'U',
    tracePath: [
      { x: 100, y: 100 },
      { x: 100, y: 180 },
      { x: 120, y: 220 },
      { x: 140, y: 180 },
      { x: 140, y: 100 }
    ],
  },
  // V
  {
    id: 22,
    name: 'V',
    tracePath: [
      { x: 100, y: 100 },
      { x: 120, y: 220 },
      { x: 140, y: 100 }
    ],
  },
  // W
  {
    id: 23,
    name: 'W',
    tracePath: [
      { x: 90, y: 100 },
      { x: 110, y: 220 },
      { x: 130, y: 150 },
      { x: 150, y: 220 },
      { x: 170, y: 100 }
    ],
  },
  // X
  {
    id: 24,
    name: 'X',
    tracePath: [
      { x: 90, y: 100 },
      { x: 150, y: 220 },
      { x: 150, y: 100 },
      { x: 90, y: 220 }
    ],
  },
  // Y
  {
    id: 25,
    name: 'Y',
    tracePath: [
      { x: 90, y: 100 },
      { x: 120, y: 160 },
      { x: 150, y: 100 },
      { x: 120, y: 160 },
      { x: 120, y: 220 }
    ],
  },
  // Z
  {
    id: 26,
    name: 'Z',
    tracePath: [
      { x: 90, y: 100 },
      { x: 150, y: 100 },
      { x: 90, y: 220 },
      { x: 150, y: 220 }
    ],
  },
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
      <Text style={styles.title}>DigiLex Capital Letters</Text>

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
