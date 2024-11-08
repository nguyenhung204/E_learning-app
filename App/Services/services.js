import { request, gql } from 'graphql-request';
const MASTER_URL = 'https://us-west-2.cdn.hygraph.com/content/cm1f37yms07qc08vve9s1mss2/master';

export const getCourseList = async (level) => {
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
}`
  const result = await request(MASTER_URL, query)
  return result;
}
export const enrollCourse = async (courseId, userEmail) => {
  const mutationQuery = gql`
    mutation MyMutation {
      createUserConrolledCourse(
      data: {
      courseId: "`+ courseId + `",
      userEmail: "`+ userEmail + `", 
      course: {connect: {id: "`+ courseId + `"}}}
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
  const result = await request(MASTER_URL, mutationQuery);
  return result;
};

export const getUserEnrolledCourses = async (courseId, userEmail) => {
  const query = gql`
    query GetUserEnrolledCourse {
  userConrolledCourses(
    where: {
    courseId: "`+ courseId + `", 
    userEmail: "`+ userEmail + `"}) {
    id
    courseId
    completedChapter{
      chapterId
    }
  }
}
  `;
  const result = await request(MASTER_URL, query);
  return result;
}

export const MarkChapterCompleted =  async(chapterId, recordId) =>{
  const mutationQuery = gql `
  mutation markChapterCompleted {
  updateUserConrolledCourse(
    data: {completedChapter: {create: {data: {chapterId: "`+ chapterId +`"}}}}
    where: {id: "`+ recordId +`"}
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
}`

const result = await request(MASTER_URL, mutationQuery);
return result;

}
