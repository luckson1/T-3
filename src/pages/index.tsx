
import { type NextPage } from "next";
import Head from "next/head";
import { useCallback, useState } from "react";
import AddItemCard from "../components/AddItemCard";
import {HiX} from 'react-icons/hi'



import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const utils= trpc.useContext()

  const[showModal, setShowModal]=useState(false)
  const showModalHandler= useCallback((input:boolean)=> {
setShowModal(input)
  }, [])

  const {data:itemsList, isLoading}=trpc.item.getShoppingItem.useQuery()
  const { mutate: deleteItem }=trpc.item.deleteShoppingItem.useMutation({
    onSuccess() {
      utils.item.getShoppingItem.invalidate()
    }
  })


if(!itemsList || isLoading) return <p>Loading ........</p>
  return (
    <>
      <Head>
        <title>Shopping List</title>
        <meta name="description" content="Shopping list creator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
 <main className="mx-auto my-12 max-w-3xl">
  <div className="flex justify-between">
  <h2 className="text-2xl font-extralight "> My shopping List</h2>
  <button type="button" className="px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 hover:translate-x-1" onClick={()=>showModalHandler(true)}>Add Item</button>
  </div>
  <ul className="mt-7">
    {itemsList?.map(item=> (
      <li key={item.id} className="flex justify-between items-center flex-row w-72">
<span>{item.name} </span>
<HiX onClick={()=> deleteItem({id: item.id})} size={'30px'} color={'red'} cursor={'pointer'}/>
      </li>

    ))}
  </ul>
{showModal && <AddItemCard showModalHandler={showModalHandler} />}
 </main>
    </>
  );
};

export default Home;

