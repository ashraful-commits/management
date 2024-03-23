const FilePreview = ({ item }) => {
  // Check if item exists and has 'type' and 'name' properties
  if (item && item.type && item.name) {
    if (item.type.includes("image/")) {
      return (
        <div>
          <img
            className="w-full border h-[80px] object-cover"
            src={URL.createObjectURL(item)}
            alt={item.name}
          />
        </div>
      );
    } else if (item.type.includes("video/")) {
      return (
        <div>
          <video className="border" width="320" height="240" controls>
            <source src={URL.createObjectURL(item)} type={item.type} />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    } else if (item.type === "application/postscript") {
      return (
        <div>
          <p>Photoshop files</p>
        </div>
      );
    } else if (item.type === "application/illustrator") {
      return (
        <div>
          <p> Illustrator files</p>
        </div>
      );
    } else if (item.type === "") {
      return (
        <div>
          <p> File type unknown</p>
        </div>
      );
    } else {
      return (
        <div>
          <a href={URL.createObjectURL(item)} download={item.name}>
            {item.name}
          </a>
        </div>
      );
    }
  } else {
    return <div>File</div>; // Handle case when properties are missing
  }
};

export default FilePreview;
