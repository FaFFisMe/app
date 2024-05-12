import React, { useEffect } from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, Border, FontSize, Padding } from "../GlobalStyles";
import { BarChart } from "react-native-gifted-charts"
import { Menu, MenuOptions, MenuOption, MenuTrigger,} from 'react-native-popup-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useData, convertMillisToTime , useTime } from "../components/util"

const MTTI = () => {
  const { jsonData } = useData();
  const navigation = useNavigation();
  const { setTimeInterval , timeInterval } = useTime();
  const handleLogout = async () =>{
    AsyncStorage.removeItem('api_key');
    setTimeInterval("Daily");
    navigation.reset({index: 0,routes: [{ name: 'Login' }]});
  };
  const handleChangetime = (time) => {
    setTimeInterval(time);
  };
  AsyncStorage.getItem('api_key').then(api => {
    if (api === null) {
      handleLogout();
    }
  })
  const fetchData = async () => {
    const { jsonData } = await useData();
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);
  const processData = (data) => {
    const ranges = [0, 2, 4, 6, Infinity];
    const counts = [0, 0, 0, 0, 0];
    const datetime = ["","","","",""];
    if (data != null) {
      data.forEach(value => {
        const intValue = value ? parseInt(convertMillisToTime(value).hoursConv) : 0;
        for (let i = 0; i < ranges.length; i++) {
          if (intValue < ranges[i]) {
            datetime[i] = datetime[i] + intValue.toString() + " hr. " + 
              parseInt(convertMillisToTime(value).minutesConv) + " m. " +
              parseInt(convertMillisToTime(value).secondsConv) + " s.\n";
            counts[i]++;
            break;
          }
        }
      });
      
      return counts.map((value, index) => ({ value, 
        label: index < ranges.length-1 ?  ranges[index] + " hr." : "",
        frontColor: index == "0" || index == "4" ?  "#B22222" : "#95CADB",
        topLabelComponent: () => (
          <Text style={{color: 'lightblue', fontSize: 18, marginBottom: 6}}>{value}</Text>
        ),
        datetime : datetime[index].replace(/\n$/, ''),
        }));
    } else {
      return null;
    }
  };

  const lineData1 = processData(jsonData.TTIall);

  // หาค่าสูงสุดของ value ใน lineData1
  const maxValue = lineData1 != null ? Math.max(...lineData1.map(item => item.value)) : null;
  return (
    <View style={[styles.mttd, styles.wrapperFlexBox]}>
      <View style={[styles.frameParent, styles.parentFlexBox]}>
        <Pressable
          style={[styles.chevronleftParent, styles.frameContainerFlexBox]}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.chevronleftIcon}
            contentFit="cover"
            source={require("../assets/chevronleft.png")}
          />
          <Image
            style={[styles.frameChild, styles.frameChildPosition1]}
            contentFit="cover"
            source={require("../assets/ellipse-81.png")}
          />
        </Pressable>
        <View style={styles.meanTimeToDetectWrapper}>
          <Text style={[styles.meanTimeTo, styles.avgTypo]}>
            {timeInterval} : Time to Identify
          </Text>
        </View>
        <View style={styles.frameWrapper}>
        <Menu>
            <MenuTrigger >
              <Image
                style={styles.frameItem}
                source={require("../assets/frame-501.png")}
              />
            </MenuTrigger>
            <MenuOptions customStyles={optionStyles}>
              <MenuOption onSelect={() => handleChangetime('Daily')} text='Daily' />
              <MenuOption onSelect={() => handleChangetime('Weekly')} text="Weekly"/>
              <MenuOption onSelect={() => handleLogout()} >
                <Text style = {{color:'red' , fontWeight : '900'}}>Logout</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
          </View>
      </View>
      <View style={[styles.roundedRectangleParent, styles.frameGroupFlexBox]}>
        <View style={[styles.roundedRectangle, styles.frameContainerLayout]} />
        <View style={styles.chartContainer}>
        <BarChart
            style={{ flex: 1 }} 
            initialSpacing={20}
            barWidth={25}
            barBorderRadius={4}
            noOfSections={3}
            data={lineData1}
            yAxisThickness={0}
            xAxisThickness={2}
            maxValue={maxValue}
            disableScroll={true}
            spacing={20}
            height={250}
            width={250}
            isAnimated={true}
            yAxisTextStyle={{color: 'lightblue'}}
            xAxisLabelTextStyle	= {{marginRight : -45,color:'white'}}
            renderTooltip={(item, index) => {
              let marginLeftValue = 10;

              if (index > 2) {
                marginLeftValue = - 30;
              }
            return (
              <View
                style={{
                  marginBottom: -50,
                  marginLeft: marginLeftValue,
                  backgroundColor: '#ffcefe',
                  paddingHorizontal: 6,
                  paddingVertical: 4,
                  borderRadius: 4,
                }}>
                <Text>{item.datetime}</Text>
              </View>
            );
          }}
          />
        </View>
      </View>
      <View style={[styles.frameGroup, styles.frameGroupFlexBox]}>
        <View style={[styles.frameContainer, styles.frameContainerLayout]}>
          <View style={[styles.avgWrapper, styles.wrapperFlexBox]}>
            <Text style={[styles.avg, styles.avgTypo]}>AVG</Text>
          </View>
          <View style={styles.frameView}>
            <View style={styles.mttdavghrWrapper}>
              <Text style={[styles.mttdavghr, styles.mttdavgmTypo]}>
                {convertMillisToTime(jsonData && jsonData.TTIavg).hours}
              </Text>
            </View>
            <View style={[styles.wrapper, styles.wrapperPosition]}>
              <Text style={styles.textTypo}>:</Text>
            </View>
            <View style={styles.mttdavgmWrapper}>
              <Text style={[styles.mttdavgm, styles.mttdavgmTypo]}>
                {convertMillisToTime(jsonData && jsonData.TTIavg).minutes}
              </Text>
            </View>
            <View style={styles.framePosition}>
              <Text style={[styles.text1, styles.textTypo]}>:</Text>
              <View style={styles.frameInner} />
            </View>
            <View style={[styles.mttdavgsWrapper, styles.wrapperPosition]}>
              <Text style={[styles.mttdavgs, styles.mttdavgmTypo]}>
                {convertMillisToTime(jsonData && jsonData.TTIavg).seconds}
              </Text>
            </View>
            <View style={[styles.frameChild1, styles.frameChildPosition]} />
          </View>
        </View>
        <View style={[styles.frameParent1, styles.frameParentLayout]}>
          <View style={[styles.maxWrapper, styles.wrapperFlexBox]}>
            <Text style={[styles.avg, styles.avgTypo]}>MAX</Text>
          </View>
          <View style={styles.frameView}>
            <View style={styles.mttdavghrWrapper}>
              <Text style={[styles.mttdavghr, styles.mttdavgmTypo]}>
                {convertMillisToTime(jsonData && jsonData.TTImax).hours}
              </Text>
            </View>
            <View style={[styles.wrapper, styles.wrapperPosition]}>
              <Text style={styles.textTypo}>:</Text>
            </View>
            <View style={styles.mttdavgmWrapper}>
              <Text style={[styles.mttdavgm, styles.mttdavgmTypo]}>
                {convertMillisToTime(jsonData && jsonData.TTImax).minutes}
              </Text>
            </View>
            <View style={[styles.frame, styles.framePosition]}>
              <Text style={styles.textTypo}>:</Text>
            </View>
            <View style={[styles.mttdavgsWrapper, styles.wrapperPosition]}>
              <Text style={[styles.mttdavgs, styles.mttdavgmTypo]}>
                {convertMillisToTime(jsonData && jsonData.TTImax).seconds}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.frameParent3, styles.frameParentLayout]}>
          <View style={[styles.minWrapper, styles.wrapperFlexBox]}>
            <Text style={[styles.avg, styles.avgTypo]}>MIN</Text>
          </View>
          <View style={styles.frameView}>
            <View style={styles.mttdavghrWrapper}>
              <Text style={[styles.mttdavghr, styles.mttdavgmTypo]}>
                {convertMillisToTime(jsonData && jsonData.TTImin).hours}
              </Text>
            </View>
            <View style={[styles.wrapper, styles.wrapperPosition]}>
              <Text style={styles.textTypo}>:</Text>
            </View>
            <View style={styles.mttdavgmWrapper}>
              <Text style={[styles.mttdavgm, styles.mttdavgmTypo]}>
                {convertMillisToTime(jsonData && jsonData.TTImin).minutes}
              </Text>
            </View>
            <View style={[styles.frame, styles.framePosition]}>
              <Text style={styles.textTypo}>:</Text>
            </View>
            <View style={[styles.mttdavgsWrapper, styles.wrapperPosition]}>
              <Text style={[styles.mttdavgs, styles.mttdavgmTypo]}>
                {convertMillisToTime(jsonData && jsonData.TTImin).seconds}
              </Text>
            </View>
            <View style={[styles.frameChild2, styles.frameChildPosition]} />
          </View>
        </View>
      </View>
    </View>
  );
};

const optionStyles = {
  optionWrapper: {
    margin: 10,
  },
  optionWrapper: {
    margin: 10,
  },
  optionText: {
    fontWeight : "700",
  }
}

const styles = StyleSheet.create({
  frameWrapper :{
    width : 50,
  },
  chartContainer: {
    marginTop: -220,
    marginLeft: -210,
    width: 323,
    height: 228,
    zIndex: 1,
    paddingVertical: Padding.p_7xl,
    paddingHorizontal: Padding.p_32xl,
    left: "50%",
    top: "55%",
    position: "absolute",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapperFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  parentFlexBox: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  frameContainerFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  frameChildPosition1: {
    zIndex: 1,
    position: "absolute",
  },
  avgTypo: {
    textAlign: "center",
    fontFamily: FontFamily.robotoBold,
    fontWeight: "600",
  },
  frameGroupFlexBox: {
    marginTop: 21,
    width: 329,
    justifyContent: "center",
    alignItems: "center",
  },
  frameContainerLayout: {
    backgroundColor: Color.steelblue,
    borderRadius: Border.br_xl,
    width: 329,
  },
  mttdavgmTypo: {
    textAlign: "right",
    color: Color.khaki,
    letterSpacing: 1,
    fontSize: FontSize.size_29xl,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "600",
  },
  wrapperPosition: {
    top: 0,
    height: 76,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  textTypo: {
    width: 14,
    textAlign: "right",
    color: Color.khaki,
    letterSpacing: 1,
    fontSize: FontSize.size_29xl,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "600",
  },
  frameChildPosition: {
    top: 42,
    height: 32,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  frameParentLayout: {
    marginTop: 22,
    paddingLeft: Padding.p_3xs,
    height: 76,
    backgroundColor: Color.steelblue,
    borderRadius: Border.br_xl,
    width: 329,
    flexDirection: "row",
    alignItems: "center",
  },
  framePosition: {
    width: 28,
    left: 139,
    top: 0,
    height: 76,
    position: "absolute",
  },
  chevronleftIcon: {
    width: 16,
    height: 29,
    zIndex: 0,
  },
  frameChild: {
    top: 12,
    width: 68,
    height: 68,
    left: 0,
    zIndex: 1,
  },
  chevronleftParent: {
    paddingHorizontal: Padding.p_4xl,
    paddingVertical: Padding.p_12xl,
  },
  meanTimeTo: {
    fontSize: FontSize.size_sm,
    letterSpacing: 0.3,
    color: Color.black,
    width: 197,
  },
  meanTimeToDetectWrapper: {
    borderRadius: 141,
    backgroundColor: Color.deepskyblue,
    width: 213,
    height: 45,
    paddingHorizontal: Padding.p_0,
    paddingVertical: Padding.p_sm,
    justifyContent: "flex-end",
    marginLeft: 6,
    alignItems: "center",
  },
  frameItem: {
    width: 70,
    height: 70,
    marginBottom : -29,
    marginLeft: 18,
  },
  frameParent: {
    width: 352,
    height: 73,
    alignItems: "center",
  },
  roundedRectangle: {
    height: 328,
    zIndex: 0,
  },
  mttdgraphIcon: {
    width: 220,
    height: 223,
  },
  roundedRectangleParent: {
    height: 328,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  avg: {
    fontSize: FontSize.size_6xl,
    letterSpacing: 0.5,
    color: Color.mediumturquoise,
    width: 71,
  },
  avgWrapper: {
    width: 67,
  },
  mttdavghr: {
    width: 64,
  },
  mttdavghrWrapper: {
    width: 76,
    top: 0,
    height: 76,
    left: 0,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    left: 64,
    width: 34,
  },
  mttdavgm: {
    width: 69,
  },
  mttdavgmWrapper: {
    left: 72,
    paddingLeft: Padding.p_3xs,
    width: 76,
    top: 0,
    height: 76,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  text1: {
    top: 8,
    left: 12,
    position: "absolute",
    width: 14,
  },
  frameInner: {
    top: 43,
    left: -9,
    height: 32,
    width: 32,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  mttdavgs: {
    width: 66,
  },
  mttdavgsWrapper: {
    left: 146,
    width: 79,
    paddingLeft: Padding.p_4xs,
  },
  frameChild1: {
    left: 211,
    width: 29,
  },
  frameView: {
    width: 228,
    height: 76,
  },
  frameContainer: {
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: Padding.p_0,
    height: 76,
    flexDirection: "row",
    alignItems: "center",
  },
  maxWrapper: {
    width: 65,
  },
  frame: {
    paddingHorizontal: Padding.p_11xs,
    paddingVertical: Padding.p_5xs,
    alignItems: "flex-end",
  },
  frameParent1: {
    paddingRight: Padding.p_mini,
  },
  minWrapper: {
    width: 64,
  },
  frameChild2: {
    left: 54,
    width: 32,
    top: 42,
  },
  frameParent3: {
    paddingRight: Padding.p_mini_5,
  },
  frameGroup: {
    height: 278,
  },
  mttd: {
    backgroundColor: Color.gray,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
    paddingLeft: Padding.p_11xl,
    paddingTop: Padding.p_16xl,
    paddingRight: 25,
    paddingBottom: Padding.p_30xl,
  },
});

export default MTTI;
