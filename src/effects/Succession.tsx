import React from "react";
import {
    spring,
    Sequence,
    useCurrentFrame,
    useVideoConfig
} from 'remotion';

const word: React.CSSProperties = {
    marginLeft: 10,
    marginRight: 10,
    display: 'inline-block',
};

interface Props {
    type?: 'vertical' | 'horizontal'
    startingFrame?: number
    durration?: number
    translateX?: number
    translateY?: number
    children: React.ReactNode[]
}

export const Succession: React.FunctionComponent<Props> = (props) => {

    const frame = useCurrentFrame();
    const { durationInFrames, fps } = useVideoConfig();
    const durration = props.durration ?? durationInFrames


    return <Sequence from={props.startingFrame ?? 0} durationInFrames={durration}>
        <div style={{ 
            display: 'flex',
            flexDirection: (props.type ?? 'horizontal') === 'vertical' ? 'column' : 'row',
            transform: `translate(${props.translateX}px, ${props.translateY}px)` 
        }}>
            {
                props.children.map((child, index) => {
                    const delay = index * 5;

                    const scale = spring({
                        fps,
                        frame: frame - delay - (props.startingFrame ?? 0),
                        config: {
                            damping: 200,
                        },
                    });

                    return <>
                        <span
                            style={{
                                ...word,
                                transform: `scale(${scale})`,
                            }}
                        >
                            {child}
                        </span>
                    </>
                })
            }
        </div>
    </Sequence>
}