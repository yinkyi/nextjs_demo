import { Fragment } from "react";
import connectDatabase from "../../utils/mongo";
import { ObjectId } from "mongodb";
const MeetupDetail = (props)=>{
    return (
        <Fragment>
            <img src={props.meetup.image} alt="Meetup first photo"/>
            <h1>{props.meetup.title}</h1>
            <address>{props.meetup.address}</address>
            <p>{props.meetup.description}</p>
        </Fragment>
    )
}
export async function getStaticPaths(){
    const client = await connectDatabase();
    const db = client.db();
    const meetupsCollection= db.collection('meetups');
    const meetups = await meetupsCollection.find({},{_id:1}).toArray();//{}, {projection:{ _id: 0 }}
    client.close();

    return{
        paths:meetups.map((meetup)=>({
                params:{
                    meetupId:meetup._id.toString()
                }
        })),
        fallback:false
    }
}
export async function getStaticProps(context){
    console.log("heeeyyyy");
    const meetupID = context.params.meetupId;
    const client = await connectDatabase();
    const db = client.db();
    const meetupsCollection= db.collection('meetups');
    const meetup = await meetupsCollection.findOne({_id:ObjectId(meetupID)});//{}, {projection:{ _id: 0 }}
    console.log(meetupID);
    client.close();
    return {
        props:{
            meetup:{
                id:meetup._id.toString(),
                title:meetup.title,
                image:meetup.image,
                address:meetup.address,
                description:meetup.description
            }
        }
    }
}
export default MeetupDetail;