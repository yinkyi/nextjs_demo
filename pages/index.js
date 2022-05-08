import { useEffect, useState } from "react";
import connectDatabase from "../utils/mongo";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";
import Head from 'next/head';
// const DUMMY_DATA = [
//     {
//         id:"m1",
//         title:"Meetup Egypt",
//         image:"/static/img1.jpg",
//         address:"No1, Hlaing Township",
//         description:"Description 1"
//     },
//     {
//         id:"m2",
//         title:"Meetup Egypt",
//         image:"/static/img1.jpg",
//         address:"No1, Kamayut Township",
//         description:"Description 2"
//     },
//     {
//         id:"m3",
//         title:"Meetup Egypt",
//         image:"/static/img1.jpg",
//         address:"No1, Kamayut Township",
//         description:"Description 2"
//     },
//     {
//         id:"m6",
//         title:"Meetup Egypt",
//         image:"/static/img1.jpg",
//         address:"No1, Kamayut Township",
//         description:"Description 2"
//     }
// ]
const HomePage=(props)=>{
    console.log("HomePage",props);
  //  const [meetupData,setMeetupData] = useState([]);
    // useEffect(()=>{
    //     setMeetupData(DUMMY_DATA);
    // },[]);
    return (
        
                <MeetupList meetups={props.meetups}/>
      
            
        )
}
// export async function getServerSideProps(context){
//     const req = context.req;
//     const res = context.res;
//     return{
//         props:{
//             meetups:DUMMY_DATA
//         }
//     }
// }
export async function getStaticProps(){
    const client = await connectDatabase();
    const db = client.db();
    const meetupsCollection= db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray();//{}, {projection:{ _id: 0 }}
    client.close();
    //call Api 
    console.log("Static");
    return{
        props:{
            meetups:meetups.map((meetup)=>({
                title:meetup.title,
                address:meetup.address,
                image:meetup.image,
                id:meetup._id.toString()
            }))
        },
        revalidate:1
    }
    
}
export default HomePage;