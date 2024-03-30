import Image from "next/image";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col gap-6 justify-center items-center py-10 px-4 md:px-6 lg:px-24 xl:px-40 w-full">
        <div className="flex justify-between items-center gap-6 flex-wrap w-full">
          <p className="text-[#4A699C] text-base leading-normal">About Us</p>
          <p className="text-[#4A699C] text-base leading-normal">Contact Us</p>
          <p className="text-[#4A699C] text-base leading-normal">
            Privacy Policy
          </p>
          <p className="text-[#4A699C] text-base leading-normal">
            Terms of Service
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <Image alt="" src={"/icons/fb-icon.svg"} width={24} height={24} />
          <Image alt="" src={"/icons/twitter-icon.svg"} width={24} height={24} />
          <Image alt="" src={"/icons/insta-icon.svg"} width={24} height={24} />
        </div>
        <p className="text-[#4A699C] text-base leading-normal text-center">
          © 2022 BabyNames. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
