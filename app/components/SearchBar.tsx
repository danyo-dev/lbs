import { SearchIcon } from "@heroicons/react/outline";

interface Props {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function SearchBar({ handleSearch }: Props) {
  return (
    <div className="my-3 relative rounded-lg border w-1/4">
      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
        <SearchIcon className="text-slate-500 h-5 w-5" />
      </div>
      <input
        type="search"
        name="search"
        onChange={(e) => handleSearch(e)}
        className="focus:ring-slate-500 focus:border-slate-500 block w-full pl-9 pr-2 py-2 border-slate-300 rounded-lg text-sm"
        placeholder="Search Student"
      />
    </div>
  );
}
