import React from "react";
import { Button } from "./Button";
import { Animated, StyleSheet } from "react-native";
import { Div } from "./Div";
import { colors } from "../theme/colors";
import { Text } from "./Text";

interface DeletePartyButtonProps {
    onDelete: () => void
}

type DeleteState = 'init' | 'read-carefully' | 'are-you-sure'

const styles = StyleSheet.create({
    button: { 
        width: 200,
        alignSelf: 'center',
    },
    button_readCarefully: { opacity: 0.6 },
    progressBar: {
        position: 'absolute',
        left: 0,
        backgroundColor: colors.foreground,
        height: 39,
        overflow: 'hidden'
    },
    progressBarText: {
        position: 'absolute',
        paddingTop: 8,
        paddingLeft: 32,
        color: colors.background,
        width: 200,
    }
})

const LABELS: Record<DeleteState, string> = {
    'init': 'Delete Party',
    'read-carefully': 'Are you sure?',
    'are-you-sure': 'Are you sure?'
}

export function DeletePartyButton({ onDelete }: DeletePartyButtonProps) {
    const [state, setState] = React.useState<DeleteState>('init')
    const progress = React.useRef(new Animated.Value(0)).current;

    const handlePress = () => {
        if (state === 'init') {
            setState('read-carefully')
            Animated.timing(progress, { useNativeDriver: false, toValue: 200, duration: 3000 }).start()
            setTimeout(() => {
                setState('are-you-sure')
            }, 3000)
            return
        }
        if (state === 'read-carefully') return
        if (state === 'are-you-sure') {
            onDelete()
        }
    }

    return (
        <Button
            style={[styles.button, state === 'read-carefully' && styles.button_readCarefully]}
            onPress={handlePress} 
            disabled={state === 'read-carefully'}
        >
            <>
                <Text>{LABELS[state]}</Text>
                <Animated.View style={[styles.progressBar, { width: progress}]}>
                    <Text style={styles.progressBarText}>{LABELS[state]}</Text>
                </Animated.View>
            </>
        </Button>
    )
}