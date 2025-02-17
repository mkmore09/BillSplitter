interface DetailsInputProps {
  placeholder:string;
  name: string|number;
  setName: React.Dispatch<React.SetStateAction<string|number>>;
}

const DetailsInput: React.FC<DetailsInputProps> = ({ placeholder,name, setName }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg p-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        aria-label="Enter group name"
      />
    </div>
  );
};

export default DetailsInput;
