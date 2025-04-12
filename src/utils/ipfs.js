import axios from "axios";

const PINATA_API_KEY = "81d322fcad413abfc030"; // Replace with your API Key
const PINATA_SECRET_API_KEY = "739e4ab1ea17b6ab6f183184c51aee5cd79852b7c0548f7e75c3a72f57ce6e84"; // Replace with your Secret API Key

export const uploadToIPFS = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const metadata = JSON.stringify({
    name: file.name,
  });
  formData.append("pinataMetadata", metadata);

  const options = JSON.stringify({
    cidVersion: 1,
  });
  formData.append("pinataOptions", options);

  try {
    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY,
        },
      }
    );

    return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
  } catch (error) {
    console.error("IPFS Upload Error:", error);
    return null;
  }
};
