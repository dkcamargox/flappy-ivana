import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, ScrollView, Swiper } from 'react-native';
import Bird from './components/Bird'
import Obstacles from './components/Obstacles'

export default function App() {
  const screen = {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height
  }

  
  const birdLeft = screen.width / 2
  const [birdBottom, setBirdBottom] = useState(screen.height / 2)
  
  const [obstacleType1Left, setObstacleType1Left] = useState(screen.width);
  const [obstacleType2Left, setObstacleType2Left] = useState(screen.width + screen.width / 2 + 40);


  const [obstacleType1NegativeHeight, setObstacleType1NegativeHeight] = useState(-100)
  const [obstacleType2NegativeHeight, setObstacleType2NegativeHeight] = useState(-100)
  
  const [score, setScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)
  
  
  const obstaclesWidth = 60
  const obstaclesHeight = 400
  const avatarSize = 100
  const obstaclesGap = avatarSize * 1.5

  
  const gravity = 1.5

  let obstacleType1LeftTimerId
  let obstacleType2LeftTimerId
  
  let gameTimerId

  // setting up bird gravity
  useEffect(() => {
    if( birdBottom > 0) {
      gameTimerId = setTimeout(() => {
        setBirdBottom(birdBottom => birdBottom - gravity)
      }, 20);
    }
    
    return () => {
      clearInterval(gameTimerId)
    }
    
  }, [birdBottom])
  
  // brid motion
  const moveFastDown = () => {
    if(!isGameOver) {
      setBirdBottom(birdBottom => birdBottom - 80)
    }
  }
  const moveFastUp = () => {
    if(!isGameOver) {
      setBirdBottom(birdBottom => birdBottom + 80)
    }
  }
  const moveBird = () => {
    if(isGameOver) {
      setScore(0)
      setBirdBottom(screen.height / 2)

      setObstacleType1Left(screen.width);
    
      setObstacleType2Left(screen.width + screen.width / 2 + 40);
    
      setObstacleType1NegativeHeight(-100)
    
      setObstacleType2NegativeHeight(-100)      
      
      
      
      gameTimerId = setTimeout(() => {
        setBirdBottom(birdBottom => birdBottom - gravity)
      }, 20);

      obstacleType1LeftTimerId = setTimeout(() => {
        setObstacleType1Left(obstacleType1Left => obstacleType1Left - 5)
      }, 40);

      obstacleType2LeftTimerId = setTimeout(() => {
        setObstacleType2Left(obstacleType2Left => obstacleType2Left - 5)
      }, 40);

      setIsGameOver(false)
      return 
    } else {
      setBirdBottom(birdBottom => birdBottom + 20)

    }
  }

  
  // move first obstacle
  useEffect(() => {
    if(score === 0 && obstacleType1Left < obstaclesWidth + birdLeft - 60) {
      setScore(1)
    }
    if (obstacleType1Left > -obstaclesWidth) {
      obstacleType1LeftTimerId = setTimeout(() => {
        setObstacleType1Left(obstacleType1Left => obstacleType1Left - 5)
      }, 40);
      return () => {
        clearInterval(obstacleType1LeftTimerId)
      }
    } else {
      setObstacleType1Left(screen.width)
      setObstacleType1NegativeHeight(-Math.random() * 200)
      setScore(score => score + 1)
    }

    
  }, [obstacleType1Left])

  // move seccond obstacle
  useEffect(() => {
    if (obstacleType2Left > -obstaclesWidth) {
      obstacleType2LeftTimerId = setTimeout(() => {
        setObstacleType2Left(obstacleType2Left => obstacleType2Left - 5)
      }, 40);
      return () => {
        clearInterval(obstacleType2LeftTimerId)
      }
    } else {
      setObstacleType2Left(screen.width)
      setObstacleType2NegativeHeight(-Math.random() * 200)
      setScore(score => score + 1)
    }
  }, [obstacleType2Left])

  //check for collisions
  useEffect(() => {
    if (
        (
          (birdBottom < (obstacleType1NegativeHeight + obstaclesHeight) ||
          birdBottom > (obstacleType1NegativeHeight + obstaclesHeight + obstaclesGap - avatarSize)) &&
          (obstacleType1Left > screen.width/2 -avatarSize && obstacleType1Left < screen.width/2 )
        )
      || 
        (
          (birdBottom < (obstacleType2NegativeHeight + obstaclesHeight) ||
          birdBottom > (obstacleType2NegativeHeight + obstaclesHeight + obstaclesGap - avatarSize)) &&
          (obstacleType2Left > screen.width/2 -avatarSize && obstacleType2Left < screen.width/2 )
        )
      ) 
      {
      gameOver()
    }
  })

  const gameOver = () => {
    clearInterval(gameTimerId)
    clearInterval(obstacleType1LeftTimerId)
    clearInterval(obstacleType2LeftTimerId)
    setIsGameOver(true)
  }
  const [touchY, setTouchY]=useState('')
  return (
    <View 
      onTouchStart={e=> setTouchY(e.nativeEvent.pageY)}
      onTouchEnd={e => {
        if (touchY - e.nativeEvent.pageY < -20) moveFastDown()
        if (touchY - e.nativeEvent.pageY > 20) moveFastUp()
        else moveBird()
      }}
      style={styles.container} 
      // onTouchStart={moveBird} 
    >
      {isGameOver && 
        <View style={{
          backgroundColor: '#76acc2',
          borderWidth: 1,
          borderColor: '#324852',
          paddingHorizontal: 36,
          paddingVertical: 56,
          zIndex: 100,
          borderRadius: 8
          }}
        >
          <Text style={{fontSize: 30}}>Your score is:  {score}</Text>
          <Text style={{fontSize: 12, marginTop: 8, alignSelf: 'center'}}>tap to play again!</Text>
        </View>
      }
      <Bird 
        size={avatarSize}
        birdBottom={birdBottom} 
        birdLeft={birdLeft} 
        score={score}
      />
      <Obstacles
        obstacleLeft={obstacleType1Left}
        obstacleWidth={obstaclesWidth}
        obstacleHeight={obstaclesHeight}
        gap={obstaclesGap}
        randomBottom={obstacleType1NegativeHeight}
      />
      <Obstacles
        obstacleLeft={obstacleType2Left}
        obstacleWidth={obstaclesWidth}
        obstacleHeight={obstaclesHeight}
        gap={obstaclesGap}
        randomBottom={obstacleType2NegativeHeight}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87ceeb',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
