import React, { useState } from 'react';
import { View, Text, useWindowDimensions, TouchableOpacity } from 'react-native';
import RenderHtml from 'react-native-render-html';
import Colors from '../../Utils/Colors';
import Foundation from '@expo/vector-icons/Foundation';

const ContentItem = ({ description, output }) => {
  const { width } = useWindowDimensions();
  const [ isRun, setIsRun ] = useState(false);

  const tagsStyles = {
    body: {
      fontFamily: 'outfit-regular',
      fontSize: 17,
      whiteSpace: 'wrap',
      overflow: 'hidden'
    },
    code: {
      backgroundColor: Colors.BLACK,
      color: Colors.WHITE,
      padding: 20,
      borderRadius: 5,
      overflow: 'hidden'
    },
  }


  const descriptionSource = {
    html: description,
  }
  const outputSource = {
    html: output
  }
  return description && (
       <View>
      {description && (
        <RenderHtml
          contentWidth={width}
          source={descriptionSource}
          tagsStyles={tagsStyles}
        />
      )}
      {output && (
        <TouchableOpacity 
        onPress={ () => setIsRun(true)}
        style={{ marginTop: -20, marginBottom: 20 }}>
          <Text style={{
            padding: 12,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 10,
            fontFamily: 'outfit-regular',
            fontSize: 18,
            color: Colors.WHITE,
            textAlign: 'center',
            width: 100,
            overflow: 'hidden',
          }}>
            <Foundation style={{ textAlign: 'center' }} name="play-circle" size={18} color={Colors.WHITE} /> Run
          </Text>
        </TouchableOpacity>
      )}
      {isRun ?
      <>
      <Text style={{
        fontFamily: 'outfit-semibold',
        fontSize: 17,
        marginBottom: 10,
      }}>Output</Text>
      {output && (
        <RenderHtml
          contentWidth={width}
          source={outputSource}
          tagsStyles={tagsStyles}
        />
      )}
      </>:null}
    </View>
  );
}

export default ContentItem;


