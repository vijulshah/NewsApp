import React from "react";
import { Dimensions, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, { add, clockRunning, cond, divide, eq, floor, not, set, useCode } from "react-native-reanimated";
import { snapPoint, timing, useClock, usePanGestureHandler, useValue } from "react-native-redash";
import colors from '../assets/colors.js';
import Card from './Card.js';

const { width } = Dimensions.get("window");

const Swiper = (data) => {
    const clock = useClock();
    const index = useValue(0);
    const offsetX = useValue(0);
    const translateX = useValue(0);
    const { gestureHandler, state, velocity, translation } = usePanGestureHandler();
    const snapPoints = data.dataSource.map((_, i) => i * - width);
    const to = snapPoint(translateX, velocity.x, snapPoints);
    useCode(() => [ 
        cond(eq(state, State.ACTIVE), [ set(translateX, add(offsetX, translation.x)) ]),
        cond(eq(state, State.END), [ set(translateX, timing({ clock, from: translateX, to })),
        set(offsetX, translateX), cond(not(clockRunning(clock)), [ set(index, floor(divide(translateX, -width))) ]),
        ]),
    ],[]);

    return (
        <View style={{ flex: 1, backgroundColor: colors.primaryDark }}>
            <PanGestureHandler {...gestureHandler}>
                <Animated.View style={{ flex: 1}}>
                    <Animated.View style={{ width: width * data.dataSource.length, flex: 1, flexDirection: "row", transform: [{ translateX }] }} >
                        {data.dataSource.map((item,index) => {
                            return(
                                <Card
                                    key={item.news_id}
                                    item = {item}
                                    navigation = {data.navigation}
                                />
                            );
                        })}
                    </Animated.View>
                </Animated.View>
            </PanGestureHandler>
        </View>
    );
};

export default Swiper;