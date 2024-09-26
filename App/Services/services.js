import { request, gql } from 'graphql-request';
const MASTER_URL = 'https://us-west-2.cdn.hygraph.com/content/cm1f37yms07qc08vve9s1mss2/master';

export const getCourseList = async (level) => {
    const query = gql`
    query CoursesList {
  courses(where :{level : `+level+`}) {
    id
    name
    level
    price
    tags
    time
    author
    banner {
      url
    }
    chapter {
      content {
        id
      }
    }
    
  }
}`
const result = await request(MASTER_URL, query)
return result;
}
