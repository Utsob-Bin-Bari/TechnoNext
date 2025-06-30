import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';
import GlobalStyles from '../styles/GlobalStyle';

interface DynamicButtonProps {
    text: string;
    onPress?: () => void;
    textColor?:string;
    backgroundColor?:string;
    borderColor?:string;
    height?:number;
    opacity?:number;
    icon?:boolean;
}
function DynamicButtonBase(props: DynamicButtonProps) {
    const { text, onPress, textColor=Colors.White,borderColor=Colors.Orange, backgroundColor=Colors.Orange, height=64, opacity=1, icon=false } = props;
    return (
        <TouchableOpacity style={[GlobalStyles.buttonContainer,{opacity:opacity,height:height,backgroundColor: backgroundColor, borderColor: borderColor, borderWidth: 2}]} 
            onPress={onPress ? onPress : undefined}
            disabled={onPress?false:true} >
            <View style={{flexDirection:'row'}}>
                <Text style={[GlobalStyles.buttonText,{color:textColor}]}>{text}</Text>
            </View>

        </TouchableOpacity>
    );
}

const DynamicButton = React.memo(DynamicButtonBase);
export default DynamicButton;