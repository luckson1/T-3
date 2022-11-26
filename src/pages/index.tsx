import { type NextPage } from "next";
import Head from "next/head";
import { useCallback, useState } from "react";
import AddItemCard from "../components/AddItemCard";
import { HiX } from "react-icons/hi";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const utils = trpc.useContext();

  const [showModal, setShowModal] = useState(false);
  const showModalHandler = useCallback((input: boolean) => {
    setShowModal(input);
  }, []);

  const { data: itemsList, isLoading } = trpc.item.getShoppingItem.useQuery();
  const { mutate: deleteItem } = trpc.item.deleteShoppingItem.useMutation({
    onSuccess() {
      utils.item.getShoppingItem.invalidate();
    },
  });
  const { mutate: checkItem } = trpc.item.checkShoppingItem.useMutation({
    onSuccess() {
      utils.item.getShoppingItem.invalidate();
    },
  });

  if (!itemsList || isLoading) return <p>Loading ........</p>;
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
          <button
            type="button"
            className="rounded-md bg-indigo-500 px-3 py-1 text-white hover:translate-x-1 hover:bg-indigo-700"
            onClick={() => showModalHandler(true)}
          >
            Add Item
          </button>
        </div>
        <ul className="mt-7">
          {itemsList?.map((item) => (
            <li
              key={item.id}
              className="flex w-72 flex-row items-center justify-between"
            >
              <span
                className={`${
                  item.checked
                    ? "cursor-pointer line-through decoration-red-300 decoration-2"
                    : " cursor-pointer"
                }`}
                onClick={() =>
                  checkItem(
                    item.checked
                      ? { id: item.id, checked: false }
                      : { id: item.id, checked: true }
                  )
                }
              >
                {item.name}{" "}
              </span>
              <HiX
                onClick={() => deleteItem({ id: item.id })}
                size={"30px"}
                color={"red"}
                cursor={"pointer"}
              />
            </li>
          ))}
        </ul>
        {showModal && <AddItemCard showModalHandler={showModalHandler} />}
      </main>
    </>
  );
};

export default Home;
