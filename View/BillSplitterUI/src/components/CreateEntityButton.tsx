interface CreateEntityButtonProps {
  handleSubmit: () => void;
  isLoading: boolean;
}

const CreateEntityButton: React.FC<CreateEntityButtonProps> = ({ handleSubmit, isLoading }) => {
  return (
    <button
      onClick={handleSubmit}
      className="bg-[#6B7280] text-white py-2 text-center w-full"
      disabled={isLoading}
    >
      {isLoading ? "Creating..." : "Create Group"}
    </button>
  );
};

export default CreateEntityButton;
