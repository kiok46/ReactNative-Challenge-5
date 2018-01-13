import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    Animated,
    Dimensions
} from 'react-native';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import GradientButton from './components/GradientButtons'
import Images from './images';


class PopNotification extends React.Component {

  state={
        activeNotification: false,
        animation: new Animated.Value(0)
  }
  
  toggleNotification = () => {
    const toValue = this.state.activeNotification ? 0 : 1
    Animated.spring(this.state.animation, {
        toValue,
        tension: 15,
    },{
        nativeDriver: true
    }).start(() => this.setState({activeNotification: !this.state.activeNotification}))
  }

  renderNotificationIcon = () => {

    const opacityInterpolate = this.state.animation.interpolate({
        inputRange: [0, .7, 1],
        outputRange: [0, 0, 1]
    })

    const opacityStyle = {
        opacity: opacityInterpolate
    }

    const delayOpacityInterpolatee = this.state.animation.interpolate({
        inputRange: [0, .95, 1],
        outputRange: [0, 0, 1]
    })

    const delayOpacityStyle = {
        opacity: delayOpacityInterpolatee
    }

    const scaleNotificationImage = this.state.animation.interpolate({
        inputRange: [0, .99, 1],
        outputRange: [0, 1, 1]
    })

    const transformNotificationImages = {
        transform: [
            {
                scale: scaleNotificationImage
            }
        ]
    }

    return (
    <View style={styles.imageContainer}>                        
        <Animated.View style={[transformNotificationImages, opacityStyle]}>
            <View style={styles.tickBackground}>
                <Ionicons
                    name="md-checkmark-circle"
                    size={18}
                    color="rgb(242, 190, 171)"
                    style={styles.tickStyle}
                />
            </View>
            <Image 
                style={styles.imageStyle}
                source={Images[0]}
            />
        </Animated.View>
        <Animated.View style={[transformNotificationImages, delayOpacityStyle]}>
            <View style={styles.tickBackground}>
                <Ionicons
                    name="md-checkmark-circle"
                    size={18}
                    color="rgb(242, 190, 171)"
                    style={styles.tickStyle}
                />
            </View>
            <Image 
                style={styles.imageStyle}
                source={Images[1]}
            />
        </Animated.View>
    </View>
    )
  }


  render() {

    const { width } = Dimensions.get('window')

    const notificationTranslateY = this.state.animation.interpolate({
        inputRange: [0, .7, 1],
        outputRange: [width+100, 100, 0]
    })

    const notificationTransformStyle = {
        transform: [
            {
                translateY: notificationTranslateY
            }
        ]
    }

    const backgroundOpacity = this.state.animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, .8]
    })

    const backgroundOpacityStyle = {
        opacity: backgroundOpacity
    }

    const textTranslateYEffect = this.state.animation.interpolate({
        inputRange: [0, .6, 1],
        outputRange: [0, 100, 0]
    })

    const textTransformStyle = {
        transform: [
            {
                translateY: textTranslateYEffect
            }
        ]
    }

    return (
        <View style={styles.backgroundContainer}>
            <GradientButton
                onPress={this.toggleNotification}
                buttonText={"Tap me!"}  
            />
            <View
                style={[StyleSheet.absoluteFill]}
                pointerEvents={this.state.activeNotification ? "auto" : "none"}
            >
                <Animated.View style={[styles.backgroundBlack, backgroundOpacityStyle]}/>
                <Animated.View style={[styles.notififactionStyle, notificationTransformStyle]}>
                    {this.renderNotificationIcon()}
                    <Animated.View style={[styles.infoHeading, textTransformStyle, ]}>
                        <Text style={styles.infoHeadingStyle}>
                            Someone likes your place suggestion!
                        </Text>
                    </Animated.View>
                    <Animated.View style={[styles.infoSubHeading, textTransformStyle]}>
                        <Text style={styles.infoSubHeadingStyle}>
                            When the most of invited people accept your
                            place suggestion, we'll send you a notification!
                        </Text>
                    </Animated.View>
                    <GradientButton
                        onPress={this.toggleNotification}
                        buttonText={"Ok, thanks!"}  
                    />
                </Animated.View>
            </View>

        </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  container: {
    height: 60,
    width: "40%",
    borderRadius: 20,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundBlack: {
    flex: 2,
    backgroundColor: 'lightgrey',
  },
  notififactionStyle: {
      flex: 3,
      paddingTop: 30,
      paddingBottom: 20,
      alignItems: "center",
      justifyContent: "space-around",
      backgroundColor: 'white'
  },
  imageContainer: {
    flexDirection: 'row',
  },
  infoHeading: {
    width: "60%"
  },
  infoHeadingStyle: {
    textAlign: 'center',
    fontSize: 22,
    color: 'rgb(70, 70, 70)',
    fontWeight: '500'
  },
  infoSubHeading: {
    width: "80%"
  },
  infoSubHeadingStyle: {
    textAlign: 'center',
    fontSize: 18,
    color: 'rgb(180, 180, 180)',
    fontWeight: '500'
  },
  dismissButtonContainer: {
    backgroundColor: 'tomato',
    
  },
  dismissButton: {
      fontSize: 24,
      fontWeight: '300'
  },



  imageStyle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  tickStyle: {
    position: "absolute",
    right: 7,
    top: -5,
},
tickBackground: {
    zIndex: 9,
    backgroundColor: 'transparent',
}
});


export default PopNotification;