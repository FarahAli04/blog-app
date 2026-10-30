import { FaShare } from 'react-icons/fa6';
import type { Post } from '../interfaces/post.interface'
import AddComments from './Comments/AddComments';
import { timeAgo } from '../utilites/timeAgo';
import { Link } from 'react-router-dom'
import {DropDownCom} from '../components/DropDownCom';
import { useContext } from 'react';
import { authContext } from '../context/auth.context';

export default function PostItem({posts}:{posts:Post}) {

  const context = useContext(authContext)
  if (!context)
    throw new Error()
  const {user} = context
 return (
   
  <div className="bg-white my-7 dark:bg-gray-800 rounded-lg shadow-sm  w-full insta-border">
  {/* Post Header */}
  <div className="flex items-center justify-between p-3 border-b insta-border">
    <div className="flex items-center space-x-3">
      <img className="w-8 h-8 rounded-full object-cover" src={posts.user?.photo} alt="User Avatar" />
     <div>
    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{posts.user?.name}</span>
    <p className='text-white text-[12px]'>{timeAgo(posts.createdAt)}</p>
     </div>
    </div>
    {
      posts.user._id === user?._id &&  <DropDownCom post={posts}></DropDownCom>
    }
   
  </div>
  {/* Post Image */}
  {posts.image&&<div>
    <img className="w-full h-75 object-center object-cover" src={posts.image} alt="Post Content" />
  </div>}
  {/* Post Actions */}
  <div className="flex justify-between items-center p-4">
    <div className="flex space-x-4">
      <button aria-label="Like post" className="text-gray-900 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-400">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
      </button>
      <button aria-label="Comment on post" className="text-gray-900 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-400">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path xmlns="http://www.w3.org/2000/svg" d="M8.2881437,19.1950792 C8.38869181,19.1783212 8.49195996,19.1926955 8.58410926,19.2362761 C9.64260561,19.7368747 10.8021412,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 C7.581722,4 4,7.581722 4,12 C4,13.7069096 4.53528582,15.3318588 5.51454846,16.6849571 C5.62010923,16.830816 5.63909672,17.022166 5.5642591,17.1859256 L4.34581002,19.8521348 L8.2881437,19.1950792 Z M3.58219949,20.993197 C3.18698783,21.0590656 2.87870208,20.6565881 3.04523765,20.2921751 L4.53592782,17.0302482 C3.54143337,15.5576047 3,13.818993 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 C10.707529,21 9.4528641,20.727055 8.30053434,20.2068078 L3.58219949,20.993197 Z" /></svg>
      </button>
      <button aria-label="Share post" className="text-gray-900 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-400">
      {posts.sharesCount} <FaShare />
      </button>
    </div>
    <button aria-label="Save post" className="text-gray-900 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-400">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
    </button>
  </div>
  {/* Likes Count */}
  <div className="px-4 pb-2">
    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
      {posts.likesCount} likes
    </p>
  </div>
  {/* Caption */}
  <div className="px-4 pb-2">
    <p className="text-sm text-gray-900 dark:text-gray-100">
      <a href="#" className="font-semibold hover:underline">username_here</a>
      {posts.body}
    </p>
  </div>
  {/* View Comments */}
  <div className="px-4 pb-2">
    <Link to={`/postdetails/${posts._id}`} className="text-sm text-gray-500 dark:text-gray-400 hover:underline">
      View all {posts.commentsCount} comments
    </Link>
  </div>
  

    <AddComments posts = {posts}></AddComments>
    </div>
  )
}
