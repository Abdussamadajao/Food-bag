import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const sanityClient = createClient({
  projectId: "yl74rye0",
  dataset: "production",
  apiVersion: "2023-08-05", // use a UTC date string
  useCdn: false, // `false` if you want to ensure fresh data
});

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: SanityImageSource) => builder.image(source);

export default sanityClient;
