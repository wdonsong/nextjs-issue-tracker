import Pagination from "./components/Pagination";

export default function Home() {
  return (
    <div>
      Home
      <Pagination itemCount={100} pageSize={10} currentPage={2} />
    </div>
  );
}
