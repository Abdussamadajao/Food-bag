import { FunctionComponent } from "react";
import { useRouter } from "next/router";
import { CardType } from "@/utils/types";
import Image from "next/image";
import { urlFor } from "@/utils/sanity";
import { Tooltip } from "antd";

const Card: FunctionComponent<{ data: CardType; isGray: boolean }> = ({
  data,
  isGray,
}) => {
  const router = useRouter();
  const { _id, name, image, short_description, slug } = data;
  return (
    <Tooltip title={isGray ? "Input an address" : ""}>
      <button
        disabled={isGray}
        onClick={() => router.push(`/vendors/${slug.current}`)}
        className={`border border-gray-200 px-[20px] w-full py-[27px] flex flex-col justify-start items-start gap-[10px] rounded-sm  ${
          isGray
            ? "filter grayscale cursor-not-allowed"
            : "filter-none cursor-pointer hover:shadow-md"
        }`}
      >
        <div className="relative w-[50px] h-[50px]">
          <Image src={urlFor(image).url()} fill alt="" sizes="100vw" />
        </div>
        {/*<Icon className={} />*/}
        <h5
          className={`${
            isGray ? "text-dark" : "text-primary"
          } text-lg font-pop font-medium text-left`}
        >
          {name}
        </h5>
        <p
          className={`${
            isGray ? "text-dark" : "text-dark-200"
          } text-sm font-pop font-normal`}
        >
          {short_description}
        </p>
      </button>
    </Tooltip>
  );
};

export default Card;
