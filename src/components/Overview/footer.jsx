const OverviewFooter = () => {
  return (
    <>
      <div className="flex flex-col gap-8 py-3">
        <p className="text-2xl font-bold leading-normal text-[#0D121C]">
          Contact information
        </p>
        <div className="flex flex-col gap-3 justify-center gap-3 items-center w-full">
          <div className="flex gap-2 justify-between items-center flex-wrap w-full">
            <p className="text-[#4A699C] text-sm leading-normal">Phone</p>
            <p className="text-[#0D121C] text-sm leading-normal">
              (650) 723-2300
            </p>
          </div>
          <div className="flex gap-2 justify-between items-center flex-wrap w-full">
            <p className="text-[#4A699C] text-sm leading-normal">Email</p>
            <p className="text-[#0D121C] text-sm leading-normal">
              admission@stanford.edu
            </p>
          </div>
          <div className="flex gap-2 justify-between items-center flex-wrap w-full">
            <p className="text-[#4A699C] text-sm leading-normal">Address</p>
            <p className="text-[#0D121C] text-sm leading-normal">
              450 Serra Mall, Stanford, CA 94305, United States
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center gap-3 flex-wrap py-4">
          <p className="text-[#4A699C] text-base leading-normal">
            About BabyNames
          </p>
          <p className="text-[#4A699C] text-base leading-normal">
            Privacy Policy
          </p>
          <p className="text-[#4A699C] text-base leading-normal">
            Terms of Service
          </p>
        </div>
      </div>
    </>
  );
};

export default OverviewFooter;
