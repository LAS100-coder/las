import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';

const WORD_LISTS = {
  1: ['Math', 'Spell', 'Done', 'Ever', 'Note'],
  2: ['House', 'Plane', 'Store', 'Bread', 'Track'],
  3: ['planet', 'window', 'school', 'picture'],
  4: ['Happiness', 'Lawyer', 'dictionary', 'adventure', 'celebration']
};

const LEVEL_NAMES = {
  1: '🟢 Level 1: Easy (4-letter words)',
  2: '🟡 Level 2: Medium (5-letter words)',
  3: '🔵 Level 3: Hard (6-letter words)',
  4: '🔴 Level 4: Challenge Mode (7+ letters)'
};

interface SpellingGameProps {
  isMultiplayer: boolean;
  onExit: () => void;
}

export default function SpellingGame({ isMultiplayer, onExit }: SpellingGameProps) {
  const [level, setLevel] = useState(1);
  const [currentWord, setCurrentWord] = useState('');
  const [showWord, setShowWord] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [gameWords, setGameWords] = useState<string[]>([]);
  const [gamePhase, setGamePhase] = useState<'start' | 'showing' | 'input' | 'result' | 'complete'>('start');
  const [timeLeft, setTimeLeft] = useState(10);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  const startGame = () => {
    const words = [...WORD_LISTS[level as keyof typeof WORD_LISTS]].sort(() => Math.random() - 0.5).slice(0, 5);
    setGameWords(words);
    setWordIndex(0);
    setScore(0);
    setCurrentPlayer(1);
    setPlayer1Score(0);
    setPlayer2Score(0);
    showNextWord(words[0]);
  };

  const showNextWord = (word: string) => {
    setCurrentWord(word);
    setShowWord(true);
    setGamePhase('showing');
    setTimeLeft(10);
    setUserInput('');
  };

  useEffect(() => {
    if (gamePhase === 'showing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gamePhase === 'showing' && timeLeft === 0) {
      setShowWord(false);
      setGamePhase('input');
    }
  }, [gamePhase, timeLeft]);

  const submitAnswer = () => {
    const isCorrect = userInput.toLowerCase() === currentWord.toLowerCase();
    
    if (isMultiplayer) {
      if (currentPlayer === 1) {
        if (isCorrect) setPlayer1Score(player1Score + 1);
      } else {
        if (isCorrect) setPlayer2Score(player2Score + 1);
      }
    } else {
      if (isCorrect) setScore(score + 1);
    }

    setGamePhase('result');
    
    setTimeout(() => {
      if (wordIndex < gameWords.length - 1) {
        if (isMultiplayer) {
          setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        }
        setWordIndex(wordIndex + 1);
        showNextWord(gameWords[wordIndex + 1]);
      } else {
        setGamePhase('complete');
      }
    }, 2000);
  };

  const renderStartScreen = () => (
    <View style={styles.centerContent}>
      <Text style={styles.title}>Spelling Challenge</Text>
      <Text style={styles.subtitle}>{LEVEL_NAMES[level as keyof typeof LEVEL_NAMES]}</Text>
      <Text style={styles.instructions}>
        {isMultiplayer ? 'Two Player Mode' : 'Single Player Mode'}
      </Text>
      <TouchableOpacity style={styles.button} onPress={startGame}>
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={onExit}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );

  const renderShowingWord = () => (
    <View style={styles.centerContent}>
      <Text style={styles.timer}>{timeLeft}</Text>
      <Text style={styles.word}>{currentWord}</Text>
      <Text style={styles.instruction}>Remember this word!</Text>
      {isMultiplayer && (
        <Text style={styles.playerText}>Player {currentPlayer}'s turn</Text>
      )}
    </View>
  );

  const renderInputPhase = () => (
    <View style={styles.centerContent}>
      <Text style={styles.instruction}>Spell the word:</Text>
      {isMultiplayer && (
        <Text style={styles.playerText}>Player {currentPlayer}</Text>
      )}
      <TextInput
        style={styles.input}
        value={userInput}
        onChangeText={setUserInput}
        placeholder="Type the word here"
        autoFocus
      />
      <TouchableOpacity style={styles.button} onPress={submitAnswer}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );

  const renderResult = () => {
    const isCorrect = userInput.toLowerCase() === currentWord.toLowerCase();
    return (
      <View style={styles.centerContent}>
        <Text style={[styles.result, { color: isCorrect ? '#4CAF50' : '#F44336' }]}>
          {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
        </Text>
        <Text style={styles.correctWord}>The word was: {currentWord}</Text>
        {isMultiplayer ? (
          <Text style={styles.score}>
            Player 1: {player1Score} | Player 2: {player2Score}
          </Text>
        ) : (
          <Text style={styles.score}>Score: {score}/5</Text>
        )}
      </View>
    );
  };

  const renderComplete = () => {
    const finalScore = isMultiplayer ? Math.max(player1Score, player2Score) : score;
    const winner = isMultiplayer ? 
      (player1Score > player2Score ? 'Player 1' : player2Score > player1Score ? 'Player 2' : 'Tie') : null;
    
    return (
      <View style={styles.centerContent}>
        <Text style={styles.title}>Game Complete!</Text>
        {isMultiplayer ? (
          <>
            <Text style={styles.score}>Player 1: {player1Score}</Text>
            <Text style={styles.score}>Player 2: {player2Score}</Text>
            <Text style={styles.winner}>{winner === 'Tie' ? "It's a tie!" : `${winner} wins!`}</Text>
          </>
        ) : (
          <Text style={styles.score}>Final Score: {score}/5</Text>
        )}
        
        {(!isMultiplayer && score >= 4) && level < 4 && (
          <TouchableOpacity style={styles.button} onPress={() => {
            setLevel(level + 1);
            setGamePhase('start');
          }}>
            <Text style={styles.buttonText}>Next Level</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity style={styles.button} onPress={() => setGamePhase('start')}>
          <Text style={styles.buttonText}>Play Again</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.backButton} onPress={onExit}>
          <Text style={styles.backButtonText}>Exit</Text>
        </TouchableOpacity>
      </View>
    );
  };

  switch (gamePhase) {
    case 'start': return renderStartScreen();
    case 'showing': return renderShowingWord();
    case 'input': return renderInputPhase();
    case 'result': return renderResult();
    case 'complete': return renderComplete();
    default: return renderStartScreen();
  }
}

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 20,
  },
  word: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  instruction: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  playerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 18,
    width: '80%',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#667eea',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    minWidth: 150,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: '#667eea',
    fontSize: 16,
  },
  result: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  correctWord: {
    fontSize: 18,
    marginBottom: 20,
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  winner: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
  },
});