import React from 'react';
import { View } from 'react-native';
import Colors from '../../Utils/Colors';

const ProgressBarCourse = ({totalChapter, completedChapter} ) => {
  const width = (completedChapter/totalChapter) * 100 + "%";
  return (
    <View style = {{
        backgroundColor : Colors.GRAY,
        height : 7,
        width : '100%',
        borderRadius : 99,
    }}>
        <View style = {{
            backgroundColor : Colors.PRIMARY,
            height : 7,
            width : width,
            borderRadius : 99,
        }}>
        </View>
    
    </View>
  );
}

export default ProgressBarCourse;
