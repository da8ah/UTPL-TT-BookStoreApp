import { Input } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';

interface TextCarouselProps {
    data: string;
}

const InputCarousel: React.FC<TextCarouselProps> = ({ data, ...props }) => {
    const [inputLayout, setInputLayout] = useState(0)
    const [activeCarousel, setCarouselState] = useState(false)
    const [text, setText] = useState(data)

    const layoutHandler = () =>
        (e: LayoutChangeEvent) => {
            const layout = e.nativeEvent.layout.width
            setCarouselState(layout + 1 > inputLayout)
        }

    const carousel = async () => {
        data += "           "
        let text = data.split('')
        for (let i = 0; i < text.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 200));
            let indexes = []
            let newText = []
            let counter = 0;
            for (let j = i; j < i + text.length; j++) {
                const index = (counter + j) % text.length;
                indexes.push(index)
            }
            for (let j = 0; j < text.length; j++) {
                newText[j] = text[indexes[j]]
            }
            setText(newText.join(''))
            counter++
        }
    }

    // useEffect(() => { carousel() }, [])

    return (
        <View pointerEvents={"auto"} style={{ position: 'relative', backgroundColor: 'red', width: '100%' }} onTouchStart={() => { setCarouselState(true); carousel() }}>
            <Input
                disabled
                style={{ position: activeCarousel ? 'relative' : 'absolute', top: 0, left: 0, width: activeCarousel ? "90%" : "auto" }}
                defaultValue=''
                value={text}
                onLayout={layoutHandler}
            />
            <Input
                {...props}
                style={{ zIndex: 1, width: "90%", backgroundColor: 'transparent', display: activeCarousel ? 'none' : 'flex' }}
                defaultValue={text}
                onChangeText={(input) => {
                    setText(input);
                    activeCarousel && carousel()
                }}
                onLayout={(e) => setInputLayout(e.nativeEvent.layout.width)} />
        </View>
        // <ScrollView
        //     horizontal
        //     pagingEnabled
        // >
        // </ScrollView>
    );
};

export default InputCarousel;