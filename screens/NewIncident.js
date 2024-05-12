import React, { useEffect } from "react";
import { Image } from "expo-image";
import { StyleSheet, Pressable, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Padding, Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { PieChart, BarChart } from "react-native-gifted-charts";
import { Menu, MenuOptions, MenuOption, MenuTrigger,} from 'react-native-popup-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useData , useTime} from "../components/util"

const NewIncident = () => {
  const navigation = useNavigation();
  const { jsonData } = useData();
  const { setTimeInterval , timeInterval } = useTime();
  const handleChangetime = (time) => {
    setTimeInterval(time)
  };
  const handleLogout = async () =>{
    AsyncStorage.removeItem('api_key');
    setTimeInterval("Daily");
    navigation.reset({index: 0,routes: [{ name: 'Login' }]});
  }
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
  const pieData = [
    {color: '#7DB6D7'},
    //{value: 30, color: '#E8E8E8'},
    //{value: 40, color: '#A5D6A7'},
    //{value: 20, color: '#FF6B6B'},
    //{value: 20, color: '#FFE66D'},
  ];
  const barData = [
    {value: jsonData.Inc1.count, frontColor: '#64CCC5'},
    {value: jsonData.Inc2.count, frontColor: '#BAE8D6'},
    {value: jsonData.Inc3.count, frontColor: '#64CCC5'},
    {value: jsonData.Inc4.count, frontColor: '#BAE8D6'},
    {value: jsonData.Inc5.count, frontColor: '#64CCC5'},
  ];
  const maxValue = Math.max(...barData.map(item => item.value)); 
  return (
    <View style={[styles.newincident, styles.frameFlexBox1]}>
      <View style={styles.frameParent}>
        <View style={[styles.ellipseParent, styles.ellipseParentFlexBox]}>
          <Pressable
            style={styles.wrapper}
            onPress={() => navigation.navigate("Homescreen")}
          >
            <Image
              style={styles.icon}
              contentFit="cover"
              source={require("../assets/ellipse-8.png")}
            />
          </Pressable>
          <Pressable
            style={styles.container}
            onPress={() => navigation.navigate("Homescreen")}
          >
            <Image
              style={styles.icon}
              contentFit="cover"
              source={require("../assets/frame-492.png")}
            />
            
          </Pressable>
        </View>
          <View style={styles.frameWrapper}>
          <Menu>
            <MenuTrigger >
              <Image
                style={styles.frameChild}
                source={require("../assets/frame-501.png")}
              />
            </MenuTrigger>
            <MenuOptions customStyles={optionStyles}>
              <MenuOption onSelect={() => handleChangetime(`Daily`)} text='Daily' />
              <MenuOption onSelect={() => handleChangetime(`Weekly`)} text="Weekly"/>
              <MenuOption onSelect={() => handleLogout()} >
                <Text style = {{color:'red' , fontWeight : '900'}}>Logout</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
          </View>
      </View>
      <View style={[styles.frameGroup, styles.frameGroupFlexBox]}>
        <Text style={styles.textHeader}>{timeInterval} : New Incident</Text>
      </View>
      <View style={[styles.newincidentInner, styles.frameGroupFlexBox]}>
        <View style={[styles.newgraphWrapper, styles.wrapperFlexBox1]}>
          <PieChart
            donut
            innerRadius={80}
            data={pieData}
            radius={111}
            backgroundColor= '#176B87'
            centerLabelComponent={() => {
            return <Text style={{fontSize: 50,color:"white"}}>{jsonData.countAll}</Text>;
            }}
            />
        </View>
      </View>
      <View style={[styles.frameGroup1, styles.frameGroupFlexBox]}>
        <Text style={styles.textSubHeader}>TOP 5 New Incident</Text>
      </View>
      <View style={[styles.roundedRectangleParent, styles.frameGroupFlexBox]}>
        <View
          style={[styles.roundedRectangle, styles.newincidentInnerLayout]}
        />
        <View style={[styles.newgraphtop5Wrapper, styles.wrapperFlexBox1]}>
          <BarChart
            style={{ flex: 1 }} 
            initialSpacing={20}
            horizontal
            barWidth={5}
            barBorderRadius={4}
            noOfSections={3}
            data={barData}
            yAxisThickness={0}
            xAxisThickness={0}
            maxValue={maxValue}
            disableScroll={true}
            spacing={30}
            height={145}
            width={290}
            isAnimated={true}
            yAxisTextStyle={{color: 'lightblue'}}
          />
          <View style={styles.textbargraphParent}>
            <Text style={[styles.textbargraphTypo, Platform.OS === 'ios' ? styles.iosText : null]}>
              {jsonData.Inc1.name !== null && jsonData.Inc1.count !== null
    ? `${jsonData.Inc1.name} : ${jsonData.Inc1.count}`
    : ''}
            </Text>
            <Text style={[styles.textbargraphTypo, Platform.OS === 'ios' ? styles.iosText : null]}>
              {jsonData.Inc2.name !== null && jsonData.Inc2.count !== null
    ? `${jsonData.Inc2.name} : ${jsonData.Inc2.count}`
    : ' '}
            </Text>
            <Text style={[styles.textbargraphTypo, Platform.OS === 'ios' ? styles.iosText : null]}>
              {jsonData.Inc3.name !== null && jsonData.Inc3.count !== null
    ? `${jsonData.Inc3.name} : ${jsonData.Inc3.count}`
    : ' '}
            </Text>
            <Text style={[styles.textbargraphTypo, Platform.OS === 'ios' ? styles.iosText : null]}>
              {jsonData.Inc4.name !== null && jsonData.Inc4.count !== null
    ? `${jsonData.Inc4.name} : ${jsonData.Inc4.count}`
    : ' '}
            </Text>
            <Text style={[styles.textbargraphTypo, Platform.OS === 'ios' ? styles.iosText : null]}>
              {jsonData.Inc5.name !== null && jsonData.Inc5.count !== null
    ? `${jsonData.Inc5.name} : ${jsonData.Inc5.count}`
    : ' '}
            </Text>
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
  textSubHeader :{
    fontSize : 15,
    fontFamily: FontFamily.robotoBold,
    color: "#FFFFFF",
  },
  textHeader :{
    fontSize : 25,
    fontFamily: FontFamily.robotoBold,
    color: "#FFFFFF",
  },
  frameWrapper :{
    width : 50,
    marginLeft : 220,
  },
  iosText: {
    padding : 1.2
  },
  textbargraphTypo: {
    textAlign: "center",
    color: "#FFF3B1",
    fontFamily: FontFamily.robotoBold,
    fontWeight: "500",
    letterSpacing: 0.3,
    fontSize: 10,
    marginBottom : 20,
  },
  textbargraphParent: {
    left: "27%",
    bottom: "-5%",
    zIndex: 1,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  frameFlexBox1: {
    overflow: "hidden",
    alignItems: "center",
  },
  ellipseParentFlexBox: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  frameGroupFlexBox: {
    marginTop: 21,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapperFlexBox1: {
    paddingVertical: Padding.p_7xl,
    paddingHorizontal: Padding.p_32xl,
    left: "50%",
    top: "50%",
    position: "absolute",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  unauthAccessTypo: {
    display: "flex",
    textAlign: "left",
    color: Color.mediumturquoise,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "600",
    letterSpacing: 0.2,
    fontSize: FontSize.size_3xs,
    height: 17,
    top: "20%",
  },
  newtype2valueTypo: {
    textAlign: "right",
    color: Color.lightcyan,
    letterSpacing: 0.3,
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "600",
  },
  unauthLayout: {
    width: 104,
    alignItems: "center",
  },
  frameFlexBox: {
    marginTop: 3,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  wrapperFlexBox: {
    marginLeft: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  newincidentInnerLayout: {
    width: 329,
    backgroundColor: Color.steelblue,
    borderRadius: Border.br_xl,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  wrapper: {
    width: 87,
    height: 78,
    zIndex: 0,
  },
  container: {
    left: 29,
    top: 21,
    width: 33,
    height: 37,
    zIndex: 1,
    position: "absolute",
  },
  ellipseParent: {
    alignItems: "center",
  },
  frameChild: {
    width: 70,
    height: 70,
    marginBottom : -10,
  },
  frameParent: {
    width: 379,
    height: 81,
    paddingBottom: 0,
    alignItems: "flex-end",
    flexDirection: "row",
  },
  newgraphIcon: {
    width: 220,
    height: 223,
  },
  newgraphWrapper: {
    marginTop: -138,
    marginLeft: -161,
    zIndex: 0,
  },
  newincidentInner: {
    height: 284,
    width: 329,
    backgroundColor: Color.steelblue,
    borderRadius: Border.br_xl,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  frameItem: {
    width: 13,
    height: 13,
  },
  maliciousCode: {
    width: 92,
    height: 17,
    alignItems: "center",
  },
  maliciousCodeWrapper: {
    width: 95,
    justifyContent: "center",
    alignItems: "center",
  },
  newtype2value: {
    width: 36,
  },
  newtype2valueWrapper: {
    width: 37,
    justifyContent: "center",
    alignItems: "center",
  },
  ellipseGroup: {
    width: 145,
    alignItems: "center",
  },
  unauthAccess: {
    height: 17,
    display: "flex",
    textAlign: "left",
    color: Color.mediumturquoise,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "600",
    letterSpacing: 0.2,
    fontSize: FontSize.size_3xs,
    top: "20%",
  },
  unauthAccessWrapper: {
    justifyContent: "center",
  },
  newtype5value: {
    width: 38,
  },
  newtype5valueWrapper: {
    width: 38,
    justifyContent: "center",
    alignItems: "center",
  },
  ellipseContainer: {
    width: 158,
    marginLeft: 5,
    height: 17,
    alignItems: "center",
  },
  frame: {
    width: 309,
    flexDirection: "row",
    alignItems: "center",
  },
  frame1: {
    width: 309,
  },
  exercisenetworkDefenseTesti: {
    width: 236,
    height: 17,
    alignItems: "center",
  },
  exercisenetworkDefenseTestiWrapper: {
    width: 236,
  },
  newtype3value: {
    width: 53,
  },
  newtype3valueWrapper: {
    width: 53,
  },
  frame3: {
    width: 310,
    height: 17,
    alignItems: "center",
    overflow: "hidden",
  },
  frameGroup: {
    width: 330,
    height: 46,
    backgroundColor: Color.steelblue,
    borderRadius: Border.br_xl,
  },
  frameGroup1: {
    width: 330,
    height: 36,
    backgroundColor: Color.steelblue,
    borderRadius: Border.br_xl,
  },
  roundedRectangle: {
    height: 228,
    zIndex: 0,
  },
  newgraphtop5Wrapper: {
    marginTop: -160,
    marginLeft: -200,
    width: 323,
    height: 228,
    zIndex: 1,
  },
  roundedRectangleParent: {
    width: 337,
    paddingHorizontal: Padding.p_9xs,
    paddingVertical: Padding.p_0,
    height: 228,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  newincident: {
    backgroundColor: Color.gray,
    flex: 1,
    height: 812,
    paddingTop: Padding.p_xl,
    paddingBottom: Padding.p_mid,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

export default NewIncident;
