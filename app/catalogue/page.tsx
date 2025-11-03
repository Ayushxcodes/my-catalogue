import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

type CatalogueItem = {
  _id: string;
  title: string;
  description: string;
  image?: any;
};

async function getCatalogue(): Promise<CatalogueItem[]> {
  return client.fetch(
    `*[_type == "catalogueItem"]{_id, title, description, image}`
  );
}

export default async function CataloguePage() {
  const items = await getCatalogue();

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      {items.map((item) => (
        <div
          key={item._id}
          className="border rounded-xl shadow-md p-4 bg-white"
        >
          {item.image && (
            <Image
              src={urlFor(item.image).width(400).url()}
              alt={item.title}
              width={400}
              height={300}
              className="rounded-lg object-cover"
            />
          )}
          <h2 className="text-xl font-semibold mt-2">{item.title}</h2>
          <p className="text-gray-600">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
