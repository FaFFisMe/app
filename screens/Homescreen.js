import React , {useEffect, useState} from "react";
import { Image } from "expo-image";
import { StyleSheet, ImageBackground, Text, View, Pressable,} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Padding } from "../GlobalStyles";
import { Menu, MenuOptions, MenuOption, MenuTrigger,} from 'react-native-popup-menu';
import { fetchApiData , convertMillisToTime } from '../components/util';
import { useData , useTime} from "../components/util"
import AsyncStorage from '@react-native-async-storage/async-storage';

const Homescreen = () => {
  const { jsonData ,setJsonData } = useData();
  const navigation = useNavigation();
  const { timeInterval, setTimeInterval } = useTime();

  const handleChangetime = (time) => {
    setTimeInterval(time)
  };

  const handleLogout = async () =>{
    AsyncStorage.removeItem('api_key');
    setTimeInterval("Daily");
    navigation.reset({index: 0,routes: [{ name: 'Login' }]});
  };
  useEffect(() => {
    fetchApiData(process.env.ENDPOINT_INCIDENT, timeInterval, setJsonData, handleLogout);
    
    const intervalId = setInterval(() => {
      fetchApiData(process.env.ENDPOINT_INCIDENT, timeInterval, setJsonData, handleLogout);
    }, 300000);
  
    return () => clearInterval(intervalId);
  }, [timeInterval]);
  
  return (
    <View style={styles.homescreen}>
      <Image
        style={styles.homescreenChild}
        contentFit="cover"
        source={require("../assets/frame-46.png")}
      />
      <View style={styles.frame}>
        <View style={styles.frame1}>
          <View style={styles.frameParent}>
            <View style={styles.unsplashbu8texhspcyParent}>
              <ImageBackground
                style={styles.unsplashbu8texhspcyIcon}
                resizeMode="cover"
                source={require("../assets/unsplashbu8texhspcy.png")}
              />
              <Text style={[styles.admin, styles.adminTypo]}>User</Text>
            </View>
            <View style={styles.frameWrapper}>
              <View style={styles.vectorWrapper}>
                <Menu>
                  <MenuTrigger >
                    <Image
                      style={styles.vectorIcon}
                      contentFit="cover"
                      source={require("../assets/vector.png")}
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
          </View>
          <View style={styles.welcomeAdminWrapper}>
            <Text style={[styles.welcomeAdmin, styles.adminTypo]}>
              <Text style={styles.welcome}>{timeInterval}</Text>
              {'\n'}
              <Text style={styles.admin1}>{jsonData.currentDate}</Text>
            </Text>
          </View>
          <View style={styles.frameGroup}>
            <Pressable
              style={[styles.frameContainer, styles.frameFlexBox]}
              onPress={() => navigation.navigate("NewIncident")}
            >
              <View style={[styles.frameView, styles.frameFlexBox]}>
                <View style={[styles.vectorParent, styles.frameFlexBox]}>
                  <Image
                    style={styles.vectorIcon1}
                    contentFit="cover"
                    source={require("../assets/vector1.png")}
                  />
                  <View style={styles.frameWrapper1}>
                    <View style={styles.newIncidentWrapper}>
                      <Text style={[styles.newIncident, styles.hrTypo]}>{`NEW
INCIDENT`}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.frame2}>
                  <View style={styles.wrapper}>
                    <Text style={styles.text}>{jsonData.countAll}</Text>
                  </View>
                </View>
              </View>
            </Pressable>
            <View style={[styles.frame3, styles.frameLayout2]}>
              <Pressable
                style={[styles.frameInner, styles.frameLayout2]}
                onPress={() => navigation.navigate("Pending")}
              >
                <View style={styles.frameParent1}>
                  <Image
                    style={[styles.frameChild, styles.frameLayout1]}
                    contentFit="cover"
                    source={require("../assets/frame-77.png")}
                  />
                  <View style={[styles.frame4, styles.frame4Layout]}>
                    <View style={[styles.container, styles.frame4Layout]}>
                      <Text style={styles.textTypo}>{jsonData.countOngoing}</Text>
                    </View>
                    <View style={[styles.pendingWrapper, styles.frame4Layout]}>
                      <Text style={[styles.pending, styles.hrTypo]}>
                        PENDING
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
              <Pressable
                style={[styles.framePressable, styles.frameLayout2]}
                onPress={() => navigation.navigate("Closed1")}
              >
                <View style={styles.frameParent2}>
                  <Image
                    style={[styles.frameItem, styles.frameLayout1]}
                    contentFit="cover"
                    source={require("../assets/frame-78.png")}
                  />
                  <View style={[styles.frame5, styles.framePosition]}>
                    <View style={[styles.frameInner1, styles.wrapper1Layout]}>
                      <View style={[styles.wrapper1, styles.wrapper1Layout]}>
                        <Text style={[styles.text2, styles.textTypo]}>{jsonData.countClosed}</Text>
                      </View>
                    </View>
                    <View style={styles.closedWrapper}>
                      <Text style={[styles.closed, styles.closedTypo]}>
                        CLOSED
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.frameParent3, styles.frameParentLayout]}>
        <Pressable
          style={styles.frameParent4}
          onPress={() => navigation.navigate("MTTD")}
        >
          <View style={styles.frameLayout}>
            <View style={styles.frame7}>
              <View style={[styles.mttdBox, styles.mttdLayout]}>
                <View style={styles.mttdWrapper}>
                  <Text style={[styles.mttd, styles.mttdFlexBox]}>MTTD</Text>
                </View>
              </View>
              <View style={[styles.frameInner2, styles.frameInnerSpaceBlock]}>
                <View style={[styles.avgWrapper, styles.avgFlexBox]}>
                  <Text style={[styles.avg, styles.avgTypo]}>AVG</Text>
                </View>
              </View>
            </View>
            <View style={styles.frameParent5}>
              <View style={[styles.frameWrapper2, styles.mttdFlexBox]}>
                <View style={styles.mttdHrWrapper}>
                  <Text style={[styles.mttdHr, styles.closedTypo]}>
                    {convertMillisToTime(jsonData && jsonData.TTDavg).minutes}
                  </Text>
                </View>
              </View>
              <View style={[styles.frame8, styles.frameFlexBox]}>
                <View style={styles.frameInner3}>
                  <View style={styles.hrWrapper}>
                    <Text style={[styles.hr, styles.hrTypo]}>m</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.frameWrapper2, styles.mttdFlexBox]}>
              <View style={styles.frameParent5}>
                <View style={[styles.frameWrapper2, styles.mttdFlexBox]}>
                  <View style={styles.mttdHrWrapper}>
                    <Text style={[styles.mttdHr, styles.closedTypo]}>
                      {convertMillisToTime(jsonData && jsonData.TTDavg).seconds}
                    </Text>
                  </View>
                </View>
                <View style={[styles.frame8, styles.frameFlexBox]}>
                  <View style={styles.frameInner3}>
                    <Text style={[styles.hr, styles.hrTypo]}>s</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <Image
            style={styles.frameChild1}
            contentFit="cover"
            source={require("../assets/vector-1.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.frameParent7, styles.frameParentLayout]}
          onPress={() => navigation.navigate("MTTI")}
        >
          <View style={styles.frameLayout}>
            <View style={styles.frame7}>
              <View style={[styles.mttdBox1, styles.mttdLayout]}>
                <View style={[styles.mttrWrapper, styles.wrapperFlexBox]}>
                  <Text style={[styles.mttr, styles.mttdFlexBox]}>MTTI</Text>
                </View>
              </View>
              <View style={[styles.frameInner5, styles.avg1FlexBox]}>
                <View style={styles.avgContainer}>
                  <Text style={[styles.avg1, styles.avg1FlexBox]}>AVG</Text>
                </View>
              </View>
            </View>
            <View style={styles.frameParent5}>
              <View style={[styles.frameWrapper2, styles.mttdFlexBox]}>
                <View style={styles.mttdHrWrapper}>
                  <Text style={[styles.mttdHr, styles.closedTypo]}>
                    {convertMillisToTime(jsonData.TTIavg).hours}
                  </Text>
                </View>
              </View>
              <View style={[styles.frame8, styles.frameFlexBox]}>
                <View style={styles.frameInner3}>
                  <View style={styles.hrWrapper}>
                    <Text style={[styles.hr, styles.hrTypo]}>hr</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.frameWrapper2, styles.mttdFlexBox]}>
              <View style={styles.frameParent5}>
                <View style={[styles.frameWrapper2, styles.mttdFlexBox]}>
                  <View style={styles.mttdHrWrapper}>
                    <Text style={[styles.mttdHr, styles.closedTypo]}>
                      {convertMillisToTime(jsonData.TTIavg).minutes}
                    </Text>
                  </View>
                </View>
                <View style={[styles.frame8, styles.frameFlexBox]}>
                  <View style={styles.frameInner3}>
                    <Text style={[styles.hr, styles.hrTypo]}>m</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <Image
            style={styles.frameChild1}
            contentFit="cover"
            source={require("../assets/vector-1.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.frame14, styles.frameLayout]}
          onPress={() => navigation.navigate("MTTR")}
        >
          <View style={styles.frame7}>
            <View style={[styles.mttdBox2, styles.mttdLayout]}>
              <View style={[styles.mttaAWrapper, styles.wrapperFlexBox]}>
                <Text
                  style={[styles.mttaA, styles.mttdFlexBox]}
                >{`MTTR`}</Text>
              </View>
            </View>
            <View style={[styles.frameInner2, styles.frameInnerSpaceBlock]}>
              <View style={styles.avgFrame}>
                <Text style={[styles.avg2, styles.avgTypo]}>AVG</Text>
              </View>
            </View>
          </View>
          <View style={styles.frameParent5}>
            <View style={[styles.frameWrapper2, styles.mttdFlexBox]}>
              <View style={styles.mttdHrWrapper}>
                <Text style={[styles.mttdHr, styles.closedTypo]}>
                  {convertMillisToTime(jsonData.TTRavg).hours}
                </Text>
              </View>
            </View>
            <View style={[styles.frame8, styles.frameFlexBox]}>
              <View style={styles.frameInner3}>
                <View style={styles.hrWrapper}>
                  <Text style={[styles.hr, styles.hrTypo]}>hr</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.frameWrapper2, styles.mttdFlexBox]}>
            <View style={styles.frameParent5}>
              <View style={[styles.frameWrapper2, styles.mttdFlexBox]}>
                <View style={styles.mttdHrWrapper}>
                  <Text style={[styles.mttdHr, styles.closedTypo]}>
                    {convertMillisToTime(jsonData.TTRavg).minutes}
                  </Text>
                </View>
              </View>
              <View style={[styles.frame8, styles.frameFlexBox]}>
                <View style={styles.frameInner3}>
                  <Text style={[styles.hr, styles.hrTypo]}>m</Text>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
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
  adminTypo: {
    color: Color.white,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    textAlign: "center",
  },
  frameFlexBox: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  hrTypo: {
    display: "flex",
    fontWeight: "600",
    textAlign: "center",
    color: Color.white,
    fontFamily: FontFamily.robotoBold,
    justifyContent: "center",
    alignItems: "center",
  },
  frameLayout2: {
    width: 178,
    justifyContent: "center",
  },
  frameLayout1: {
    width: 174,
    position: "absolute",
  },
  frame4Layout: {
    width: 115,
    alignItems: "center",
  },
  framePosition: {
    position: "absolute",
    overflow: "hidden",
  },
  wrapper1Layout: {
    width: 114,
    justifyContent: "center",
  },
  textTypo: {
    letterSpacing: 1.6,
    fontSize: FontSize.size_61xl,
    fontFamily: FontFamily.robotoMedium,
    fontWeight: "500",
    textAlign: "center",
    color: Color.white,
  },
  closedTypo: {
    fontWeight: "600",
    color: Color.white,
    fontFamily: FontFamily.robotoBold,
  },
  frameParentLayout: {
    width: 369,
    marginTop: 21,
    alignItems: "center",
  },
  mttdLayout: {
    width: 84,
    borderRadius: 141,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  mttdFlexBox: {
    width: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  frameInnerSpaceBlock: {
    paddingVertical: Padding.p_0,
    paddingHorizontal: Padding.p_8xl,
    width: 86,
  },
  avgFlexBox: {
    height: 26,
    justifyContent: "center",
    alignItems: "center",
  },
  avgTypo: {
    color: Color.mediumturquoise,
    display: "flex",
    fontWeight: "600",
    letterSpacing: 0.3,
    fontSize: FontSize.size_sm,
    textAlign: "center",
    fontFamily: FontFamily.robotoBold,
  },
  wrapperFlexBox: {
    width: 83,
    justifyContent: "center",
    alignItems: "center",
  },
  avg1FlexBox: {
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  frameLayout: {
    width: 348,
    height: 66,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
  },
  homescreenChild: {
    width: 373,
    height: 85,
  },
  unsplashbu8texhspcyIcon: {
    height: 32,
    width: 32,
  },
  admin: {
    fontSize: 16,
    marginLeft: 6,
    textAlign: "center",
  },
  unsplashbu8texhspcyParent: {
    height: 48,
    width: 110,
    flexDirection: "row",
    alignItems: "center",
  },
  vectorIcon: {
    width: 36,
    height: 33,
  },
  vectorWrapper: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  frameWrapper: {
    width: 56,
    height: 53,
    marginLeft: 186,
    justifyContent: "center",
    alignItems: "center",
  },
  frameParent: {
    width: 338,
    height: 54,
    flexDirection: "row",
    alignItems: "center",
  },
  welcome: {
    fontSize: FontSize.size_sm,
  },
  admin1: {
    fontSize: 26,
  },
  welcomeAdmin: {
    paddingVertical : 10,
    height: 67,
    width: 264,
    textAlign: "center",
  },
  welcomeAdminWrapper: {
    height: 73,
    marginTop: -8,
    width: 264,
    justifyContent: "center",
    alignItems: "center",
  },
  vectorIcon1: {
    height: 220,
    width: 157,
  },
  newIncident: {
    height: 40,
    letterSpacing: 0.3,
    fontSize: FontSize.size_mini,
    width: 132,
  },
  newIncidentWrapper: {
    height: 58,
    width: 132,
    justifyContent: "center",
    alignItems: "center",
  },
  frameWrapper1: {
    height: 59,
    marginTop: -56,
    width: 157,
    justifyContent: "center",
    alignItems: "center",
  },
  vectorParent: {
    width: 157,
  },
  text: {
    fontSize: 100,
    letterSpacing: 2,
    width: 146,
    fontFamily: FontFamily.robotoMedium,
    fontWeight: "500",
    height: 122,
    textAlign: "center",
    color: Color.white,
  },
  wrapper: {
    height: 122,
    width: 154,
    justifyContent: "center",
    alignItems: "center",
  },
  frame2: {
    width: 156,
    height: 200,
    paddingBottom: 0,
    marginTop: -200,
    overflow: "hidden",
    alignItems: "center",
  },
  frameView: {
    height: 222,
    width: 157,
  },
  frameContainer: {
    width: 173,
    height: 235,
    paddingHorizontal: Padding.p_5xs,
    paddingBottom: Padding.p_9xs,
  },
  frameChild: {
    top: -8,
    left: -10,
    height: 137,
  },
  container: {
    height: 117,
    justifyContent: "center",
  },
  pending: {
    width: 109,
    height: 19,
    letterSpacing: 0.3,
    fontSize: FontSize.size_mini,
  },
  pendingWrapper: {
    marginTop: -22,
    height: 32,
    justifyContent: "center",
  },
  frame4: {
    top: -13,
    left: 20,
    height: 132,
    position: "absolute",
    overflow: "hidden",
  },
  frameParent1: {
    height: 117,
    width: 154,
  },
  frameInner: {
    alignItems: "center",
  },
  frameItem: {
    top: -3,
    left: -9,
    height: 127,
  },
  text2: {
    width: 113,
  },
  wrapper1: {
    alignItems: "center",
  },
  frameInner1: {
    height: 117,
  },
  closed: {
    letterSpacing: 0.3,
    fontSize: FontSize.size_mini,
    textAlign: "center",
  },
  closedWrapper: {
    width: 119,
    marginTop: -25,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  frame5: {
    top: -10,
    left: 19,
    width: 120,
    height: 123,
    paddingLeft: 1,
    alignItems: "center",
  },
  frameParent2: {
    width: 155,
    height: 116,
  },
  framePressable: {
    height: 146,
    marginTop: -17,
    alignItems: "center",
  },
  frame3: {
    height: 246,
    paddingTop: 29,
    marginLeft: 13,
    overflow: "hidden",
  },
  frameGroup: {
    width: 364,
    height: 267,
    alignItems: "flex-end",
    marginTop: -8,
    flexDirection: "row",
  },
  frame1: {
    width: 320,
    height: 326,
    paddingTop: Padding.p_xl,
    justifyContent: "center",
    alignItems: "center",
  },
  frame: {
    width: 375,
    height: 355,
    paddingBottom: 21,
    marginTop: 21,
    alignItems: "center",
  },
  mttd: {
    height: 17,
    color: Color.black,
    width: 75,
    display: "flex",
    fontWeight: "600",
    letterSpacing: 0.3,
    fontSize: FontSize.size_sm,
    textAlign: "center",
    fontFamily: FontFamily.robotoBold,
  },
  mttdWrapper: {
    width: 82,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  mttdBox: {
    backgroundColor: Color.mediumspringgreen,
  },
  avg: {
    width: 76,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  avgWrapper: {
    width: 30,
  },
  frameInner2: {
    height: 37,
    justifyContent: "center",
    alignItems: "center",
  },
  frame7: {
    height: 44,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
  },
  mttdHr: {
    fontSize: FontSize.size_29xl,
    letterSpacing: 1,
    textAlign: "right",
    width: 90,
    height: 58,
  },
  mttdHrWrapper: {
    width: 60,
    justifyContent: "space-between",
    height: 58,
    alignItems: "flex-end",
  },
  frameWrapper2: {
    height: 68,
  },
  hr: {
    fontSize: FontSize.size_3xs,
    letterSpacing: 0.2,
    width: 24,
    height: 14,
  },
  hrWrapper: {
    width: 27,
    justifyContent: "center",
    alignItems: "center",
  },
  frameInner3: {
    height: 32,
    width: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  frame8: {
    height: 62,
    marginLeft: -16,
    overflow: "hidden",
    width: 32,
  },
  frameParent5: {
    width: 91,
    height: 68,
    flexDirection: "row",
  },
  frameChild1: {
    width: 371,
    height: 3,
    marginTop: 15,
  },
  frameParent4: {
    paddingTop: 6,
    height: 66,
    width: 369,
    alignItems: "center",
  },
  mttr: {
    height: 18,
    color: Color.black,
    width: 75,
    display: "flex",
    fontWeight: "600",
    letterSpacing: 0.3,
    fontSize: FontSize.size_sm,
    textAlign: "center",
    fontFamily: FontFamily.robotoBold,
  },
  mttrWrapper: {
    height: 22,
  },
  mttdBox1: {
    backgroundColor: Color.deepskyblue,
  },
  avg1: {
    width: 72,
    color: Color.mediumturquoise,
    display: "flex",
    fontWeight: "600",
    letterSpacing: 0.3,
    fontSize: FontSize.size_sm,
    textAlign: "center",
    fontFamily: FontFamily.robotoBold,
    marginTop : 9,
  },
  avgContainer: {
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  frameInner5: {
    paddingVertical: Padding.p_0,
    paddingHorizontal: Padding.p_8xl,
    width: 86,
  },
  frameParent7: {
    height: 72,
    paddingTop: 11,
  },
  mttaA: {
    color: Color.black,
    width: 75,
    display: "flex",
    fontWeight: "600",
    letterSpacing: 0.3,
    fontSize: FontSize.size_sm,
    textAlign: "center",
    fontFamily: FontFamily.robotoBold,
    height: 18,
  },
  mttaAWrapper: {
    height: 18,
  },
  mttdBox2: {
    backgroundColor: Color.darkorange,
  },
  avg2: {
    width: 69,
    height: 19,
    justifyContent: "center",
    alignItems: "center",
  },
  avgFrame: {
    width: 54,
    justifyContent: "center",
    alignItems: "center",
  },
  frame14: {
    paddingTop: Padding.p_3xs,
    marginTop: 21,
  },
  frameParent3: {
    height: 233,
    justifyContent: "center",
  },
  homescreen: {
    backgroundColor: Color.gray,
    flex: 1,
    width: "100%",
    height: 812,
    paddingLeft: Padding.p_11xl,
    paddingTop: 40,
    paddingRight: 25,
    paddingBottom: Padding.p_30xl,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Homescreen;
