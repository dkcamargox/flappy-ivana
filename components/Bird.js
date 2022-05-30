import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// import { Container } from './styles';
const styles = StyleSheet.create({
    logo: {
        width: 66,
        height: 58,
        borderRadius: 8
    },
});
const Bird = ({birdLeft, birdBottom, score, size}) => {
    const birdWidth = size
    const birdHeight = size
    
    return (
        <View
        
            style={{
                position: 'absolute',
                backgroundColor: '#FF0000',
                width: birdWidth,
                height: birdHeight,
                bottom: birdBottom ,
                left: birdLeft - (birdWidth / 2),
                // display: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                border: 3,
                borderColor: '#151518'
            }}        
        >
            <Image
                style={{
                    width: birdWidth,
                    height: birdHeight,
                    borderRadius: 8 
                }}
                source={{
                uri: 'https://instagram.fcor2-1.fna.fbcdn.net/v/t51.2885-19/268484196_666306964528129_8859891439318726598_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fcor2-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=FdIG_0RtOvoAX9i9MDS&edm=ANmP7GQBAAAA&ccb=7-5&oh=00_AT-2MA_JRmDidNQrG8B0IeZdrN8mnYPVxGqQ4_HxFlg6RA&oe=629B1DD3&_nc_sid=276363',
                }}
            />
        </View>
    );
}

export default Bird