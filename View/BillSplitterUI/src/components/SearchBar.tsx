interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search contacts"
        className="w-full border border-gray-300 rounded-lg p-2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search contacts"
      />
    </div>
  );
};

export default SearchBar;
