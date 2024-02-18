import Pagination from "./components/Pagination";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <div>
      Home
      {/* <Pagination
        itemCount={100}
        pageSize={10}
        currentPage={+searchParams.page}
      /> */}
    </div>
  );
}
