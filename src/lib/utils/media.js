export const formatImageSrc = (src, width=256) => {
    return  `/_next/image?url=${src}&w=${width}&q=75`
};