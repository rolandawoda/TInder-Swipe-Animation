import React, {useRef, useState, useEffect} from 'react';
import {
    View,
    Animated, 
    PanResponder,
    Text,
    Dimensions,
    StyleSheet,
    UIManager,
    LayoutAnimation
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;



const Deck = (props) => {
    const {renderCard, data, onSwipeRight, onSwipeLeft, renderNoMoreCards} = props
    const [position, setPosition] = useState(0)
    const pan = useRef(new Animated.ValueXY()).current
    const rotate = pan.x.interpolate({
        inputRange: [-500, 0, 500],
        outputRange: ['-120deg', '0deg', '120deg']
    })
    const panResponder = useRef(PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gesture) => {
            pan.setValue({
                x: gesture.dx,
                y: gesture.dy
            })
        },
        onPanResponderRelease: (event, gesture) => {
            if(gesture.dx > SWIPE_THRESHOLD){
                forceSwipe('right')
            }else if(gesture.dx < -SWIPE_THRESHOLD){
                forceSwipe('left')
            }else{
                resetPosition()
            }
        }
    })).current

    useEffect(() => {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    },[position])

    useEffect(() => {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    },[position])

    const forceSwipe = (direction) => {
        const finalValue = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH
        Animated.timing(pan,{
            toValue: {x: finalValue, y: 0},
            duration: SWIPE_OUT_DURATION,
            useNativeDriver: false
        }).start(() => swipeComplete(direction))
    }

    const swipeComplete = (direction) => {
        const item = data[position]
        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item); 
        pan.setValue({x: 0, y: 0});
        setPosition(prev => prev + 1)
    }

    const resetPosition = () => {
        Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: false
        }).start()
    }

    const renderAllCards = () => {
        if(position >= data.length){
            return renderNoMoreCards()
        }
        return data.map((item, i) => {
            if(position > i) return null
            if(i === position){
                return (
                    <Animated.View
                        key={item.id}
                        style={[{
                            transform: [
                                {rotate}
                            ],
                            ...pan.getLayout()
                        }, styles.container,{zIndex: 99}]}
                        {...panResponder.panHandlers}
                    >
                        {renderCard(item)}
                    </Animated.View>
                )
            }
            return (
                <View key={item.id} style={[styles.container, { top: 10 * (i - position), zIndex: 5 }]}>
                    {renderCard(item)}
                </View>
            )
        }).reverse()
    }
    return (
        <View>
            {renderAllCards()}
        </View>
    )
}

Deck.defaultProps = {
    onSwipeLeft: () => {},
    onSwipeRight: () => {}
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: SCREEN_WIDTH
    }
})

export default Deck;