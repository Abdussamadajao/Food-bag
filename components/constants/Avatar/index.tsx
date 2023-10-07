import { minidenticon } from "minidenticons";
import Image from "next/image";
import React, { useMemo } from "react";

const Avatar: React.FC<{
  name: string;
  saturation: string;
  lightness?: any;
}> = ({ name, saturation, lightness, ...props }) => {
  const svgURI = useMemo(
    () =>
      "data:image/svg+xml;utf8," +
      encodeURIComponent(minidenticon(name, saturation, lightness)),
    [name, saturation, lightness]
  );
  return (
    <div className='relative w-[40px] h-[40px]'>
      <Image src={svgURI} alt={name} {...props} fill />
    </div>
  );
};

export default Avatar;
