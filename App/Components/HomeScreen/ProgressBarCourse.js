import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Colors from '../../Utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProgressBarCourse = ({totalChapter, completedChapter} ) => {
  const [cachedProgress, setCachedProgress] = useState(completedChapter);
  useEffect(() => {
    const checkCachedCompletions = async () => {
        try {
            // Get all chapter completion cache entries
            const cachedCompletions = await AsyncStorage.getAllKeys()
                .then(keys => keys.filter(key => key.startsWith('chapter-completion-')))
                .then(keys => Promise.all(keys.map(key => AsyncStorage.getItem(key))))
                .then(items => items.filter(Boolean).map(item => JSON.parse(item)));

            // Update progress if there are cached completions
            if (cachedCompletions.length > 0) {
                setCachedProgress(completedChapter + cachedCompletions.length);
            }
        } catch (error) {
            console.error('Error checking cached completions:', error);
        }
    };

    checkCachedCompletions();
}, [completedChapter]);

const width = Math.min(((cachedProgress || completedChapter) / totalChapter) * 100) + "%";

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
