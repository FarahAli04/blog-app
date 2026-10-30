import { getPosts } from './apis/post.api';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';
import PostItem from '../PostItem';
import type { Post } from '../../interfaces/post.interface';

import { useQuery } from '@tanstack/react-query';
import CreatePost from '../Posts/CreatePost';
export default function Feed() {
 
 const {data,isLoading,isError,error} =  useQuery({
  queryKey:['posts'],
  queryFn : getPosts,
  refetchOnWindowFocus:false,
  refetchOnReconnect:false,
 })


 if (isLoading){
  return <Loading></Loading>
 }

 if (isError){
  return toast.error(error?.message)
 }

  return (
    <>
    <CreatePost></CreatePost>
    <div className='flex'>
      <div className='w-1/4'></div>
      <div className='w-2/4'>
      {data?.data?.posts?.map((post:Post) => (
        <PostItem key={post._id} posts={post} />
      ))}
      </div>
      <div className='w-1/4'></div>
    </div>
    </>
  )
}
