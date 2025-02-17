interface NextButtonProps {
  handleNextStep: () => void;
  isLoading: boolean;
}

const NextButton: React.FC<NextButtonProps> = ({ handleNextStep, isLoading }) => {
  return (
    <button
      onClick={handleNextStep}
      className="bg-[#6B7280] text-white py-2 text-center w-full rounded-full mt-4"
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : "Next"}
    </button>
  );
};

export default NextButton;
