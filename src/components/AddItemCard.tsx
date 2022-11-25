
import React, {  useCallback, useState } from "react";
import { trpc } from "../utils/trpc";
export interface AddItemProps {
  showModalHandler: (input: boolean) => void;
}
const AddItemCard = ({ showModalHandler}: AddItemProps) => {

    const utils= trpc.useContext()
  const { mutate: addItem } = trpc.item.createShoppingItem.useMutation({
    onSuccess(){
        utils.item.getShoppingItem.invalidate()
    //    client.invalidateQueries([trpc.item.getShoppingItem])
    }
  });
  const [input, setInput] = useState("");

  const handleSubmit=useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>, input:string) => {
    e.preventDefault()
addItem({ name: input });
  },[])
  return (
    <div className=" relative top-0 left-[600px] flex h-48 w-72 flex-col rounded-md bg-white shadow-2xl ">
      <input
        type="text"
        placeholder="add item"
        value={input}
     
        onChange={(e)=> setInput( e.target.value)}
        className="mx-5 my-5 w-64 rounded-md bg-slate-100 p-2 text-slate-900"
      />
      <div className="mx-6 flex  flex-row items-center justify-between">
        <button
          type="button"
          className="rounded-md bg-indigo-500 px-3 py-1 text-white hover:translate-x-1 hover:bg-indigo-700"
          onClick={(e)=> handleSubmit(e, input)}
        >
          Add
        </button>
        <button
          type="button"
       
          onClick={() => showModalHandler(false)}
          className="rounded-md bg-red-500 px-3 py-1 text-white hover:translate-x-1 hover:bg-red-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddItemCard;
