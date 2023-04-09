import React,{useState,useEffect,useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Button,
  Alert,
  BackHandler
} from 'react-native';
import {values} from '../data';

const Grid = () => {
    const [word,setWord] = useState({mean: "",description:""});
    const [letters,setLetters] = useState([]);
    const [state,setState] = useState(false);
    const [selectedPositionsState,setSelectedPositionsState] = useState([]);
    const [selectedItems,setSelectedItems] = useState([]);
    const [points,setPoints] = useState(0);

     useEffect(() => {
        setWord({mean: values[Math.floor(Math.random() * 3641)].word.toLowerCase(), description: values[Math.floor(Math.random() * 3641)].description});
      },[state]);


    useEffect(() => {
        let possiblePositions = [];
        for(let k=0;k<word.mean.length;k++){
            let verticalPositions = [];
            let horizontalPositions = [];
            for(let i=0;i<word.mean.length;i++){
                horizontalPositions.push((k*word.mean.length) + i);
                verticalPositions.push(k+(word.mean.length*i));
            }
            possiblePositions.push(horizontalPositions);
            possiblePositions.push(verticalPositions);
        }
        let selectedPositions = possiblePositions[Math.floor(Math.random()*possiblePositions.length)];
        setSelectedPositionsState(selectedPositions)
        let totalArray = Array.from(Array(word.mean.length*word.mean.length));
        for(let k=0;k<word.mean.length*word.mean.length;k++){
            for(let i=0;i<selectedPositions.length;i++){
                if(k == selectedPositions[i]){
                    totalArray[selectedPositions[i]] = word.mean.split("")[i];
                }
            }
        }

        for(let k=0;k<totalArray.length;k++){
            if(totalArray[k] == undefined){
                totalArray[k] = generateLetter();
            }
        }
        if(letters !== totalArray){
            setLetters(totalArray);
        }
    },[word]);

    const generateLetter = () => {
        let result = '';
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 1) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    const Col = ({ numRows, children }) => {
      return  (
        <View style={styles[`${numRows}col`]}>{children}</View>
      )
    }

    const Row = ({ children }) => (
      <View style={styles.row}>{children}</View>
    )
    const onSelect = (el) => {
        if(selectedItems && selectedItems.length > 0){
            let newItems = [];
            let count = 0;
            for(let item of selectedItems){
                if(item !== el){
                    newItems.push(item);
                }else{
                    count++;
                }
            }
            if(count == 0){
               newItems.push(el);
            }
            setSelectedItems(newItems);
        }else{
            setSelectedItems([el]);
        }
    }
    const nextFunc = () => {
        setState(!state);
        setSelectedItems([]);
        setSelectedPositionsState([]);
        setPoints((old) => old + 10);
    }
    const checkResult = () => {
        if(selectedPositionsState && selectedPositionsState.length == word.mean.length){
            let count = 0;
            for(let el of selectedPositionsState){
                if(selectedItems.filter((item) => item == el).length == 1){
                    count++;
                }
            }
            if(count == word.mean.length){
                 Alert.alert('Game Result', 'Result Successful', [
                  {
                    text: 'Cancel',
                    onPress: () => BackHandler.exitApp(),
                    style: 'cancel',
                  },
                  {text: 'Next', onPress: () => nextFunc()},
                ]);
            }else{
                Alert.alert('Game Result', 'Result Fail', [
                  {
                    text: 'Cancel',
                    onPress: () => BackHandler.exitApp(),
                    style: 'cancel',
                  },
                  {text: 'Again', onPress: () =>  console.log('Again Pressed')},
                ]);
            }
        }else{
            Alert.alert('Game Result', 'Result Fail', [
              {
                text: 'Cancel',
                onPress: () => BackHandler.exitApp(),
                style: 'cancel',
              },
              {text: 'Again', onPress: () =>  console.log('Again Pressed')},
            ]);
        }
    }
    return(<>
     <View style={styles.scoreStyle}><Text>Score: {points}</Text></View>
     <View style={styles.app}>
     {word.mean && word.mean.length > 0 && Array.from(Array(word.mean.length)).map((item,index) =>
          <Row key={index}>
          {word.mean && word.mean.length > 0 && Array.from(Array(word.mean.length)).map((el,index2) =>
            <Col key={index + "-" + index2} numRows={parseInt(12/word.mean.length)}>
              <TouchableHighlight
              style={selectedItems && selectedItems.length > 0 && selectedItems.filter((item) => item == (index*word.mean.length) + index2).length > 0 ? styles.backgroundColorStyle : styles[word.mean.length+"col"]}
              onPress={() => onSelect((index*word.mean.length) + index2)}>
                <Text style={styles.textContentColor}>{letters[(index*word.mean.length) + index2]}</Text>
              </TouchableHighlight>
            </Col>
            )}
          </Row>)}
     </View>
     <View style={styles.buttonStyle}>
     <Button
       onPress={() => checkResult()}
       title="Show Result"
       color="#841584"
     />
     </View></>
    )
}
export default Grid;

const styles = StyleSheet.create({
   app: {
      flex: 4,
      marginHorizontal: "auto",
      width: 300,
      marginTop: 20
    },
    row: {
      flexDirection: "row"
    },
    scoreStyle:{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    "1col":  {
      backgroundColor:  "lightblue",
      borderColor:  "#fff",
      borderWidth:  1,
      flex:  1
    },
    "2col":  {
      backgroundColor:  "blue",
      borderColor:  "#fff",
      borderWidth:  1,
      flex:  2,
      height: 50
    },
    "3col":  {
      backgroundColor:  "orange",
      borderColor:  "#fff",
      borderWidth:  1,
      flex:  3,
    },
    "4col":  {
      flex:  4,
      backgroundColor:  "grey",
      borderColor:  "#fff",
      borderWidth:  1,
    },
    "6col":  {
      flex:  6,
      backgroundColor:  "black",
      borderColor:  "#fff",
      borderWidth:  1,
    },
    "12col":  {
      flex:  12,
      backgroundColor:  "green",
      borderColor:  "#fff",
      borderWidth:  1,
    },
    backgroundColorStyle:{
        backgroundColor: "red"
    },
    textContentColor: {
        color: "#fff",
        fontSize: 40
    },
    buttonStyle:{
        marginTop: 20
    }
});