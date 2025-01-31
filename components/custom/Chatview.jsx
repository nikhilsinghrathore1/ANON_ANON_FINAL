"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { MessageContext } from '@/context/MessagesContext'
import { UserDetailsContext } from '@/context/UserDetailsContext'
import { ArrowRight, Link, Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import Markdown from "react-markdown"
import Prompt from '@/data/Prompt'
import { sanitizeAndParseJSON } from '@/configs/AiModel'
const Chatview = () => {
  
  
  
  const lastCalledRef = useRef(0); 
  const context = useContext(MessageContext)
  const [userInput, setuserInput] = useState('')
  const [loading, setloading] = useState(false)
  const [responseReceived, setResponseReceived] = useState(false)
  if(!context){

return(
  <>
  the file dose not exits
  </>
)
    
  }

  else{

  

  const {message , setmessage} = context
  


useEffect(() => {
  const localMessages = JSON.parse(localStorage.getItem("messageArray"))

  setmessage([localMessages])
},[])







useEffect(() => {

  const getAiresponse = async () => {
    const now = Date.now();
    if (now - lastCalledRef.current < 10000) {
      console.log("Rate limiter active, skipping call.");
      return; 
    }

    lastCalledRef.current = now; 
    console.log("Calling the get AI response here");
    setloading(true);

    const PROMPT = JSON.stringify(message) + Prompt.CHAT_PROMPT;
    console.log(PROMPT)

    try {
      const result = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/chat/getChat`, {
        prompt: PROMPT,
      });


      const description = sanitizeAndParseJSON(result.data.res)

      setmessage((prev) => [
        ...prev,
        {
          role: "ai",
          content: description.response
        },
      ]);

      setResponseReceived(true);
    } catch (error) {
      console.error("Error generating AI response:", error);
    } finally {
      setloading(false);
    }
  };

  if (message?.length > 0 && !responseReceived) {
    console.log(message[message.length - 1].role);
    let role = message[message.length - 1].role;
    if (role === "user") {
      console.log("Creating AI response");
      getAiresponse();
    }
  }
}, [message]);


const onGenerate = () => {
    setmessage(prev => [...prev, {
      role: "user",
      content: userInput
    }])
    setuserInput("")
    setResponseReceived(false)
  }

  return (
    <div className='relative flex flex-col w-full h-[100%]'>
      <div className='top-0 z-0 pt-1 w-full min-h-10 max-h-[60%] overflow-y-hidden'>
        <div className='flex flex-col gap-3 h-full overflow-y-scroll removesc'>
          {message?.length > 0 ? (
            message.map((msg, index) => (
<<<<<<< HEAD
              <div className='min-w-[60%] flex items-start gap-3 max-w-[90%] p-3 flex-wrap rounded-xl bg-[#222222]' key={index}>
                {msg.role === "user" &&
                <div className='w-10 h-10 rounded-full items-center  justify-center bg-green-700 flex text-lg uppercase font-bold'>U</div>
                  }
                <Markdown className='leading-7  '>{msg.content}</Markdown>
=======
              <div className='flex items-start gap-3 bg-[#222222] p-3 rounded-xl min-w-[60%] max-w-[90%]' key={index}>
                {msg.role === "user" &&
                  <Image className='rounded-full' src={userDets.picture} width={35} height={35} alt="not showing" />}
                <Markdown className='leading-7'>{msg.content}</Markdown>
>>>>>>> d9ec263bca70c0210d38115519499869fc19e50e
              </div>
            ))
          ) : (
            <p>No messages available</p>
          )}
          {loading && <div className='flex items-center gap-3'>
            <Loader2Icon className='animate-spin' />
            <h2>Generating response....</h2>
          </div>}
        </div>
      </div>

      {/* this is the input field */}

      <div className='bottom-5 z-10 absolute flex flex-col border-white/20 bg-black mt-5 py-5 border rounded-xl w-[90%] max-w-2xl h-[30%]'>
        {/* this is the search box area */}
        <div className='flex justify-between items-start px-3 w-full'>
          <textarea
            value={userInput}
            className='bg-transparent px-2 w-full max-w-xl h-32 outline-none removesc resize-none'
            onChange={(e) => setuserInput(e.target.value)}
          >
          </textarea>

          <ArrowRight onClick={onGenerate} className='bg-blue-500 hover:bg-blue-400 p-1 rounded-lg w-8 h-8 cursor-pointer' />
        </div>

        <div className='px-3 w-full cursor-pointer'>
          <Link className='opacity-60' />
        </div>
      </div>
    </div>
  )
}

<<<<<<< HEAD
} 


export default Chatview
=======
export default Chatview
>>>>>>> d9ec263bca70c0210d38115519499869fc19e50e
