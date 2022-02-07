import { SearchIcon } from "@heroicons/react/outline";

interface Props {
  setFilterBy: React.Dispatch<string>;
}
export default function SearchBar({ setFilterBy }: Props) {
  return (
    <div className="my-3 relative rounded-lg w-1/4">
      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
        <SearchIcon className="text-slate-500 h-5 w-5" />
      </div>
      <input
        type="search"
        name="search"
        onChange={(e) => setFilterBy(e.target.value)}
        className=" w-full pl-9 pr-2 py-2  text-sm mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-lg"
        placeholder="Search Student"
      />
    </div>
  );
}
