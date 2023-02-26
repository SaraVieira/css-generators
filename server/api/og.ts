import og from "open-graph";

type Meta = {
  title?: string;
  description?: string;
  image?: {
    url: string;
  };
};

const fetchOg = (url: string) =>
  new Promise((resolve, reject) =>
    og(url, (err, meta) => {
      if (err) reject(err);

      resolve(meta);
    })
  );

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as { url: string };
  const backupTitle = new URL(query.url).hostname + new URL(query.url).pathname;
  if (query.url.includes("codepen")) {
    const [_, __, ___, username, ____, id] = query.url.split("/");
    const b = (await $fetch(
      `https://codepen.io/api/oembed?url=https%3A%2F%2Fcodepen.io%2F${username}%2Fpen%2F${id}&format=json`
    )) as any;
    return {
      title: b.title,
      url: query.url,
      description: "",
      image: {
        url: b.thumbnail_url,
      },
    };
  }
  let meta: Meta = {};
  try {
    meta = (await fetchOg(query.url)) as Meta;
  } catch {}

  if (
    !meta.image?.url ||
    query.url.includes("brandmark") ||
    query.url.includes("csshero.org/mesher") ||
    query.url.includes("bennettfeely.com/clippy/") ||
    query.url.includes("cssgradienttext")
  ) {
    const { url } = JSON.parse(
      await $fetch(
        `https://us-central1-blender-resources.cloudfunctions.net/screenshot?url=${query.url}`
      )
    );

    return {
      title: backupTitle,
      ...meta,
      image: {
        url,
      },
    };
  }

  const getImage = () => {
    const { origin } = new URL(query.url);
    if (meta.image?.url.startsWith("http")) return meta.image?.url;

    if (meta.image?.url.startsWith("keyframes.app"))
      return `https://${meta.image?.url}`;

    return origin + "/" + meta.image?.url;
  };

  return {
    title: backupTitle,
    ...meta,
    image: {
      url: getImage(),
    },
    url: query.url,
  };
});
