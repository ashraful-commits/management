import  { useState } from "react";
//============================================use form hook
const useFormHook = (initialState) => {
    const [input,setInput] = useState(initialState)
    const handleInputChange =(e)=>{
setInput((prev)=>({
    ...prev,
    [e.target.name]:e.target.value
}))
    }
  return {input,setInput,handleInputChange}
};

export default useFormHook;
