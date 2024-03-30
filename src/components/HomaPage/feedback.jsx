import { Button } from "antd";

const Feedback = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center px-4 md:px-6 lg:px-24 xl:px-40 py-20 gap-8">
        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="font-black leading-normal text-4xl text-[#0D121C]">
            Got feedback?
          </p>
          <p className="text-center text-[#0D121C] textbase leading-normal max-w-[477px]">
            We'd love to hear from you. Let us know how we can improve our
            information.
          </p>
        </div>
        <Button className="hover:bg-[#1C6EF2] bg-[#1C6EF2] rounded-lg hover:text-white text-white text-sm leading-normal font-medium hover:border-none border-none py-3 px-5 hover:outline-none outline-none h-10 flex justify-center items-center">
          Submit feedback
        </Button>
      </div>
    </>
  );
};

export default Feedback;
