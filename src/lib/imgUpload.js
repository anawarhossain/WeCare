export const imageUpload = async (imageFile) => {
  // 1. Create a new FormData object
  const formData = new FormData();
  // 2. Append the image file with the key 'image' required by ImgBB
  formData.append("image", imageFile);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
    {
      method: "POST",
      body: formData, // 3. Pass the formData object here
    },
  );

  const data = await res.json();
//   console.log("imgbb res", data);
  return data.data; // Note: Ensure you check if data.success is true first!
};
