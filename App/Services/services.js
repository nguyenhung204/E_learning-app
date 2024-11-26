import { request, gql } from 'graphql-request';
const MASTER_URL = 'https://us-west-2.cdn.hygraph.com/content/cm1f37yms07qc08vve9s1mss2/master';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CACHE_TIMEOUT = 5 * 60 * 1000;

export const getCourseList = async (level) => {
  try {
    // Kiểm tra cache
    const cacheKey = `courses-${level}`;
    const cachedData = await AsyncStorage.getItem(cacheKey);
    const cachedTime = await AsyncStorage.getItem(`${cacheKey}-time`);
    
    if (cachedData && cachedTime) {
      const isValid = Date.now() - Number(cachedTime) < CACHE_TIMEOUT;
      if (isValid) {
        return JSON.parse(cachedData);
      }
    }

    // Nếu không có cache hoặc cache hết hạn, gọi API
    const query = gql`
        query CoursesList {
          courses(where :{level : `+ level + `}) {
            id
            name
            level
            price
            tags
            time
            description {
              markdown
            }
            author
            banner {
              url
            }
            chapter {
            title
            id
            content {
              header
              description {
                markdown
                html
              }
              output {
                markdown
                html
              }
            }   
          }
        }
        }
    `;

    const result = await Promise.race([
      request(MASTER_URL, query),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      )
    ]);

    // Lưu kết quả vào cache
    await AsyncStorage.setItem(cacheKey, JSON.stringify(result));
    await AsyncStorage.setItem(`${cacheKey}-time`, Date.now().toString());

    return result;
  } catch (error) {
    console.error('Error fetching courses:', error);
    // Trả về cache cũ nếu có lỗi
    const cachedData = await AsyncStorage.getItem(`courses-${level}`);
    return cachedData ? JSON.parse(cachedData) : null;
  }
};


export const enrollCourse = async (courseId, userEmail) => {
  const mutationQuery = gql`
    mutation MyMutation {
      createUserConrolledCourse(
        data: {
          courseId: "${courseId}",
          userEmail: "${userEmail}",
          course: {
            connect: {
              id: "${courseId}"
            }
          }
        }
      ) {
        id
      }
      publishManyUserConrolledCoursesConnection(to: PUBLISHED) {
        edges {
          node {
            id
          }
        }
      }
    }
  `;

  try {
    const result = await request(MASTER_URL, mutationQuery);
    return result;
  } catch (error) {
    console.error('Enrollment failed:', error);
    throw error;
  }
};

export const getUserEnrolledCourses = async (courseId, userEmail) => {
  try {
    const cachedData = await AsyncStorage.getItem(`enrolled-course-${courseId}`);
    if (cachedData) {
      return { userConrolledCourses: [JSON.parse(cachedData)] };
    }

    const query = gql`
      query GetUserEnrolledCourse {
        userConrolledCourses(
          where: {
            courseId: "${courseId}",
            userEmail: "${userEmail}" 
          }
        ) {
          id
          courseId
          completedChapter {
            chapterId
          }
        }
      }
    `;
    const result = await request(MASTER_URL, query);

     
    // Cache the result
    if (result.userConrolledCourses?.[0]) {
      await AsyncStorage.setItem(
        `enrolled-course-${courseId}`,
        JSON.stringify(result.userConrolledCourses[0])
      );
    }

    return result;

  } catch (error) {
    console.error('Error getting enrolled courses:', error);
    return { userConrolledCourses: [] };
  }
};

export const MarkChapterCompleted = async (chapterId, recordId, userEmail, points) => {
  const optimisticResult = {
    id: `temp-${Date.now()}`,
    chapterId,
    userEmail,
    points
  };
  try {
    // Store pending update in cache
    await AsyncStorage.setItem(
      `pending-chapter-${chapterId}`, 
      JSON.stringify(optimisticResult)
    );

    // Update UI immediately
    await AsyncStorage.setItem(
      `completed-chapter-${chapterId}`,
      JSON.stringify(optimisticResult)
    );

    const mutationQuery = gql`
      mutation markChapterCompleted {
  updateUserConrolledCourse(
    data: {completedChapter: {create: {data: {chapterId: "`+ chapterId + `"}}}}
    where: {id: "`+ recordId + `"}
  ) {
    id
  }
  publishManyUserConrolledCoursesConnection {
    edges {
      node {
        id
      }
    }
  }
  updateUserDetail( where: {email: "`+ userEmail + `"}, 
  data: {point: `+ points + `}) {
    point
  }
  publishUserDetail(where: {email: "`+ userEmail + `"}){
    id
  }
}
    `;

    // Execute API call with timeout
    const result = await Promise.race([
      request(MASTER_URL, mutationQuery),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      )
    ]);

    // Clear pending status on success
    await AsyncStorage.removeItem(`pending-chapter-${chapterId}`);
    return result;

  } catch (error) {
    return optimisticResult;
  }
};

export const createNewUser = async (email, userName, profileImageUrl) => {
  const mutationQuery = gql`
    mutation createNewUser {
        upsertUserDetail(
          upsert: 
          {
          update: 
          {
            email: "`+ email + `",
            }, 
            create: {
              userName: "`+ userName + `", 
              point: 100, 
              email: "`+ email + `", 
              profileImage: "`+ profileImageUrl + `"
              }}
          where: {
            email: "`+ email + `"}
        ) {
          id
        }
          publishUserDetail( where: {email: "`+ email + `"}){
            id
          }
}
  `;
  const result = await request(MASTER_URL, mutationQuery);
  return result;
}

export const getUserDetail = async (email) => {
  const query = gql`
    query GetUserDetail {
      userDetail(where: {email: "`+ email + `"}) {
      id
      point
  }
}
  `;
  const result = await request(MASTER_URL, query);
  return result;
}

export const getAllUser = async () => {
  const query = gql `
  query getAllUsers {
  userDetails(orderBy: point_DESC) {
    id
    profileImage
    userName
    point
  }
} `;
  const result = await request(MASTER_URL, query);
  return result;
}

export const getProgressCourse = async ( userEmail) => {
  const query = gql `
  query GetAllUserEnrolledProgressCourse {
  userConrolledCourses(where: {userEmail: "`+ userEmail + `"}) {
    completedChapter {
      chapterId
    }
    course {
      banner {
        url
      }
      chapter {
        id
        content {
          header
          id
          output {
            markdown
            html
          }
          description {
            markdown
            html
          }
        }
        title
      }
      description {
        markdown
      }
      id
      level
      name
      price
      time
    }
  }
}`
  const result = await request(MASTER_URL, query);
  return result;
}


export const clearAllCache = async () => {
  try {
    // Get all cache keys
    const keys = await AsyncStorage.getAllKeys();
    
    // Filter cache keys
    const cacheKeys = keys.filter(key => 
      key.startsWith('enrolled-course-') ||
      key.startsWith('chapter-completion-') 
    );

    // Remove all cached items
    if (cacheKeys.length > 0) {
      await AsyncStorage.multiRemove(cacheKeys);
    }
    
    console.log('Cache cleared successfully');
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};