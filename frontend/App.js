import react, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';

const {width: viewportWidth} = Dimensions.get('window');

const StateCarousel = () => {
  const [states, setStates] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    axios.get('http://18.117.102.134:3000/api/states').then(response => {
      setStates(response.data);
      setLoading(false);
    });

  }, []);

  const renderItem = ({item, index}) => {
    const isSelected = index == selectedIndex;
    return (
      <TouchableOpacity onPress = {() => setSelectedIndex(index)} activeOpacity={0.7}>
        <View style={[styles.slide, isSelected && styles.selectedSilde]}>
          <Text style={[styles.title, isSelected && styles.selectedTitle]}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Savings carousel test
      </Text>

      <Carousel
        data={states}
        renderItem={renderItem}
        sliderWidth={viewportWidth}
        itemWidth={150}
        inactiveSlideOpacity={0.7}
        inactiveSlideScale={0.9}
        loop={true}
        onSnapToItem={(index) => setSelectedIndex(index)}
      >
      </Carousel>

      <View style={styles.paginationContainer}>
        {states.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index == selectedIndex ? styles.activeDot : styles.inactiveDot,
              ]}
            >
            </View>
          )
        )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 100,
    alignItems: 'center'
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Arial',
  },
  slide: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 100,
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10
  },
  title: {
    fontSize: 18,
    fontFamily: 'Arial',
  },
  selectedSilde: {
    backgroundColor: '#e0e0e0',
    transform: [{scale: 1.05}],
  },
  selectedTitle: {
    fontWeight: 'Bold'
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#000',
  },
  inactiveDot: {
    backgroundColor: '#c4c4c4'
  }
});


const App = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <StateCarousel/>
    </SafeAreaView>
  );
};

export default App;

