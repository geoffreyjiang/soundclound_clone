import { useSelector } from "react-redux";
import { updateSong, songById } from "../../store/songs";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const EditSong = () => {
  const user = useSelector((state) => state.session.user);
  const song = useSelector((state) => Object.values(state.songs));
  console.log(user.id);
  let userId;
  song.forEach((el) => {
    userId = el.id;
  });
  console.log(userId);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  //   useEffect(() => {
  //     song.forEach((el) => {
  //       return (
  //         setTitle(el.title),
  //         setImageUrl(el.imageUrl),
  //         setDescription(el.description)
  //       );
  //     });
  //   }, [title, imageUrl, description]);

  if (!title) {
    song.forEach((el) => {
      return (
        setTitle(el.title),
        setImageUrl(el.imageUrl),
        setDescription(el.description),
        setUrl(el.url)
      );
    });
  }
  useEffect(() => {
    dispatch(songById(id));
    dispatch(updateSong());
  }, [dispatch, id]);

  // if (!user || user.id !== userId) {
  //   return (
  //     <div>
  //       <div> This is not your song!</div>
  //     </div>
  //   );
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      id: user.id,
      title,
      imageUrl,
      url,
      description,
    };
    let newSong = await dispatch(updateSong(user.id, data));
    console.log(newSong);
    // if (newSong) {
    //   history.push(`/songs/${newSong.id}`);
    // }
  };

  return (
    <>
      <div key={id} className="create-form">
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>

          <label>Upload Image</label>
          <input
            type="input"
            name="title"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          ></input>

          <label>Upload Song</label>
          <input
            type="input"
            name="title"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          ></input>

          <label>Description</label>
          <textarea
            type="text"
            name="title"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <button className="submitBtn" type="submit">
            Edit Song
          </button>
        </form>
      </div>
    </>
  );
};

export default EditSong;
