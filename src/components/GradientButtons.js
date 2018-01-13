import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableWithoutFeedback
} from 'react-native';
import { LinearGradient } from 'expo';


class GradientButton extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
        <TouchableWithoutFeedback
            onPress={() => this.props.onPress()}
        >
            <LinearGradient
                colors={['rgb(242, 190, 171)', 'rgb(253, 157, 157)']}
                start={{x: 0.0, y: 0.5}} end={{x: 1.0, y: .5}}
                style={{ padding: 15, alignItems: 'center', borderRadius: 40, width: "65%" }}
            >
                <Text
                    style={{
                    backgroundColor: 'transparent',
                    fontSize: 22,
                    fontWeight: '500',
                    color: '#fff',
                    }}
                >
                    {this.props.buttonText}
                </Text>
            </LinearGradient>
        </TouchableWithoutFeedback>
        )
    }
}

export default GradientButton;