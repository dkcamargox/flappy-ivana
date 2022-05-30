import React from 'react';
import { View } from 'react-native';

// import { Container } from './styles';

const Obstacles = ({
    obstacleLeft, 
    obstacleWidth, 
    obstacleHeight, 
    gap,
    randomBottom,
}) => {    
    return (
        <>
            <View
                style={{
                    position: 'absolute',
                    backgroundColor: 'green',
                    width: obstacleWidth,
                    height: obstacleHeight,
                    left: obstacleLeft,
                    bottom: randomBottom + obstacleHeight + gap,
                }}
            />
            <View
                style={{
                    position: 'absolute',
                    backgroundColor: 'green',
                    width: obstacleWidth,
                    height: obstacleHeight,
                    left: obstacleLeft,
                    bottom: randomBottom,
                }}
            />
        </>
    );
}

export default Obstacles;