import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getSinglePost } from "./apis/postdetail.api"
import Loading from "../../components/Loading"
import { toast } from "react-toastify"
import PostItem from "../PostItem"
import Comments from "../Comments/Comments"


export default function PostDetails() {
 const {id} = useParams()
 const {data,isError,error,isLoading} = useQuery({
  queryKey:["post",id],
  queryFn:()=> getSinglePost(id!),
  refetchOnMount:false,
 })
 
 if(isError){
  return toast.error(error.message)
 }

 if(isLoading){
  return <Loading></Loading>
 }
 
  return (
    <div
    className="w-1/2 mx-auto"
    ><PostItem posts={data?.data?.post}></PostItem>
    <Comments id={id!}></Comments>
    </div>
  )
}
